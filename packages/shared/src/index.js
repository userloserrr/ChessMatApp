export const BOARD_SIZE = 8;

export const PLAYER_COLORS = ['white', 'black'];

export function createGameState(id = 'default-game') {
  return {
    id,
    status: 'waiting',
    turn: 'white',
    moves: [],
    board: Array.from({ length: 64 }, (_, index) => {
      const row = Math.floor(index / BOARD_SIZE);
      const column = index % BOARD_SIZE;
      const lightSquare = (row + column) % 2 === 0;

      if (row === 0) {
        return lightSquare ? 'wR' : 'wR';
      }

      if (row === 1) {
        return lightSquare ? 'wP' : 'wP';
      }

      if (row === 6) {
        return lightSquare ? 'bP' : 'bP';
      }

      if (row === 7) {
        return lightSquare ? 'bR' : 'bR';
      }

      return null;
    })
  };
}

export function formatRoomName(username) {
  return `${username}'s room`;
}
