import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { createRoom, getRoom, listRooms } from './gameStore.js';
import { registerSocketHandlers } from './socketHandlers.js';

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

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'ChessMat backend' });
});

app.get('/api/rooms', (_req, res) => {
  res.json({ rooms: listRooms() });
});

app.post('/api/rooms', (req, res) => {
  const roomId = req.body?.roomId || `room-${Date.now()}`;
  const roomName = req.body?.name || 'New room';

  const existing = getRoom(roomId);
  if (existing) {
    return res.status(200).json({ room: existing });
  }

  const room = createRoom(roomId, roomName);
  res.status(201).json({ room });
});

registerSocketHandlers(io);

const port = Number(process.env.PORT || 4000);
server.listen(port, () => {
  console.log(`ChessMat backend running on http://localhost:${port}`);
});
