import GameCard from "../components/GameCard";
import MessageButton from "../components/MessageButton";
import { gamesList } from "../data/gamesList";

function GamesDashboard({ onSelectGame }) {
  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <h1>Games</h1>
        <p>Tap a game to start.</p>
      </header>

      <div className="games-list">
        {gamesList.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onSelect={onSelectGame}
          />
        ))}
      </div>

      <MessageButton />
    </main>
  );
}

export default GamesDashboard;