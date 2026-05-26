# Grandma's Games

Grandma's Games is a simple, elderly-friendly games app built with React and Vite.

The app is designed to be easy to read, easy to tap, and comfortable to use on a phone or tablet. It currently includes Connect 4 and Marble Solitaire, with space to add more games later.

## Live app

This app is deployed with GitHub Pages.

If deployed, it should be available from the project’s GitHub Pages link.

## Current features

- Games dashboard with large game cards
- Connect 4 game against the phone
- Marble Solitaire single-player puzzle game
- Easy and Normal phone skill settings for Connect 4
- Sound on/off setting
- Support page with a saved helper contact
- SMS support message button
- Bottom navigation for Games, Support and Settings
- Mobile-friendly layout
- PWA basics, including manifest and service worker
- Improved accessibility features

## Connect 4 features

- Player is red
- Phone is yellow
- Tap a column to drop a counter
- Falling counter animation
- Phone can take a turn automatically
- Easy and Normal phone skill settings
- Winning counters are highlighted
- New Game / Play Again button
- Sound effects for moves and game results
- Screen-reader support for game status and board summaries
- Logic tests for game rules and phone move behaviour

## Marble Solitaire features

- Classic cross-shaped Marble Solitaire board
- Centre hole starts empty
- Tap a marble to select it
- Valid move holes are highlighted
- Jumped marble is removed after a valid move
- Marble count updates after each move
- Friendly status messages guide the player
- No-moves-left detection
- Gentle end-of-round panel
- Play Again / New Game option
- Soft pine-style wooden board
- Glossy black marbles
- Basic screen-reader support
- Logic tests for the game rules

## Accessibility and elderly-friendly design

This project aims to be friendly for older users and people who may need clearer, simpler interfaces.

Current accessibility and usability features include:

- Large buttons
- Clear text
- Calm colours
- High-contrast game pieces
- Visible keyboard focus styles
- Reduced-motion support
- Screen-reader status messages
- Screen-reader board summaries for Connect 4
- Clear screen-reader labels for Marble Solitaire
- `aria-pressed` on toggle and selected-state buttons
- `aria-current` on the active navigation item
- Strong visual outlines for selected and valid move states

## Privacy note

The support contact is saved only on the user’s own device using `localStorage`.

No support contact name or phone number is hard-coded into the app.

This is important because the app is stored in a public GitHub repository.

## PWA update safety

The app includes a simple update-checking system so installed versions can update more reliably.

The app uses:

- `public/app-version.json` to store the current deployed version
- `src/utils/appUpdateChecker.js` to check whether the version has changed
- a visibility check so the app checks again when the user returns from the home screen
- service worker cache rules so `app-version.json` is not cached

If a new version is found while the user is on the Games, Support or Settings screen, the app can refresh automatically.

If a new version is found while the user is inside a game, the app waits until they return to a non-game screen before refreshing. This helps avoid interrupting someone mid-game.

To trigger an update check after a deployment, update the version string in:

```txt
public/app-version.json

## Project structure

```txt
src/
  assets/
    headings/
      connect4-heading.png
      games-heading.png

  components/
    BottomNav.jsx
    GameCard.jsx
    HelpContactSetup.jsx
    MessageButton.jsx

  data/
    gamesList.js

  games/
    connect4/
      Connect4Board.jsx
      connect4Logic.js
      connect4Logic.test.js
      phoneMove.js
      phoneMove.test.js

    marbleSolitaire/
      MarbleSolitaireBoard.jsx
      marbleSolitaireLogic.js
      marbleSolitaireLogic.test.js

  pages/
    Connect4Page.jsx
    GamesDashboard.jsx
    MarbleSolitairePage.jsx
    MessagesPage.jsx
    SettingsPage.jsx

  styles/
    accessibility.css
    base.css
    buttons.css
    cards.css
    connect4.css
    dashboard.css
    images.css
    layout.css
    marble-solitaire.css
    navigation.css
    responsive.css
    settings.css
    support.css

  utils/
    helpContactStorage.js
    soundEffects.js

  App.css
  App.jsx
  main.jsx