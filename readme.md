# Corona Fallzahlen App

![GitHub](https://img.shields.io/github/license/markxoe/corona-fallzahlen-app?style=flat-square)

![GitHub package.json version](https://img.shields.io/github/package-json/v/markxoe/corona-fallzahlen-app?style=flat-square)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/markxoe/corona-fallzahlen-app/Test,%20build%20and%20deploy?style=flat-square)

![Uses Ionic](https://img.shields.io/badge/-uses%20ionic-000?logo=ionic&style=flat-square)
![Uses capacitor](https://img.shields.io/badge/-uses%20capacitor-000?logo=capacitor&style=flat-square)

## Beschreibung

Corona Fallzahlen App zum Anzeigen von Corona Fallzahlen

Verwendet diese API: [RKI API v2](https://github.com/marlon360/rki-covid-api)

Made with Ionic React

## Warum?

Weiß auch nicht warum, waren nur 5 Stunden Arbeit.

Codequality ist vielleicht nicht so nice aber egal

## Wie?

- Verwendet die oben genannte API
- Datenverwaltung mit React's `useReducer` und `useContext`
- API Abfragen mit `axios`

## Installation

### Das brauchst du

1. Kein leben
2. Computer mit Linux, Windows oder wenn du komisch bist MacOS
3. NodeJS mit npm

### Das machst du

1. Pakete mit `npm i` installieren
2. Nen Build machen mit `npm run build`
3. Wenns spaß macht noch testen mit `npm run test`

### Für Android

Achtung: Du brauchst Android Studio

1. Build machen
2. Android Platform Synchronisieren mit `npx cap sync android`
3. Android Studio öffnen mit `npx cap open android`

### Für iOS

Achtung: Du brauchst nen Mac und XCode

1. Build machen
2. ios Platform Synchronisieren mit `npx cap sync ios`
3. XCode öffnen mit `npx cap open ios`

## Geplante tolle Dinge

- [ ] Infinity Scroll
- [x] Favoriten

## Lizenz

GNU GPLv3

Powered By hässlicher Code von markxoe
