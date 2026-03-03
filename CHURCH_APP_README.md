# CAOIM Church Mobile App

**Christ The Alpha & Omega Int'l Ministries** — A modern React Native mobile application built with Expo for connecting, streaming, and engaging with the CAOIM church community.

---

## ✨ Features

### 🎬 Onboarding

- **Full-screen image backgrounds** — Four swipeable pages using `p1.jpg` – `p4.jpg`
- **Animated pagination dots** — Smooth width/opacity interpolation
- **Skip & Get Started** — Quick skip button or page-through flow
- **Always-show mode** — Dev flag to replay onboarding on every launch

### 🏠 Home Screen (Bento Grid)

- **Personalised greeting** — Time-of-day greeting ("Good Morning, Daniel!")
- **Dark / Light mode toggle** — Round button in the header to switch themes on the fly
- **Featured Hymn Night banner** — Prominent event card with music icon
- **Bento-style card grid** — Live Stream, Events, Latest Update, Bible Study, Prayer Wall, Giving, Media
- **Scroll animations** — Header parallax (scale + opacity) driven by scroll position
- **Floating tab bar** — Rounded, elevated navigation bar hovering above the bottom edge

### 📺 Live Streaming

- Active & upcoming streams with viewer count and speaker info
- Live badge indicator
- Schedule info cards

### 📅 Events

- Category filter pills (Worship, Study, Fellowship, Prayer, Outreach)
- Event cards with date, time, location, capacity, and registration count
- Featured section with contact CTA

### 🎵 Media (formerly Updates)

- **Sermons tab** — Video & audio sermons with speaker, date, duration, and series info
- **Bible tab** — Grid of Old & New Testament books with chapter counts
- Filter pills (All / Video / Audio and All Books / Old Testament / New Testament)
- Play-circle icon for instant playback

### 💛 Giving (Mobile Money — UGX)

- Dedicated giving screen accessible from Home
- **Giving types** — Tithe, Offering, Missions, Building Fund, Other
- **Preset amounts** — 5K, 10K, 20K, 50K, 100K UGX quick-select chips
- **MTN Mobile Money** — Yellow branded card with radio selector
- **Airtel Money** — Red branded card with radio selector
- **Phone number input** — +256 prefix, validated before submission
- Confirmation dialog with provider, amount, and phone summary
- Secure/encrypted note at the bottom

### 🌙 Dark / Light Mode

- Global theme toggle (React Context) — persists across all screens
- Bold blue & pink palette (#203F9A / #E84797) with pastel accents (#94C2DA / #E7A0CC) for both modes
- All screens, cards, and components are fully theme-aware

### 🎨 Brand Splash

- Animated CAOIM logo on every app launch (fade-in + spring scale → fade-out)
- Church name and tagline

---

## 📁 Project Structure

```
app/
├── _layout.tsx              # Root layout — splash → onboarding → tabs (ThemeToggleProvider)
├── giving.tsx               # Giving screen (MTN & Airtel Mobile Money)
├── modal.tsx                # Modal template
└── (tabs)/
    ├── _layout.tsx          # Floating tab bar (Home, Live, Events, Media)
    ├── index.tsx            # Home — bento grid, greeting, dark mode toggle, Hymn Night
    ├── live-stream.tsx      # Live streaming screen
    ├── events.tsx           # Events with category filters
    └── updates.tsx          # Media screen (sermons + Bible)

components/
├── brand-splash.tsx         # Animated launch splash (CAOIM logo)
├── onboarding-screen.tsx    # 4-page onboarding with p1–p4.jpg backgrounds
├── event-card.tsx           # Event card component
├── live-stream-card.tsx     # Live stream card component
├── update-card.tsx          # Update card component
├── haptic-tab.tsx           # Haptic feedback for tab presses
├── themed-view.tsx          # Theme-aware View
├── themed-text.tsx          # Theme-aware Text
├── parallax-scroll-view.tsx # Parallax scrolling container
├── external-link.tsx        # External link handler
└── ui/
    ├── icon-symbol.tsx      # Cross-platform icon component
    ├── icon-symbol.ios.tsx  # iOS SF Symbols variant
    └── collapsible.tsx      # Collapsible/accordion component

constants/
├── theme.ts                 # Color system (light/dark), bento tokens, font families
└── church-data.ts           # Mock data (updates, live streams, events)

hooks/
├── use-app-theme.ts         # Returns resolved color palette for current theme
├── use-theme-toggle.ts      # ThemeToggleProvider context + useThemeToggle() hook
├── use-user.ts              # Mock user hook (greeting, display name)
├── use-onboarding.ts        # Onboarding state (AsyncStorage, always-show flag)
├── use-color-scheme.ts      # System color scheme re-export
├── use-color-scheme.web.ts  # Web-specific color scheme
└── use-theme-color.ts       # Single theme color lookup

assets/images/
├── caoim-logo.png           # CAOIM church logo
├── p1.jpg – p4.jpg          # Onboarding background photos
├── splash-icon.png          # Expo splash screen icon
├── icon.png                 # App icon
└── ...                      # Android adaptive icons, favicon, React logos
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm or yarn
- Expo CLI (`npx expo`)
- Expo Go app on your device (iOS / Android)

### Installation

```bash
# Clone the repository
git clone https://github.com/Danielisrael1/caoim-mobile.git
cd caoim-mobile

# Install dependencies
npm install
```

### Running the App

```bash
# Start development server
npx expo start

# Or platform-specific
npx expo start --ios
npx expo start --android
npx expo start --web
```

Scan the QR code with Expo Go, or press `i` / `a` to open in a simulator.

---

## 🎨 Customisation

### Theme Colours

Edit `constants/theme.ts`:

```typescript
const tintColorLight = "#203F9A"; // Bold blue (change to your church colour)
const tintColorDark = "#94C2DA"; // Pastel blue for dark mode
```

Bento card tokens: `bentoLarge`, `bentoMedium`, `bentoSmall`, `bentoAccent`

### Church Information

- Update `app.json` — change `"name"` to your church name
- Replace `assets/images/caoim-logo.png` with your logo
- Replace `p1.jpg` – `p4.jpg` with your onboarding photos

### Mock User

Edit `hooks/use-user.ts` to change the default test user:

```typescript
firstName: "Daniel",
lastName: "Israel",
```

### Onboarding

To stop always-showing onboarding (production), set `ALWAYS_SHOW_ONBOARDING = false` in `hooks/use-onboarding.ts`.

---

## 🛣️ Roadmap

- [x] Bento-style home screen with scroll animations
- [x] Dark / light mode toggle
- [x] Full-image onboarding flow
- [x] Featured Hymn Night event
- [x] Media screen (sermons + Bible)
- [x] Giving screen (MTN & Airtel Mobile Money — UGX)
- [x] Floating rounded tab bar
- [x] Brand splash animation
- [ ] Firebase Authentication & user profiles
- [ ] Firestore for live data (sermons, events, updates)
- [ ] Push notifications (expo-notifications)
- [ ] Real mobile-money payment integration (MTN MoMo API / Airtel Money API)
- [ ] Bible reader with chapter/verse view
- [ ] Sermon video/audio player
- [ ] Prayer request submission & wall
- [ ] Event registration system
- [ ] Group messaging & community forum
- [ ] Multi-language support
- [ ] Church calendar sync (Google Calendar, Outlook)

---

## 🧱 Technology Stack

| Layer      | Technology                                            |
| ---------- | ----------------------------------------------------- |
| Framework  | React Native 0.81                                     |
| Platform   | Expo SDK 54                                           |
| Language   | TypeScript (strict)                                   |
| Routing    | expo-router ~6.0 (file-based)                         |
| Navigation | React Navigation 7                                    |
| Animations | react-native-reanimated ~4.1 + Animated API           |
| Storage    | @react-native-async-storage/async-storage             |
| Icons      | @expo/vector-icons (Ionicons, MaterialCommunityIcons) |
| State      | React Context + Hooks                                 |

---

## ♿ Accessibility

- High-contrast colours in both light and dark modes
- Large touch targets (≥ 40pt) on all interactive elements
- Semantic heading hierarchy
- Haptic feedback on tab presses (iOS)

---

## 📄 License

This project is created for CAOIM Church. Feel free to customise and distribute for your church community.

---

Built with ❤️ for **Christ The Alpha & Omega Int'l Ministries**
