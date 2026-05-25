function MarbleSolitairePage({ onBackToGames }) {
  return (
    <main className="simple-page-card">
      <h1>Marble Solitaire</h1>

      <p>
        Marble Solitaire will be a calm single-player puzzle game with a wooden
        board and shiny black marbles.
      </p>

      <button type="button" className="new-game-button" onClick={onBackToGames}>
        Back to Games
      </button>
    </main>
  );
}

export default MarbleSolitairePage;