import { addPlayerToRoom, createRoom, getRoom, listRooms, pushMove, removePlayer } from './gameStore.js';

export function registerSocketHandlers(io) {
  io.on('connection', (socket) => {
    socket.on('create-room', ({ roomId, name }) => {
      const room = createRoom(roomId || `room-${Date.now()}`, name || 'New room');
      socket.join(room.id);
      socket.emit('room-created', room);
      io.emit('rooms-updated', listRooms());
    });

    socket.on('join-room', ({ roomId, userName }) => {
      const room = getRoom(roomId);
      if (!room) {
        socket.emit('room-error', { message: 'Room not found' });
        return;
      }

      socket.join(roomId);
      const updatedRoom = addPlayerToRoom(roomId, socket.id, userName);
      io.to(roomId).emit('room-update', updatedRoom);
      io.emit('rooms-updated', listRooms());
    });

    socket.on('move', ({ roomId, from, to }) => {
      const result = pushMove(roomId, from, to);
      if (!result || result.ok === false) {
        socket.emit('move-error', result || { message: 'Move rejected' });
        return;
      }

      io.to(roomId).emit('room-update', result);
    });

    socket.on('disconnect', () => {
      for (const room of listRooms()) {
        removePlayer(room.id, socket.id);
      }
      io.emit('rooms-updated', listRooms());
    });
  });
}
