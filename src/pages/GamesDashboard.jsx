import GameCard from "../components/GameCard";
import { gamesList } from "../data/gamesList";
import gamesHeading from "../assets/headings/games-heading.png";
import HowToUseCard from "../components/HowToUseCard";

/*
  GamesDashboard

  This page is the main games screen.

  It shows:
  - the "Games" heading image
  - a short instruction
  - the list of game cards

  It does not handle support contacts anymore.
  Support contacts belong on the Support page.
*/

function GamesDashboard({ onSelectGame }) {
  return (
    <main className="dashboard">
      <header className="dashboard-header">
        {/* Decorative heading image, with alt text so screen readers still read "Games". */}
        <img
          src={gamesHeading}
          alt="Games"
          className="games-heading-logo"
        />

        <p>Tap a game to start.</p>
      </header>
      <HowToUseCard />
      <div className="games-list">
        {gamesList.map((game) => (
          <GameCard key={game.id} game={game} onSelect={onSelectGame} />
        ))}
      </div>

     
    </main>
  );
}

export default GamesDashboard;