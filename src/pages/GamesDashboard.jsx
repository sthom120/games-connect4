import { useState } from "react";

import GameCard from "../components/GameCard";
import MessageButton from "../components/MessageButton";
import HelpContactSetup from "../components/HelpContactSetup";

import { gamesList } from "../data/gamesList";
import {
  getSavedHelpContact,
  saveHelpContact,
  clearHelpContact,
} from "../utils/helpContactStorage";

function GamesDashboard({ onSelectGame }) {
  const [helperContact, setHelperContact] = useState(() =>
    getSavedHelpContact()
  );

  function handleSaveHelpContact(newContact) {
    saveHelpContact(newContact);
    setHelperContact(newContact);
  }

  function handleChangeHelpContact() {
    clearHelpContact();
    setHelperContact(null);
  }

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <h1>Games</h1>
        <p>Tap a game to start.</p>
      </header>

      <div className="games-list">
        {gamesList.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onSelect={onSelectGame}
          />
        ))}
      </div>

      {helperContact ? (
        <MessageButton
          helperContact={helperContact}
          onChangeContact={handleChangeHelpContact}
        />
      ) : (
        <HelpContactSetup onSave={handleSaveHelpContact} />
      )}
    </main>
  );
}

export default GamesDashboard;