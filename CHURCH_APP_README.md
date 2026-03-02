# Blessed Church Mobile App

A comprehensive React Native mobile application built with Expo for churches to share updates, stream services, and manage community events.

## Features

### 🏠 Home Screen

- **Featured Live Stream** - Quick access to active services and events
- **Latest Updates** - Stay informed with the most recent announcements, news, and prayer requests
- **Upcoming Events** - See what's happening at your church next
- **Quick Links** - Fast navigation to all main features

### 📺 Live Streaming

- **Active Streams** - Watch services and events as they happen in real-time
- **Upcoming Schedules** - Know when the next stream will be available
- **Viewer Count** - See how many people are watching
- **Speaker Information** - Know who's leading the service or event
- **Stream Archive** - Watch past services on-demand

### 📅 Events Management

- **Comprehensive Event Listing** - View all church events and activities
- **Category Filtering** - Filter events by type (Worship, Study, Fellowship, Prayer, Outreach)
- **Event Details** - See date, time, location, speaker, and capacity information
- **Registration Tracking** - Visual indicators showing event capacity and registration count
- **Upcoming Schedule** - Plan your church calendar

### 📢 Updates & Announcements

- **Real-time Updates** - Get the latest news and announcements
- **Categorized Content** - Announcements, News, Prayer Requests, and Ministry updates
- **Filter Options** - Find exactly what you're looking for
- **Contact Information** - Easy access to church contact details
- **Notification Support** - Enable push notifications for important updates

## Project Structure

```
app/
├── (tabs)/
│   ├── _layout.tsx          # Tab navigation configuration
│   ├── index.tsx            # Home screen
│   ├── live-stream.tsx      # Live streaming screen
│   ├── events.tsx           # Events screen
│   └── updates.tsx          # Updates and announcements screen
├── _layout.tsx              # Root navigation
└── modal.tsx                # Modal template

components/
├── update-card.tsx          # Update card component
├── live-stream-card.tsx     # Live stream card component
├── event-card.tsx           # Event card component
├── themed-view.tsx          # Theme-aware view component
├── themed-text.tsx          # Theme-aware text component
├── haptic-tab.tsx           # Haptic feedback for tabs
├── parallax-scroll-view.tsx # Parallax scrolling view
├── ui/
│   ├── icon-symbol.tsx      # Icon component
│   ├── icon-symbol.ios.tsx  # iOS-specific icons
│   └── collapsible.tsx      # Collapsible component

constants/
├── theme.ts                 # Color and styling constants
└── church-data.ts           # Mock data for events, updates, streams

hooks/
├── use-color-scheme.ts      # Color scheme hook
├── use-color-scheme.web.ts  # Web-specific color scheme
└── use-theme-color.ts       # Theme color hook
```

## Mock Data

The app comes with sample data for demonstration purposes:

### Updates (5 samples)

- Announcements (New Youth Ministry Program)
- News (Service Recordings)
- Prayer Requests (Mission Trip)
- Ministry Opportunities (Praise Team)
- Community Events (Outreach Success)

### Live Streams (4 samples)

- Sunday Morning Worship (Live)
- Midweek Prayer Meeting
- Youth Group Meeting
- Weekend Service Replays

### Events (6 samples)

- Sunday Morning Worship (Weekly)
- Midweek Bible Study
- Young Adults Fellowship
- Prayer Breakfast
- Community Outreach
- Children's Ministry Program

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI

### Installation

1. Install dependencies:

```bash
npm install
```

2. Install additional packages (already done):

```bash
npm install expo-notifications react-native-calendars react-native-svg react-native-linear-gradient
```

### Running the App

**iOS:**

```bash
npm run ios
```

**Android:**

```bash
npm run android
```

**Web:**

```bash
npm run web
```

**Development:**

```bash
npm start
```

## Features Implementation Guide

### Adding New Updates

Edit `constants/church-data.ts` and add to the `CHURCH_UPDATES` array:

```typescript
{
  id: 'unique-id',
  title: 'Update Title',
  description: 'Update description',
  date: '2025-02-23',
  category: 'announcement' | 'news' | 'prayer' | 'ministry',
}
```

### Adding New Events

Add to the `CHURCH_EVENTS` array:

```typescript
{
  id: 'unique-id',
  title: 'Event Title',
  description: 'Event description',
  date: '2025-02-23',
  startTime: '10:00 AM',
  endTime: '11:30 AM',
  location: 'Location',
  category: 'worship' | 'study' | 'fellowship' | 'outreach' | 'prayer',
  capacity: 100,
  registered: 50,
}
```

### Adding Live Streams

Add to the `LIVE_STREAMS` array:

```typescript
{
  id: 'unique-id',
  title: 'Stream Title',
  description: 'Stream description',
  startTime: '2025-02-23T10:00:00',
  duration: 90,
  isLive: true | false,
  speaker: 'Speaker Name',
  viewers: 342,
}
```

## Customization

### Colors

Update the theme in `constants/theme.ts`:

```typescript
const tintColorLight = "#1E5A96"; // Change to your church color
```

### Church Information

Update the app name in `app.json`:

- Change `"name"` from "Blessed Church" to your church name
- Update colors to match your church branding

### Icons

The app uses Expo Vector Icons (SF Symbols for iOS). Available icons can be found in the `IconSymbol` component.

## Future Enhancements

- [ ] User authentication and member profiles
- [ ] Push notifications for updates and events
- [ ] Event registration system
- [ ] Giving/donation integration
- [ ] Prayer request submissions
- [ ] Group messaging and community forum
- [ ] Sermon search and archiving
- [ ] Bible study materials and resources
- [ ] Staff directory
- [ ] Childcare check-in system
- [ ] Church calendar sync (Google Calendar, Outlook)
- [ ] Multiple language support

## Technology Stack

- **React Native** - Cross-platform mobile framework
- **Expo** - React Native development platform
- **TypeScript** - Type-safe JavaScript
- **Expo Router** - File-based routing
- **React Navigation** - Navigation library
- **React Hooks** - State management

## Performance Optimization

- Lazy loading of data
- Efficient list rendering with FlatList
- Optimized image loading with expo-image
- Theme-aware components with light/dark mode support

## Accessibility

- High contrast colors for visibility
- Large touch targets for easy interaction
- Semantic navigation structure
- Haptic feedback for interactions

## License

This project is created for church use. Feel free to customize and distribute as needed for your church community.

## Support

For issues or feature requests, please contact your development team or consult the Expo documentation at https://docs.expo.dev/

---

Built with ❤️ for the church community
