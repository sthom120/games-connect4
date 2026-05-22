import GameCard from "../components/GameCard";
import { gamesList } from "../data/gamesList";

// This page shows the list of games.
// It does not handle messages or helper contacts anymore.
// Those belong on the Messages page.
function GamesDashboard({ onSelectGame }) {
  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <h1>Games</h1>
        <p>Tap a game to start.</p>
      </header>

      <div className="games-list">
        {gamesList.map((game) => (
          <GameCard key={game.id} game={game} onSelect={onSelectGame} />
        ))}
      </div>
    </main>
  );
}

export default GamesDashboard;