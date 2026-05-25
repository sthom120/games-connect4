import { useEffect, useState } from "react";
import "./App.css";

import GamesDashboard from "./pages/GamesDashboard";
import Connect4Page from "./pages/Connect4Page";
import BottomNav from "./components/BottomNav";
import SettingsPage from "./pages/SettingsPage";
import MessagesPage from "./pages/MessagesPage";

function App() {
  const [currentScreen, setCurrentScreen] = useState("dashboard");

  // This setting controls whether game sounds are on or off.
  // It is saved on the device so the choice is remembered.
  const [soundOn, setSoundOn] = useState(() => {
    const savedSoundSetting = localStorage.getItem("games-sound-on");

    if (savedSoundSetting === null) {
      return true;
    }

    return savedSoundSetting === "true";
  });

  // This setting controls how smart the phone player is in Connect 4.
  // This setting controls how smart the phone player is in Connect 4.
// It is saved on the device so the choice is remembered.
const [difficulty, setDifficulty] = useState(() => {
  const savedDifficulty = localStorage.getItem("connect4-difficulty");

  if (savedDifficulty === "easy" || savedDifficulty === "normal") {
    return savedDifficulty;
  }

  return "normal";
});

  useEffect(() => {
    localStorage.setItem("games-sound-on", soundOn.toString());
  }, [soundOn]);

  useEffect(() => {
  localStorage.setItem("connect4-difficulty", difficulty);
}, [difficulty]);

  function handleSelectGame(gameId) {
    if (gameId === "connect4") {
      setCurrentScreen("connect4");
    }
  }

  function handleBackToGames() {
    setCurrentScreen("dashboard");
  }

  function handleSoundToggle() {
    setSoundOn((currentSoundSetting) => !currentSoundSetting);
  }

  return (
    <div className="app">
      <div className="app-content">
        {currentScreen === "dashboard" && (
          <GamesDashboard onSelectGame={handleSelectGame} />
        )}

        {currentScreen === "connect4" && (
          <Connect4Page
            onBackToGames={handleBackToGames}
            soundOn={soundOn}
            onSoundToggle={handleSoundToggle}
            difficulty={difficulty}
            onDifficultyChange={setDifficulty}
          />
        )}

        {currentScreen === "support" && <MessagesPage />}

        {currentScreen === "settings" && (
  <SettingsPage
    soundOn={soundOn}
    onSoundToggle={handleSoundToggle}
    difficulty={difficulty}
    onDifficultyChange={setDifficulty}
  />
)}
      </div>

      {currentScreen !== "connect4" && (
        <BottomNav
          currentScreen={currentScreen}
          onChangeScreen={setCurrentScreen}
        />
      )}
    </div>
  );
}

export default App;