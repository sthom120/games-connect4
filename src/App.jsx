import { useState } from "react";
import "./App.css";

import GamesDashboard from "./pages/GamesDashboard";
import Connect4Page from "./pages/Connect4Page";

function App() {
  const [currentScreen, setCurrentScreen] = useState("dashboard");

  function handleSelectGame(gameId) {
    if (gameId === "connect4") {
      setCurrentScreen("connect4");
    }
  }

  function handleBackToGames() {
    setCurrentScreen("dashboard");
  }

  return (
    <div className="app">
      {currentScreen === "dashboard" && (
        <GamesDashboard onSelectGame={handleSelectGame} />
      )}

      {currentScreen === "connect4" && (
        <Connect4Page onBackToGames={handleBackToGames} />
      )}
    </div>
  );
}

export default App;