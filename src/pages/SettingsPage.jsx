function SettingsPage({
  soundOn,
  onSoundToggle,
  difficulty,
  onDifficultyChange,
}) {
  return (
    <section className="simple-page-card">
      <h1>Settings</h1>
      <p>Choose how the app sounds and how challenging Connect 4 should be.</p>

      <div className="settings-list">
        <div className="settings-row">
          <div>
            <h2>Sound</h2>
            <p>Turn game sounds on or off.</p>
          </div>

          <button
            type="button"
            className="settings-button"
            onClick={onSoundToggle}
          >
            {soundOn ? "Sound On" : "Sound Off"}
          </button>
        </div>

        <div className="settings-row">
          <div>
            <h2>Phone skill</h2>
            <p>Choose how challenging Connect 4 should be.</p>
          </div>

          <div className="settings-choice-buttons">
            <button
              type="button"
              className={
                difficulty === "easy"
                  ? "settings-choice-button settings-choice-button-active"
                  : "settings-choice-button"
              }
              onClick={() => onDifficultyChange("easy")}
            >
              Easy
            </button>

            <button
              type="button"
              className={
                difficulty === "normal"
                  ? "settings-choice-button settings-choice-button-active"
                  : "settings-choice-button"
              }
              onClick={() => onDifficultyChange("normal")}
            >
              Normal
            </button>
          </div>
        </div>

        <div className="settings-row">
          <div>
            <h2>Helper contact</h2>
            <p>This will move here later from the home screen.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SettingsPage;