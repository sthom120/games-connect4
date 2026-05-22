function GameCard({ game, onSelect }) {
  const isAvailable = game.status === "available";

  function handleClick() {
    if (isAvailable) {
      onSelect(game.id);
    }
  }

  return (
    <article
      className={
        isAvailable
          ? "game-card game-card-featured"
          : "game-card game-card-muted"
      }
    >
      <div className="game-card-top-row">
        <div className="game-card-icon" aria-hidden="true">
  {game.iconType === "image" ? (
    <img src={game.icon} alt="" />
  ) : (
    game.icon
  )}
</div>

        <span
          className={
            isAvailable
              ? "game-card-label game-card-label-ready"
              : "game-card-label"
          }
        >
          {game.label}
        </span>
      </div>

      <div className="game-card-content">
        <h2>{game.name}</h2>
        <p>{game.description}</p>
      </div>

      <button type="button" onClick={handleClick} disabled={!isAvailable}>
        {game.buttonText}
      </button>
    </article>
  );
}

export default GameCard;