# 🙏 Church Mobile App - Setup & Usage Guide

## 📋 Project Overview

This is a complete React Native mobile application designed specifically for churches to:

- **Share Updates** - Announcements, news, prayer requests, and ministry updates
- **Stream Live Services** - Broadcast and archive church services and events
- **Manage Events** - Display upcoming events with registration tracking
- **Notify Members** - Keep the community informed with push notifications

### Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Routing**: Expo Router
- **UI Components**: Custom themed components with light/dark mode support
- **State Management**: React Hooks

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd /Users/daniel/Desktop/Mobile-app-development/bleu
npm install
```

All required packages are already installed including:

- `expo-notifications` - Push notifications
- `react-native-calendars` - Calendar integration
- `react-native-svg` - SVG support
- `react-native-linear-gradient` - Gradient backgrounds

### 2. Run the App

**On iOS Simulator:**

```bash
npm run ios
```

**On Android Emulator:**

```bash
npm run android
```

**On Web Browser:**

```bash
npm run web
```

**Development Mode:**

```bash
npm start
```

---

## 📱 App Features Overview

### 🏠 Home Screen (`app/(tabs)/index.tsx`)

The main entry point displaying:

- **Church Name & Tagline** - "Blessed Community Church - Grow in Faith Together"
- **Featured Live Stream** - Currently active service
- **Latest Update** - Most recent announcement or news
- **Upcoming Event** - Next scheduled event
- **Quick Links** - Fast navigation to all sections

### 📺 Live Streaming (`app/(tabs)/live-stream.tsx`)

Features:

- **Now Streaming Section** - Active live streams with viewer count
- **Upcoming Streams** - Scheduled services
- **Stream Details** - Title, description, speaker, duration
- **Stream Archive** - Past services available on-demand
- **Schedule Information** - Regular streaming times

Sample data includes:

- Sunday Morning Worship (Currently Live)
- Midweek Prayer Meeting
- Youth Group Meeting
- Weekend Service Replays

### 📅 Events (`app/(tabs)/events.tsx`)

Comprehensive event management:

- **Event Listing** - All church events with details
- **Category Filtering** - Filter by event type:
  - 🙏 Worship
  - 📚 Study
  - 👥 Fellowship
  - 🤝 Outreach
  - 🙌 Prayer
- **Event Details** - Date, time, location, capacity, registration count
- **Visual Progress Bars** - Show event capacity usage
- **Registration Tracking** - See how many people signed up

Sample events:

- Sunday Morning Worship (Weekly)
- Midweek Bible Study
- Young Adults Fellowship
- Prayer Breakfast
- Community Outreach Day
- Children's Ministry Program

### 📢 Updates (`app/(tabs)/updates.tsx`)

Stay informed with:

- **Update Categories**:
  - 📣 Announcements
  - 📰 News
  - 🙏 Prayer Requests
  - 🤝 Ministry Opportunities
- **Filter Options** - View all or specific category
- **Contact Information** - Phone, email, address
- **Notification Setup** - Enable push notifications

Sample updates:

- New Youth Ministry Program
- Service Recording Available
- Prayer Request for Mission Trip
- Join Our Praise Team
- Community Outreach Success

---

## 📁 Project Structure

```
bleu/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx          ← Tab navigation (Home, Live, Events, Updates)
│   │   ├── index.tsx            ← Home screen
│   │   ├── live-stream.tsx      ← Live streaming
│   │   ├── events.tsx           ← Events management
│   │   └── updates.tsx          ← Updates/announcements
│   ├── _layout.tsx              ← Root layout with theme provider
│   └── modal.tsx                ← Modal template
│
├── components/
│   ├── update-card.tsx          ← Reusable update component
│   ├── live-stream-card.tsx     ← Reusable stream component
│   ├── event-card.tsx           ← Reusable event component
│   ├── themed-view.tsx          ← Theme-aware View wrapper
│   ├── themed-text.tsx          ← Theme-aware Text wrapper
│   ├── haptic-tab.tsx           ← Haptic feedback for tabs
│   ├── parallax-scroll-view.tsx ← Parallax scrolling
│   ├── hello-wave.tsx           ← Greeting component
│   ├── external-link.tsx        ← Link component
│   └── ui/
│       ├── icon-symbol.tsx      ← Icon component wrapper
│       ├── icon-symbol.ios.tsx  ← iOS-specific icons
│       └── collapsible.tsx      ← Collapsible component
│
├── constants/
│   ├── theme.ts                 ← Colors & styling
│   └── church-data.ts           ← All mock data
│
├── hooks/
│   ├── use-color-scheme.ts      ← Color scheme detection
│   ├── use-color-scheme.web.ts  ← Web-specific hook
│   └── use-theme-color.ts       ← Theme color hook
│
├── assets/
│   └── images/                  ← App icons and images
│
├── app.json                     ← Expo configuration
├── package.json                 ← Dependencies
├── tsconfig.json                ← TypeScript config
├── eslint.config.js             ← Linting rules
└── CHURCH_APP_README.md         ← Feature documentation
```

---

## 🎨 Customization Guide

### 1. Change Church Name & Colors

**Update `app.json`:**

```json
{
  "expo": {
    "name": "Your Church Name",
    "slug": "your-church-slug",
    "android": {
      "adaptiveIcon": {
        "backgroundColor": "#YOUR_COLOR_HEX"
      }
    }
  }
}
```

**Update `constants/theme.ts`:**

```typescript
const tintColorLight = "#YOUR_PRIMARY_COLOR";
const tintColorDark = "#YOUR_SECONDARY_COLOR";
```

### 2. Add Your Church Information

**Update `constants/church-data.ts`:**

```typescript
// Add your updates
export const CHURCH_UPDATES: Update[] = [
  {
    id: "your-id",
    title: "Your Title",
    description: "Your description",
    date: "2025-02-23",
    category: "announcement",
  },
  // ... more updates
];

// Add your events
export const CHURCH_EVENTS: Event[] = [
  {
    id: "your-id",
    title: "Your Event",
    description: "Your description",
    date: "2025-02-23",
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    location: "Your Location",
    category: "worship",
    capacity: 100,
    registered: 50,
  },
  // ... more events
];

// Add your live streams
export const LIVE_STREAMS: LiveStream[] = [
  {
    id: "your-id",
    title: "Your Stream",
    description: "Your description",
    startTime: "2025-02-23T10:00:00",
    duration: 90,
    isLive: true,
    speaker: "Speaker Name",
    viewers: 342,
  },
  // ... more streams
];
```

### 3. Update Contact Information

In `app/(tabs)/updates.tsx`, find the Contact Section and update:

```typescript
<ThemedText style={styles.contactDetail}>
  (555) 123-4567  // Your phone number
</ThemedText>
```

### 4. Change Icons

The app uses SF Symbols for iOS. Change icons in `app/(tabs)/_layout.tsx`:

```typescript
<Tabs.Screen
  name="index"
  options={{
    title: 'Home',
    tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
  }}
/>
```

Available symbols: `house.fill`, `video.fill`, `calendar`, `bell.fill`, etc.

---

## 🔧 Development Tips

### Hot Reload

The app supports hot reload. Save a file and it will automatically update on your device/emulator.

### Debug Mode

Press `d` in the terminal to open the developer menu:

```
Press h to show help
Press d to show developer menu
```

### Component Reusability

The app uses three main card components:

- `UpdateCard` - For updates and announcements
- `EventCard` - For events with registration tracking
- `LiveStreamCard` - For live streams with viewer info

Use these throughout your app for consistency.

### TypeScript Interfaces

All data types are defined in `constants/church-data.ts`:

```typescript
interface Update {
  id: string;
  title: string;
  description: string;
  date: string;
  category: "announcement" | "news" | "prayer" | "ministry";
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  category: "worship" | "study" | "fellowship" | "outreach" | "prayer";
  capacity?: number;
  registered?: number;
}

interface LiveStream {
  id: string;
  title: string;
  description: string;
  startTime: string;
  duration: number;
  isLive: boolean;
  speaker?: string;
  viewers?: number;
}
```

---

## 🚀 Advanced Features to Add

### 1. Push Notifications

```typescript
import * as Notifications from "expo-notifications";

// Request permission
const { status } = await Notifications.requestPermissionsAsync();

// Schedule notification
await Notifications.scheduleNotificationAsync({
  content: {
    title: "Service Starting Soon!",
    body: "Join us for Sunday worship",
  },
  trigger: { seconds: 60 },
});
```

### 2. Backend Integration

Replace mock data with API calls:

```typescript
// Replace CHURCH_UPDATES with API call
const [updates, setUpdates] = useState([]);

useEffect(() => {
  fetch("https://your-api.com/updates")
    .then((res) => res.json())
    .then((data) => setUpdates(data));
}, []);
```

### 3. Authentication

Add user login with Expo AuthSession:

```typescript
import * as AuthSession from "expo-auth-session";
```

### 4. Deep Linking

Configure in `app/_layout.tsx`:

```typescript
linking: {
  prefixes: ['bleu://'],
  config: {
    screens: {
      '(tabs)': {
        screens: {
          index: '',
          'live-stream': 'live',
          events: 'events',
          updates: 'updates',
        },
      },
    },
  },
}
```

### 5. Analytics

Add event tracking:

```typescript
import { Amplitude } from "@amplitude/analytics-react-native";

Amplitude.track("Event Viewed", { eventId: event.id });
```

---

## ✅ Testing Checklist

- [ ] All screens load without errors
- [ ] Navigation between tabs works smoothly
- [ ] Filtering works on Events and Updates
- [ ] Cards display correctly on different screen sizes
- [ ] Light and dark modes toggle properly
- [ ] All images and icons display
- [ ] Horizontal scrolling works on filter buttons
- [ ] TouchableOpacity feedback works
- [ ] No console warnings or errors

---

## 📦 Building for Production

### iOS Build

```bash
eas build --platform ios
```

### Android Build

```bash
eas build --platform android
```

### Configure EAS

```bash
eas init
```

---

## 📞 Support & Resources

- **Expo Documentation**: https://docs.expo.dev/
- **React Native Docs**: https://reactnative.dev/
- **Expo Router**: https://docs.expo.dev/router/introduction/
- **SF Symbols**: https://developer.apple.com/sf-symbols/

---

## 🎯 Next Steps

1. **Customize Data**: Replace mock data with your church information
2. **Update Branding**: Change colors, app name, and icons
3. **Add Backend**: Connect to your church management system
4. **Enable Notifications**: Set up push notifications for members
5. **Deploy**: Build and submit to App Stores

---

## 📝 Notes

- The app is fully responsive and works on phones, tablets, and web
- All components support light and dark modes
- TypeScript ensures type safety and better development experience
- Mock data is in `constants/church-data.ts` for easy updates
- Components are reusable and follow React best practices

---

Built with ❤️ for the church community
