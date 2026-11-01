import { createGameState } from '@chessmat/shared';

const boardSize = 8;
const game = createGameState('web-demo');

export default function HomePage() {
  const rows = Array.from({ length: boardSize }, (_, row) => row);
  const columns = Array.from({ length: boardSize }, (_, col) => col);

  return (
    <main className="page-shell">
      <section className="panel">
        <div className="topbar">
          <div>
            <p className="eyebrow">Multiplayer chess</p>
            <h1>ChessMat</h1>
          </div>
          <div className="status-pill">{game.status}</div>
        </div>

        <div className="board-wrap">
          <div className="board">
            {rows.map((row) =>
              columns.map((col) => {
                const isDark = (row + col) % 2 === 1;
                const index = row * boardSize + col;
                const piece = game.board[index];

                return (
                  <div key={`${row}-${col}`} className={`square ${isDark ? 'dark' : 'light'}`}>
                    <span>{piece || ''}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="info-grid">
          <div className="card">
            <h2>Room</h2>
            <p>{game.id}</p>
          </div>
          <div className="card">
            <h2>Turn</h2>
            <p>{game.turn}</p>
          </div>
          <div className="card">
            <h2>Moves</h2>
            <p>{game.moves.length}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
