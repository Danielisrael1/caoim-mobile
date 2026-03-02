# 🙏 Church App - Quick Reference Card

## 🚀 Quick Start (Copy & Paste)

```bash
# Navigate to project
cd /Users/daniel/Desktop/Mobile-app-development/bleu

# Start the app
npm start

# For iOS
npm run ios

# For Android
npm run android

# For Web
npm run web
```

---

## 📱 App Navigation

| Tab | Screen      | File                         | Purpose                         |
| --- | ----------- | ---------------------------- | ------------------------------- |
| 🏠  | Home        | `app/(tabs)/index.tsx`       | Dashboard with featured content |
| 📺  | Live Stream | `app/(tabs)/live-stream.tsx` | Watch services live             |
| 📅  | Events      | `app/(tabs)/events.tsx`      | View upcoming events            |
| 📢  | Updates     | `app/(tabs)/updates.tsx`     | Church announcements            |

---

## 📂 Key Files to Customize

### 1. Church Information

**File**: `constants/church-data.ts`

- Add/edit `CHURCH_UPDATES` array
- Add/edit `CHURCH_EVENTS` array
- Add/edit `LIVE_STREAMS` array

### 2. Branding

**File**: `app.json`

- Change `"name"` to your church name
- Update `"slug"`
- Change colors in `"android"."adaptiveIcon"`

**File**: `constants/theme.ts`

- Change `tintColorLight` to your primary color
- Change `tintColorDark` for dark mode

### 3. Contact Info

**File**: `app/(tabs)/updates.tsx` (line ~110)

- Update phone number
- Update email
- Update address

---

## 🎨 Color Values Quick Reference

```typescript
// Current (Church Blue)
Primary: #1E5A96      // Deep blue
Secondary: #fff       // White (dark mode)

// Suggested Church Colors
Catholic Red:        #CC0000
Presbyterian Blue:   #003478
Lutheran Orange:     #D35400
Methodist Gold:      #FFD700
Baptist Navy:        #001F3F
Pentecostal Red:     #FF0000

// Usage
const tintColorLight = '#1E5A96';  // Update in theme.ts
```

---

## 📝 Data Structure Quick Reference

### Update

```typescript
{
  id: 'unique-id',
  title: 'Update Title',
  description: 'Full description',
  date: '2025-02-23',
  category: 'announcement' | 'news' | 'prayer' | 'ministry'
}
```

### Event

```typescript
{
  id: 'unique-id',
  title: 'Event Name',
  description: 'Event description',
  date: '2025-02-23',
  startTime: '10:00 AM',
  endTime: '11:30 AM',
  location: 'Event location',
  category: 'worship' | 'study' | 'fellowship' | 'prayer' | 'outreach',
  capacity: 100,        // Optional
  registered: 50        // Optional
}
```

### Live Stream

```typescript
{
  id: 'unique-id',
  title: 'Stream Title',
  description: 'Stream description',
  startTime: '2025-02-23T10:00:00',
  duration: 90,
  isLive: true,         // Set to true if currently streaming
  speaker: 'Name',      // Optional
  viewers: 342          // Optional
}
```

---

## 🔧 Common Tasks

### Add New Update

```typescript
// In constants/church-data.ts
CHURCH_UPDATES.push({
  id: "new-update-5",
  title: "Your Title",
  description: "Your description...",
  date: "2025-02-24",
  category: "announcement",
});
```

### Add New Event

```typescript
// In constants/church-data.ts
CHURCH_EVENTS.push({
  id: "new-event-7",
  title: "Your Event",
  description: "Description...",
  date: "2025-03-01",
  startTime: "6:00 PM",
  endTime: "8:00 PM",
  location: "Your Location",
  category: "fellowship",
  capacity: 75,
  registered: 0,
});
```

### Change App Name

```json
{
  "name": "Your Church Name"
}
```

### Change Primary Color

```typescript
// theme.ts
const tintColorLight = "#YOUR_HEX_COLOR";
```

---

## 🐛 Troubleshooting

| Issue                  | Solution                                  |
| ---------------------- | ----------------------------------------- |
| App won't start        | Run `npm install` then `npm start`        |
| Hot reload not working | Press `r` in terminal or reload app       |
| TypeScript errors      | Check `tsconfig.json`, run `npm run lint` |
| Style not applying     | Clear cache: `npm start -- --clear`       |
| Dark mode issues       | Check `hooks/use-color-scheme.ts`         |

---

## 📦 File Organization

```
Important Files:
├── constants/
│   ├── church-data.ts    ← UPDATE: All your data
│   └── theme.ts          ← UPDATE: Colors
├── app/(tabs)/
│   ├── index.tsx         ← Home screen
│   ├── live-stream.tsx   ← Streaming
│   ├── events.tsx        ← Events
│   └── updates.tsx       ← Updates
├── components/
│   ├── update-card.tsx   ← Update display
│   ├── event-card.tsx    ← Event display
│   └── live-stream-card.tsx ← Stream display
├── app.json              ← UPDATE: App config
└── services/
    └── api.ts            ← Backend integration
```

---

## 🎯 Component Usage

All components automatically support light/dark mode:

```typescript
// Use ThemedText for text
<ThemedText type="title">Main Heading</ThemedText>
<ThemedText type="subtitle">Sub heading</ThemedText>
<ThemedText>Regular text</ThemedText>

// Use ThemedView for containers
<ThemedView style={styles.container}>
  {/* Content */}
</ThemedView>

// Use cards for content
<UpdateCard update={update} onPress={() => {}} />
<EventCard event={event} onPress={() => {}} />
<LiveStreamCard stream={stream} onPress={() => {}} />
```

---

## 🚀 Deployment Checklist

- [ ] All data updated in `constants/church-data.ts`
- [ ] Colors updated in `constants/theme.ts`
- [ ] App name updated in `app.json`
- [ ] Contact info updated in `updates.tsx`
- [ ] No console errors: `npm run lint` passes
- [ ] Tested on iOS simulator
- [ ] Tested on Android emulator
- [ ] Tested on web browser
- [ ] Dark mode tested
- [ ] All screens navigate correctly

---

## 📞 Icons Reference

Common icons used in the app:

```
house.fill          → Home
video.fill          → Live Stream
calendar            → Events
bell.fill           → Updates/Notifications
person.fill         → User
clock                → Time
location.fill       → Location
megaphone.fill      → Announcements
newspaper.fill      → News
music.note          → Worship
book.fill           → Study
person.2.fill       → Fellowship
heart.fill          → Outreach/Love
hands.sparkles      → Prayer
play.circle.fill    → Play video
```

---

## 💡 Pro Tips

1. **Hot Reload**: Press `r` in the terminal to reload
2. **Debug Mode**: Press `d` in terminal for dev menu
3. **Device Testing**: Use Expo Go app on real devices
4. **Performance**: Use React DevTools browser extension
5. **Version Control**: Use Git to track changes
6. **Backup Data**: Keep old data in version control

---

## 📚 Documentation Files

- `IMPLEMENTATION_SUMMARY.md` - What was built
- `SETUP_GUIDE.md` - How to set up and customize
- `CHURCH_APP_README.md` - Feature details
- `services/api.ts` - Backend integration examples
- `constants/church-data.ts` - Data structures

---

## 🎉 You're All Set!

Your church app is ready to:

1. ✅ Display updates
2. ✅ Stream services
3. ✅ Manage events
4. ✅ Notify members

**Next: Customize with your church info and deploy!** 🙏

---

Questions? Check the documentation files above!
