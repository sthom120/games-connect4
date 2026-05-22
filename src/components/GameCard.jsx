function GameCard({ game, onSelect }) {
  const isAvailable = game.status === "available";
  const isImageIcon = game.iconType === "image" && game.icon;

  const titleId = `${game.id}-title`;
  const descriptionId = `${game.id}-description`;

  function getIconPath(iconPath) {
    return `${import.meta.env.BASE_URL}${iconPath}`;
  }

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
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <div className="game-card-icon-area" aria-hidden="true">
        <div className="game-card-icon">
          {isImageIcon ? (
            <img src={getIconPath(game.icon)} alt="" />
          ) : (
            <span>{game.icon}</span>
          )}
        </div>
      </div>

      <div className="game-card-content">
        <span
          className={
            isAvailable
              ? "game-card-label game-card-label-ready"
              : "game-card-label"
          }
        >
          {game.label}
        </span>

        <h2 id={titleId}>{game.name}</h2>

        <p id={descriptionId}>{game.description}</p>
      </div>

      <button
        type="button"
        onClick={handleClick}
        disabled={!isAvailable}
        aria-label={
          isAvailable ? `Play ${game.name}` : `${game.name} is coming soon`
        }
      >
        {game.buttonText}
      </button>
    </article>
  );
}

export default GameCard;