import { useState } from "react";
import HelpContactSetup from "../components/HelpContactSetup";
import MessageButton from "../components/MessageButton";
import {
  getSavedHelpContact,
  saveHelpContact,
  clearHelpContact,
} from "../utils/helpContactStorage";

function MessagesPage() {
  const [helpContact, setHelpContact] = useState(getSavedHelpContact());

  function handleHelpContactSaved(savedContact) {
    saveHelpContact(savedContact);
    setHelpContact(savedContact);
  }

  function handleRemoveHelpContact() {
    clearHelpContact();
    setHelpContact(null);
  }

  return (
    <section className="simple-page-card">
      <div className="page-icon-heading">
        <img
          src={`${import.meta.env.BASE_URL}icons/help-message-icon.svg`}
          alt=""
          aria-hidden="true"
        />

        <div>
          <h1>Support</h1>
          <p>Set up a helper contact so a message is easy to send if needed.</p>
        </div>
      </div>

      {helpContact ? (
        <MessageButton
          helperContact={helpContact}
          onRemoveContact={handleRemoveHelpContact}
        />
      ) : (
        <HelpContactSetup onSave={handleHelpContactSaved} />
      )}
    </section>
  );
}

export default MessagesPage;