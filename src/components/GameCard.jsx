import connect4Heading from "../assets/headings/connect4-heading.png";

/*
  GameCard

  This component displays one game card on the Games screen.

  It is used for:
  - games that are ready to play
  - games that are coming soon

  If the game is available, the button can be clicked.
  If the game is coming soon, the button is disabled.

  The Connect 4 card uses a custom heading image.
  Other game cards keep their normal text heading.
*/

function GameCard({ game, onSelect }) {
  const isAvailable = game.status === "available";
  const isImageIcon = game.iconType === "image" && game.icon;

  const titleId = `${game.id}-title`;
  const descriptionId = `${game.id}-description`;

  // Public folder images need the base URL so they work locally and on GitHub Pages.
  function getIconPath(iconPath) {
    return `${import.meta.env.BASE_URL}${iconPath}`;
  }

  // Only available games should open when clicked.
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

        {/* Connect 4 gets a custom logo-style heading. Other cards use normal text. */}
        {game.id === "connect4" ? (
          <img
            src={connect4Heading}
            alt={game.name}
            id={titleId}
            className="game-title-logo"
          />
        ) : (
          <h2 id={titleId}>{game.name}</h2>
        )}

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