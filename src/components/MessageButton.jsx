import { useState } from "react";

function MessageButton({ helperContact, onRemoveContact }) {
  const [isConfirmingChange, setIsConfirmingChange] = useState(false);

  const defaultMessage = `Hi ${helperContact.helperName}, could you please help me with my Games app?`;
  const messageText = encodeURIComponent(defaultMessage);
  const smsLink = `sms:${helperContact.phoneNumber}?body=${messageText}`;

  function handleStartChangeContact() {
    setIsConfirmingChange(true);
  }

  function handleKeepContact() {
    setIsConfirmingChange(false);
  }

  return (
    <div className="message-area">
      <a className="message-button" href={smsLink}>
        Send {helperContact.helperName} a message
      </a>

      {!isConfirmingChange ? (
        <button
          type="button"
          className="change-helper-button"
          onClick={handleStartChangeContact}
        >
          Change support contact
        </button>
      ) : (
        <div className="contact-confirmation-box">
          <p>
            Are you sure? This will remove the saved support contact from this
            device.
          </p>

          <button
            type="button"
            className="keep-helper-button"
            onClick={handleKeepContact}
          >
            Keep current contact
          </button>

          <button
            type="button"
            className="remove-helper-button"
            onClick={onRemoveContact}
          >
            Remove and add new contact
          </button>
        </div>
      )}
    </div>
  );
}

export default MessageButton;