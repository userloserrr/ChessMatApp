import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { createGameState } from '@chessmat/shared';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

const rooms = new Map();

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'ChessMat backend' });
});

app.get('/api/rooms', (_req, res) => {
  const roomList = Array.from(rooms.entries()).map(([id, room]) => ({
    id,
    name: room.name,
    players: room.players.length,
    status: room.status,
    game: room.game
  }));

  res.json({ rooms: roomList });
});

app.post('/api/rooms', (req, res) => {
  const roomId = req.body?.roomId || `room-${Date.now()}`;
  const roomName = req.body?.name || 'New room';

  if (!rooms.has(roomId)) {
    rooms.set(roomId, {
      id: roomId,
      name: roomName,
      status: 'waiting',
      players: [],
      game: createGameState(roomId)
    });
  }

  res.status(201).json({ room: rooms.get(roomId) });
});

io.on('connection', (socket) => {
  socket.on('join-room', ({ roomId, userName }) => {
    const room = rooms.get(roomId);

    if (!room) {
      socket.emit('room-error', { message: 'Room not found' });
      return;
    }

    socket.join(roomId);
    room.players.push({ id: socket.id, name: userName || 'Player' });
    room.status = room.players.length >= 2 ? 'active' : 'waiting';
    room.game.status = room.status;

    io.to(roomId).emit('room-update', room);
  });

  socket.on('move', ({ roomId, from, to }) => {
    const room = rooms.get(roomId);

    if (!room) return;

    room.game.moves.push({ from, to, turn: room.game.turn });
    room.game.turn = room.game.turn === 'white' ? 'black' : 'white';

    io.to(roomId).emit('room-update', room);
  });

  socket.on('disconnect', () => {
    for (const [roomId, room] of rooms.entries()) {
      room.players = room.players.filter((player) => player.id !== socket.id);
      if (room.players.length === 0) {
        rooms.delete(roomId);
      }
    }
  });
});

const port = Number(process.env.PORT || 4000);
server.listen(port, () => {
  console.log(`ChessMat backend running on http://localhost:${port}`);
});
