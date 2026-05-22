const HELP_CONTACT_KEY = "games-help-contact";

// Gets the saved helper contact from this device.
export function getSavedHelpContact() {
  const savedContact = localStorage.getItem(HELP_CONTACT_KEY);

  if (!savedContact) {
    return null;
  }

  try {
    const contact = JSON.parse(savedContact);

    if (!contact.helperName || !contact.phoneNumber) {
      return null;
    }

    return contact;
  } catch {
    return null;
  }
}

// Saves the helper contact on this device only.
export function saveHelpContact(contact) {
  localStorage.setItem(
    HELP_CONTACT_KEY,
    JSON.stringify({
      helperName: contact.helperName.trim(),
      phoneNumber: contact.phoneNumber.trim(),
    })
  );
}

// Removes the saved helper contact.
export function clearHelpContact() {
  localStorage.removeItem(HELP_CONTACT_KEY);
}