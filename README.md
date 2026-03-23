# CAOIM Church — Mobile App

React Native / Expo (SDK 54) app for **Christ The Alpha & Omega Int'l Ministries (CAOIM Church)**.

## What’s inside

- **Expo Router** file-based navigation (`expo-router`)
- **Brand splash** + **onboarding** flow
- **Supabase Authentication** (email/password)
  - Auth is required after onboarding (app is gated until login/signup succeeds)
  - Profile includes **Sign out**
- **YouTube** integration (Live tab)
  - In-app player with a safe fallback to open in YouTube when a video is restricted
- **Events** listing (recurring service logic)
- **Media** tab
- **Theme toggle** (system / light / dark)

For full feature documentation and architecture notes see:

- `CHURCH_APP_README.md`

---

## Requirements

- Node.js (recommended: LTS)
- npm
- Expo account (only needed for EAS builds)

---

## Setup

```bash
npm install
```

## Run (development)

```bash
npx expo start
```

### Platform shortcuts

```bash
npm run ios
npm run android
npm run web
```

---

## Environment variables

Supabase keys are expected as public Expo env vars:

- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`

(If they are missing, auth will not work.)

---

## App icon / branding

Configured in `app.json`:

- App icon: `./assets/images/caoim-logo.png`
- Android adaptive icon foreground: `./assets/images/caoim-logo.png`

---

## Android preview build (APK) with EAS

This repo already includes `eas.json` with a `preview` profile configured to build an **APK**.

1. Login (one time):

```bash
npx eas-cli login
```

2. Build preview APK:

```bash
npx eas-cli build -p android --profile preview
```

EAS will output a build URL and an APK download link when complete.

---

## Scripts

- `npm run start` — start dev server
- `npm run ios` — open iOS
- `npm run android` — open Android
- `npm run web` — open web
- `npm run lint` — lint

---

## Repo notes

- Routing is in `app/`.
- Tabs live in `app/(tabs)/`.
- Auth route is `app/auth.tsx`.
