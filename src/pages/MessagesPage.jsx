import { useState } from "react";
import HelpContactSetup from "../components/HelpContactSetup";
import MessageButton from "../components/MessageButton";
import {
  getSavedHelpContact,
  clearHelpContact,
} from "../utils/helpContactStorage";

function MessagesPage() {
  const [helpContact, setHelpContact] = useState(getSavedHelpContact());

  function handleHelpContactSaved(savedContact) {
    setHelpContact(savedContact);
  }

  function handleChangeHelpContact() {
    clearHelpContact();
    setHelpContact(null);
  }

  return (
    <section className="simple-page-card">
      <h1>Messages</h1>
      <p>Set up a helper contact so a message is easy to send if needed.</p>

      {helpContact ? (
        <div className="message-area">
          <MessageButton
            helperContact={helpContact}
            onChangeContact={handleChangeHelpContact}
          />
        </div>
      ) : (
        <HelpContactSetup onSave={handleHelpContactSaved} />
      )}
    </section>
  );
}

export default MessagesPage;