const rooms = new Map();

export function createRoom(roomId, roomName) {
  const room = {
    id: roomId,
    name: roomName,
    status: 'waiting',
    players: [],
    game: {
      id: roomId,
      status: 'waiting',
      turn: 'white',
      moves: []
    }
  };

  rooms.set(roomId, room);
  return room;
}

export function getRoom(roomId) {
  return rooms.get(roomId);
}

export function listRooms() {
  return Array.from(rooms.entries()).map(([id, room]) => ({
    id,
    name: room.name,
    players: room.players.length,
    status: room.status,
    game: room.game
  }));
}

export function addPlayerToRoom(roomId, socketId, userName) {
  const room = rooms.get(roomId);
  if (!room) return null;

  const existing = room.players.find((player) => player.id === socketId);
  if (!existing) {
    room.players.push({ id: socketId, name: userName || 'Player' });
  }

  room.status = room.players.length >= 2 ? 'active' : 'waiting';
  room.game.status = room.status;

  return room;
}

export function removePlayer(roomId, socketId) {
  const room = rooms.get(roomId);
  if (!room) return;

  room.players = room.players.filter((player) => player.id !== socketId);
  room.status = room.players.length >= 2 ? 'active' : 'waiting';
  room.game.status = room.status;

  if (room.players.length === 0) {
    rooms.delete(roomId);
  }
}

export function pushMove(roomId, from, to) {
  const room = rooms.get(roomId);
  if (!room) return null;

  room.game.moves.push({ from, to, turn: room.game.turn });
  room.game.turn = room.game.turn === 'white' ? 'black' : 'white';
  return room;
}
