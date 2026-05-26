import { useEffect, useState } from "react";
import "./App.css";

import GamesDashboard from "./pages/GamesDashboard";
import Connect4Page from "./pages/Connect4Page";
import MarbleSolitairePage from "./pages/MarbleSolitairePage";
import BottomNav from "./components/BottomNav";
import SettingsPage from "./pages/SettingsPage";
import MessagesPage from "./pages/MessagesPage";
import { checkForAppUpdate } from "./utils/appUpdateChecker";

/*
  App

  This is the main app controller.

  It decides:
  - which screen is showing
  - whether sound is on
  - the Connect 4 difficulty
  - whether a PWA update is ready

  The update checker helps installed versions of the app refresh after a new
  deployment, especially for users who may not manually refresh the browser.
*/

const GAME_SCREENS = ["connect4", "marble-solitaire"];

function App() {
  const [currentScreen, setCurrentScreen] = useState("dashboard");
  const [updateWaiting, setUpdateWaiting] = useState(false);

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
  // It is saved on the device so the choice is remembered.
  const [difficulty, setDifficulty] = useState(() => {
    const savedDifficulty = localStorage.getItem("connect4-difficulty");

    if (savedDifficulty === "easy" || savedDifficulty === "normal") {
      return savedDifficulty;
    }

    return "normal";
  });

  const isGameScreen = GAME_SCREENS.includes(currentScreen);

  // Save the sound setting whenever it changes.
  useEffect(() => {
    localStorage.setItem("games-sound-on", soundOn.toString());
  }, [soundOn]);

  // Save the Connect 4 difficulty whenever it changes.
  useEffect(() => {
    localStorage.setItem("connect4-difficulty", difficulty);
  }, [difficulty]);

  /*
    Check for app updates.

    This runs:
    - when the app first loads
    - when the user returns to the app from the home screen or another app

    If the user is on a game screen, we wait instead of refreshing immediately.
  */
  useEffect(() => {
    async function checkAndHandleUpdate() {
      const updateResult = await checkForAppUpdate();

      if (!updateResult.updateAvailable) {
        return;
      }

      if (GAME_SCREENS.includes(currentScreen)) {
        setUpdateWaiting(true);
        return;
      }

      window.location.reload();
    }

    checkAndHandleUpdate();

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        checkAndHandleUpdate();
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [currentScreen]);

  /*
    If an update was found while the user was playing a game,
    refresh after they return to a non-game screen.
  */
  useEffect(() => {
    if (updateWaiting && !isGameScreen) {
      window.location.reload();
    }
  }, [updateWaiting, isGameScreen]);

  function handleSelectGame(gameId) {
    if (gameId === "connect4") {
      setCurrentScreen("connect4");
    }

    if (gameId === "marble-solitaire") {
      setCurrentScreen("marble-solitaire");
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

        {currentScreen === "marble-solitaire" && (
          <MarbleSolitairePage onBackToGames={handleBackToGames} />
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

      {!isGameScreen && (
        <BottomNav
          currentScreen={currentScreen}
          onChangeScreen={setCurrentScreen}
        />
      )}
    </div>
  );
}

export default App;