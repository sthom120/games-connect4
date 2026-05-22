import { useState } from "react";

function HelpContactSetup({ onSave }) {
  const [helperName, setHelperName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedName = helperName.trim();
    const cleanedPhoneNumber = phoneNumber.trim().replace(/\s+/g, "");

    if (!trimmedName || !cleanedPhoneNumber) {
      setErrorMessage("Please add a helper name and phone number.");
      return;
    }

    onSave({
      helperName: trimmedName,
      phoneNumber: cleanedPhoneNumber,
    });

    setErrorMessage("");
  }

  return (
    <section className="help-contact-setup">
      <h2>Set up help message</h2>

      <p>
        Add the person this app should message if help is needed. This is saved
        only on this phone.
      </p>

      <form onSubmit={handleSubmit}>
        <label>
          Helper name
          <input
            type="text"
            value={helperName}
            onChange={(event) => setHelperName(event.target.value)}
            placeholder="Sarah"
          />
        </label>

        <label>
          Helper phone number
          <input
            type="tel"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            placeholder="+614..."
          />
        </label>

        {errorMessage && (
          <p className="setup-error-message">{errorMessage}</p>
        )}

        <button type="submit" className="save-helper-button">
          Save help contact
        </button>
      </form>
    </section>
  );
}

export default HelpContactSetup;