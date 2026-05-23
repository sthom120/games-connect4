function MessageButton({ helperContact, onChangeContact }) {
  const defaultMessage = `Hi ${helperContact.helperName}, could you please help me with my Games app?`;
  const messageText = encodeURIComponent(defaultMessage);
  const smsLink = `sms:${helperContact.phoneNumber}?body=${messageText}`;

  return (
    <div className="message-area">
      <a className="message-button" href={smsLink}>
        Send {helperContact.helperName} a message
      </a>

      <button
        type="button"
        className="change-helper-button"
        onClick={onChangeContact}
      >
        Remove Support Contact
      </button>
    </div>
  );
}

export default MessageButton;