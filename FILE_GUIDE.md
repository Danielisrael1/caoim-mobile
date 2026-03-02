# 📂 Church App - Complete File Guide

## Which File Should I Edit?

### 🔴 **To Add/Edit Church Data**
→ **File**: `constants/church-data.ts`
```typescript
// Add your updates
export const CHURCH_UPDATES: Update[] = [
  { id: '1', title: 'Your Title', ... },
]

// Add your events  
export const CHURCH_EVENTS: Event[] = [
  { id: '1', title: 'Your Event', ... },
]

// Add your live streams
export const LIVE_STREAMS: LiveStream[] = [
  { id: '1', title: 'Your Stream', ... },
]
```

### 🎨 **To Change Colors & Branding**
→ **File**: `constants/theme.ts`
```typescript
const tintColorLight = '#1E5A96';  // Change primary color
const tintColorDark = '#fff';      // Dark mode color
```

### 📱 **To Change App Name**
→ **File**: `app.json`
```json
{
  "name": "Your Church Name",
  "slug": "your-church"
}
```

### 📞 **To Update Contact Info**
→ **File**: `app/(tabs)/updates.tsx` (Line ~110)
```typescript
<ThemedText>(555) 123-4567</ThemedText>  // Phone
<ThemedText>info@church.org</ThemedText>   // Email
<ThemedText>123 Street, City</ThemedText>  // Address
```

---

## 📱 Screen Files (What Users See)

| Screen | File | Purpose |
|--------|------|---------|
| 🏠 Home | `app/(tabs)/index.tsx` | Dashboard with featured content |
| 📺 Live | `app/(tabs)/live-stream.tsx` | Watch services live |
| 📅 Events | `app/(tabs)/events.tsx` | Browse upcoming events |
| 📢 Updates | `app/(tabs)/updates.tsx` | Read announcements |

---

## 🧩 Component Files (Building Blocks)

| Component | File | Used On |
|-----------|------|---------|
| Update Card | `components/update-card.tsx` | Home, Updates screens |
| Event Card | `components/event-card.tsx` | Home, Events screens |
| Stream Card | `components/live-stream-card.tsx` | Home, Live screens |
| Text | `components/themed-text.tsx` | All screens |
| Container | `components/themed-view.tsx` | All screens |

---

## 📚 Documentation Files

| Document | Purpose | Read Time |
|----------|---------|-----------|
| `QUICK_REFERENCE.md` | Quick answers & commands | 5 min |
| `SETUP_GUIDE.md` | Complete customization guide | 30 min |
| `CHURCH_APP_README.md` | Feature details & examples | 20 min |
| `PROJECT_OVERVIEW.md` | Project summary & stats | 10 min |
| `IMPLEMENTATION_SUMMARY.md` | What was built & why | 15 min |

---

## 🗂️ Full Directory Structure

```
bleu/
│
├── 📱 APP SCREENS
│   ├── app/
│   │   ├── _layout.tsx              ← Root configuration
│   │   ├── modal.tsx                ← Modal template
│   │   └── (tabs)/
│   │       ├── _layout.tsx          ← Tab navigation [EDIT: add/remove tabs]
│   │       ├── index.tsx            ← Home screen [READ: how home works]
│   │       ├── live-stream.tsx      ← Live streaming [READ: stream features]
│   │       ├── events.tsx           ← Events listing [READ: event features]
│   │       └── updates.tsx          ← Updates page [EDIT: contact info]
│
├── 🧩 COMPONENTS (Reusable UI)
│   ├── components/
│   │   ├── update-card.tsx          ← Display updates [USED ON: Home, Updates]
│   │   ├── live-stream-card.tsx     ← Display streams [USED ON: Home, Live]
│   │   ├── event-card.tsx           ← Display events [USED ON: Home, Events]
│   │   ├── themed-text.tsx          ← Styled text
│   │   ├── themed-view.tsx          ← Styled container
│   │   ├── haptic-tab.tsx           ← Tab feedback
│   │   ├── external-link.tsx        ← Link component
│   │   ├── hello-wave.tsx           ← Wave animation
│   │   ├── parallax-scroll-view.tsx ← Parallax effect
│   │   └── ui/
│   │       ├── icon-symbol.tsx      ← Icon component
│   │       ├── icon-symbol.ios.tsx  ← iOS icons
│   │       └── collapsible.tsx      ← Collapsible component
│
├── 📦 DATA & SERVICES
│   ├── constants/
│   │   ├── church-data.ts           ← [EDIT: ALL YOUR DATA] ⭐⭐⭐
│   │   └── theme.ts                 ← [EDIT: COLORS] ⭐
│   │
│   ├── services/
│   │   └── api.ts                   ← Backend integration examples
│   │
│   └── hooks/
│       ├── use-color-scheme.ts      ← Theme detection
│       ├── use-color-scheme.web.ts  ← Web theme
│       └── use-theme-color.ts       ← Color hook
│
├── 🖼️ ASSETS
│   └── assets/images/               ← App icons & images
│
├── ⚙️ CONFIG FILES
│   ├── app.json                     ← [EDIT: APP NAME] ⭐
│   ├── package.json                 ← Dependencies (installed)
│   ├── tsconfig.json                ← TypeScript config
│   └── eslint.config.js             ← Linting rules
│
├── 📖 DOCUMENTATION ⭐ START HERE
│   ├── QUICK_REFERENCE.md           ← Quick lookup (5 min read)
│   ├── SETUP_GUIDE.md               ← Customization guide (30 min read)
│   ├── CHURCH_APP_README.md         ← Feature documentation
│   ├── PROJECT_OVERVIEW.md          ← Project summary
│   ├── IMPLEMENTATION_SUMMARY.md    ← What was built
│   └── FILE_GUIDE.md                ← This file
│
└── 📦 NODE MODULES (auto-generated)
    └── node_modules/                ← Do not edit
```

---

## 🎯 Edit Priority (Most Important First)

### Priority 1: ⭐⭐⭐ **MUST EDIT**
```
1. constants/church-data.ts    → Add your updates, events, streams
2. app.json                    → Change app name
3. constants/theme.ts          → Change colors
4. app/(tabs)/updates.tsx      → Update contact info
```

### Priority 2: ⭐⭐ **SHOULD EDIT**
```
5. app/(tabs)/_layout.tsx      → Add/remove tabs if needed
6. components/*                → Customize styling if needed
```

### Priority 3: ⭐ **OPTIONAL**
```
7. services/api.ts             → Connect to backend
8. Other files                 → Advanced customization
```

---

## 🚀 Quick Edit Examples

### Example 1: Add a New Update
**File**: `constants/church-data.ts`
```typescript
export const CHURCH_UPDATES: Update[] = [
  // ... existing updates ...
  {
    id: 'new-6',
    title: 'Bible Study Tonight',
    description: 'Join us for a study of John chapter 3',
    date: '2025-02-25',
    category: 'news'
  }
];
```

### Example 2: Change Primary Color
**File**: `constants/theme.ts`
```typescript
// Change this line:
const tintColorLight = '#1E5A96';  // Blue

// To your color:
const tintColorLight = '#FF6B00';  // Orange
```

### Example 3: Change App Name
**File**: `app.json`
```json
{
  "name": "Hope Church App"  // Changed from "Blessed Church"
}
```

### Example 4: Update Phone Number
**File**: `app/(tabs)/updates.tsx` (Around line 110)
```typescript
<ThemedText style={styles.contactDetail}>
  (999) 888-7777  // Your number
</ThemedText>
```

---

## 🔍 Find What You Need

### I want to...
**...change the app name**
→ Go to `app.json`, edit `"name"` field

**...add a new update**
→ Go to `constants/church-data.ts`, add to `CHURCH_UPDATES` array

**...change the color**
→ Go to `constants/theme.ts`, edit `tintColorLight`

**...add a new event**
→ Go to `constants/church-data.ts`, add to `CHURCH_EVENTS` array

**...add a live stream**
→ Go to `constants/church-data.ts`, add to `LIVE_STREAMS` array

**...update contact info**
→ Go to `app/(tabs)/updates.tsx`, find Contact Section

**...add a new tab**
→ Go to `app/(tabs)/_layout.tsx`, add new `<Tabs.Screen>`

**...customize styling**
→ Go to respective `.tsx` file, edit `StyleSheet.create()`

**...connect to backend**
→ See `services/api.ts` for examples

---

## 📊 File Dependencies

```
Home Screen (index.tsx)
├── Uses: UpdateCard, EventCard, LiveStreamCard
├── Reads: church-data.ts (updates, events, streams)
└── Themes: theme.ts

Events Screen (events.tsx)
├── Uses: EventCard
├── Reads: church-data.ts (events)
└── Themes: theme.ts

Live Stream Screen (live-stream.tsx)
├── Uses: LiveStreamCard
├── Reads: church-data.ts (streams)
└── Themes: theme.ts

Updates Screen (updates.tsx)
├── Uses: UpdateCard
├── Reads: church-data.ts (updates)
└── Themes: theme.ts

Cards (Components)
├── All read: theme.ts
├── All read: church-data.ts (for categories)
└── All use: themed-text.tsx, themed-view.tsx
```

---

## �� Backup Recommendation

Before editing, backup these files:
```bash
cp constants/church-data.ts constants/church-data.ts.backup
cp constants/theme.ts constants/theme.ts.backup
cp app.json app.json.backup
```

Restore with:
```bash
cp constants/church-data.ts.backup constants/church-data.ts
```

---

## ✅ After Editing Checklist

After each edit:
- [ ] Save the file
- [ ] Check for errors in terminal
- [ ] Run `npm run lint` 
- [ ] Hot reload the app (press `r` in terminal)
- [ ] Test the change on app

---

## 🎓 Learning Path

1. **Start Here**: Read `QUICK_REFERENCE.md` (5 min)
2. **Then**: Read `SETUP_GUIDE.md` (30 min)
3. **Edit**: `constants/church-data.ts` (add your data)
4. **Customize**: `constants/theme.ts` (change colors)
5. **Run**: `npm start` (test the app)
6. **Deploy**: Follow build instructions

---

## 📞 If You Get Stuck

1. Check `QUICK_REFERENCE.md` - Has troubleshooting
2. Check `SETUP_GUIDE.md` - Has detailed examples
3. Check the file comments - Code has helpful comments
4. Search for similar code in existing files
5. Check Expo docs: https://docs.expo.dev/

---

**Pro Tip**: Always back up before making big changes!

**Ready to customize?** Start with `QUICK_REFERENCE.md` → `constants/church-data.ts`

Built with ❤️ for your church 🙏
