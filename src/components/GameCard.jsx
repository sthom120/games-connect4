function GameCard({ game, onSelect }) {
  const isAvailable = game.status === "available";

  function handleClick() {
    if (isAvailable) {
      onSelect(game.id);
    }
  }

  return (
    <section
      className={`game-card ${!isAvailable ? "game-card-muted" : ""}`}
      onClick={handleClick}
    >
      <div className="connect-icon">
        <span className="red-counter"></span>
        <span className="yellow-counter"></span>
      </div>

      <h2>{game.name}</h2>
      <p>{game.description}</p>

      <button disabled={!isAvailable} onClick={handleClick}>
        {game.buttonText}
      </button>
    </section>
  );
}

export default GameCard;