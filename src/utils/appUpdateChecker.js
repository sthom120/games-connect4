/*
  App update checker

  This file checks public/app-version.json to see whether the deployed app
  version has changed.

  This helps the installed PWA update more reliably for users who may not
  manually refresh, clear browser history, or fully close the app.
*/

const APP_VERSION_STORAGE_KEY = "games-app-version";

/*
  Fetch the latest version file.

  cache: "no-store" tells the browser to ask for the newest version instead of
  trusting an old cached copy.
*/
export async function fetchLatestAppVersion() {
  const response = await fetch(`${import.meta.env.BASE_URL}app-version.json`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Could not check app version.");
  }

  const appVersionInfo = await response.json();

  if (!appVersionInfo.version) {
    throw new Error("App version file is missing a version value.");
  }

  return appVersionInfo.version;
}

/*
  Check whether the app version has changed.

  This function does not reload the page by itself.
  It returns information so App.jsx can decide what to do.
*/
export async function checkForAppUpdate() {
  try {
    const latestVersion = await fetchLatestAppVersion();
    const savedVersion = localStorage.getItem(APP_VERSION_STORAGE_KEY);

    // First time checking on this device.
    // Save the version, but do not treat it as an update.
    if (!savedVersion) {
      localStorage.setItem(APP_VERSION_STORAGE_KEY, latestVersion);

      return {
        updateAvailable: false,
        latestVersion,
        savedVersion: null,
      };
    }

    // A different deployed version exists.
    if (savedVersion !== latestVersion) {
      localStorage.setItem(APP_VERSION_STORAGE_KEY, latestVersion);

      return {
        updateAvailable: true,
        latestVersion,
        savedVersion,
      };
    }

    return {
      updateAvailable: false,
      latestVersion,
      savedVersion,
    };
  } catch {
    /*
      If the update check fails, do nothing.

      The app should still work if the user is offline or GitHub Pages is slow.
    */
    return {
      updateAvailable: false,
      latestVersion: null,
      savedVersion: localStorage.getItem(APP_VERSION_STORAGE_KEY),
    };
  }
}