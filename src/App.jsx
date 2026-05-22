import { useState } from "react";
import "./App.css";

import GamesDashboard from "./pages/GamesDashboard";
import Connect4Page from "./pages/Connect4Page";

import BottomNav from "./components/BottomNav";

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
    <div className="app-content">
      {currentScreen === "dashboard" && (
        <GamesDashboard onSelectGame={handleSelectGame} />
      )}

      {currentScreen === "connect4" && (
        <Connect4Page onBackToGames={handleBackToGames} />
      )}

      {currentScreen === "games" && (
        <GamesDashboard onSelectGame={handleSelectGame} />
      )}

      {currentScreen === "messages" && (
        <section className="simple-page-card">
          <h1>Messages</h1>
          <p>Helper contact and messages will go here.</p>
        </section>
      )}

      {currentScreen === "settings" && (
        <section className="simple-page-card">
          <h1>Settings</h1>
          <p>Sound, helper contact, and app settings will go here.</p>
        </section>
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