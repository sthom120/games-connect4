# Accessible Games Hub

An elderly-friendly Progressive Web App with simple, accessible games.

Accessible Games Hub is designed for older adults who may need larger buttons, clearer navigation, simple instructions, calm colours, and a layout that works well on a mobile phone.

## Live app

[Open Accessible Games Hub](https://sthom120.github.io/games-connect4/)

## Project overview

This project started as a simple Connect 4 game and has grown into a small accessible games hub.

The goal is not to create a complex gaming app. The goal is to create a friendly, low-stress app that is easy for an older person to open, understand, and use independently.

The app currently includes:

* A games dashboard
* Connect 4 against the phone
* Marble Solitaire
* Settings for sound and Connect 4 phone skill
* A support page where the user can save a helper contact
* Progressive Web App features so the app can be installed on a phone

## Tech used

* React
* Vite
* JavaScript
* CSS
* Vitest
* GitHub Pages
* Progressive Web App features
* LocalStorage

## Current features

* Games dashboard with large game cards
* Connect 4 game against the phone
* Marble Solitaire single-player puzzle game
* Easy and Normal phone skill settings for Connect 4
* Sound on/off setting
* Support page with a saved helper contact
* SMS support message button
* Bottom navigation for Games, Support and Settings
* Mobile-friendly layout
* PWA basics, including a manifest and service worker
* Accessibility and elderly-friendly design features
* Logic tests for game behaviour

## Connect 4 features

* Player is red
* Phone is yellow
* Tap a column to drop a counter
* Falling counter animation
* Phone takes a turn automatically
* Easy and Normal phone skill settings
* Winning counters are highlighted
* New Game / Play Again button
* Sound effects for moves and game results
* Screen-reader support for game status and board summaries
* Logic tests for game rules and phone move behaviour

## Marble Solitaire features

* Classic cross-shaped Marble Solitaire board
* Centre hole starts empty
* Tap a marble to select it
* Valid move holes are highlighted
* Jumped marble is removed after a valid move
* Marble count updates after each move
* Friendly status messages guide the player
* No-moves-left detection
* Gentle end-of-round panel
* Play Again / New Game option
* Soft pine-style wooden board
* Glossy black marbles
* Basic screen-reader support
* Logic tests for the game rules

## Accessibility and elderly-friendly design

This project is designed with older users in mind. The interface aims to be calm, clear, and easy to tap.

Current accessibility and usability features include:

* Large buttons
* Clear text
* Calm colours
* High-contrast game pieces
* Visible keyboard focus styles
* Reduced-motion support
* Screen-reader status messages
* Screen-reader board summaries for Connect 4
* Clear screen-reader labels for Marble Solitaire
* `aria-pressed` on toggle and selected-state buttons
* `aria-current` on the active navigation item
* Strong visual outlines for selected and valid move states

## Privacy note

The support contact is saved only on the user's own device using `localStorage`.

No support contact name or phone number is hard-coded into the app.

This is important because the app is stored in a public GitHub repository.

## PWA update safety

The app includes a simple update-checking system so installed versions can update more reliably after deployment.

The app uses:

* `public/app-version.json` to store the current deployed version
* `src/utils/appUpdateChecker.js` to check whether the version has changed
* a visibility check so the app checks again when the user returns from the home screen
* service worker cache rules so `app-version.json` is not cached

If a new version is found while the user is on the Games, Support or Settings screen, the app can refresh automatically.

If a new version is found while the user is inside a game, the app waits until they return to a non-game screen before refreshing. This helps avoid interrupting someone mid-game.

To trigger an update check after a deployment, update the version string in:

```txt
public/app-version.json
```

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
    appUpdateChecker.js
    helpContactStorage.js
    soundEffects.js

  App.css
  App.jsx
  main.jsx
```

## Running the project locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run tests:

```bash
npm run test
```

Run linting:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

## Testing

This project uses Vitest for logic tests.

Current test coverage includes:

* Connect 4 board creation
* Connect 4 move behaviour
* Connect 4 win detection
* Connect 4 phone move behaviour
* Marble Solitaire board setup
* Marble Solitaire valid and invalid moves
* Marble Solitaire no-moves-left detection

## Deployment

The app is deployed with GitHub Pages.

The Vite base path is configured for the GitHub Pages repository path:

```txt
/games-connect4/
```

Deployment runs through GitHub Actions.

## Design decisions

This app was designed around a real user need: making simple games easier for an older person to use on a phone.

Important design decisions include:

* keeping navigation simple
* using large tap targets
* avoiding unnecessary login or account setup
* saving support contact details only on the user's device
* making settings simple and low-risk
* reducing visual clutter
* making game status messages clear
* adding tests for the game logic
* adding PWA support so the app can be installed on a phone

## Planned improvements

Future improvements may include:

* A clearer first-time help screen
* More polished app screenshots in this README
* A high-visibility display mode
* Safer confirmation before starting a new game
* More screen-reader refinements
* Saving unfinished game progress
* More automated checks before deployment
* Additional simple games, such as Memory Game or Guess the Word

## Status

This project is actively being improved as part of a learning and portfolio development process.

Current focus: professional polish, accessibility improvements, and making the app feel reliable for real users.
