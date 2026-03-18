// Church App Mock Data

export interface Update {
  id: string;
  title: string;
  description: string;
  date: string;
  image?: string;
  category: "announcement" | "news" | "prayer" | "ministry";
}

export interface LiveStream {
  id: string;
  title: string;
  description: string;
  startTime: string;
  duration: number;
  isLive: boolean;
  thumbnail?: string;
  speaker?: string;
  viewers?: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  image?: string;
  category: "worship" | "study" | "fellowship" | "outreach" | "prayer";
  capacity?: number;
  registered?: number;
}

export const CHURCH_UPDATES: Update[] = [
  {
    id: "1",
    title: "Monday Bible Study",
    description:
      "Join us every Monday as we dive deep into the word of God.",
    date: "2025-02-20.",
    category: "announcement",
  },
  {
    id: "2",
    title: "Sunday Service Recording Available",
    description:
      'The recording of last Sunday\'s service "Faith in Action" is now available in our app. You can watch it anytime at your convenience.',
    date: "2025-02-20",
    category: "news",
  },
  {
    id: "3",
    title: "Prayer Request: Mission Trip",
    description:
      "Please join us in praying for our mission team traveling to East Africa next month. Pray for safety, health, and open hearts to receive the Gospel.",
    date: "2025-02-20",
    category: "prayer",
  },
  {
    id: "4",
    title: "Join Our Praise Team",
    description:
      "Are you passionate about worship? We are recruiting members for our praise and worship team. No audition needed! Contact our music director for more details.",
    date: "2025-02-18",
    category: "ministry",
  },
  {
    id: "5",
    title: "Community Outreach Success",
    description:
      "Last Saturday, our church community served 200 families in the local shelter. Thank you to everyone who participated in making a difference!",
    date: "2025-02-15",
    category: "news",
  },
];

export const LIVE_STREAMS: LiveStream[] = [
  {
    id: "1",
    title: "Sunday Morning Worship",
    description: 'Join us for worship and the message "Living with Purpose"',
    startTime: "2025-02-23T10:00:00",
    duration: 90,
    isLive: true,
    speaker: "Pastor John",
    viewers: 342,
  },
  {
    id: "2",
    title: "Midweek Prayer Meeting",
    description: "Community prayer and Bible study session",
    startTime: "2025-02-26T19:00:00",
    duration: 60,
    isLive: false,
    speaker: "Pastor Sarah",
  },
  {
    id: "3",
    title: "Youth Group Meeting",
    description: "Games, food, and discipleship for teens",
    startTime: "2025-02-26T18:30:00",
    duration: 120,
    isLive: false,
    speaker: "Youth Leader Mike",
  },
  {
    id: "4",
    title: "Weekend Service Replay",
    description: "Catch up on last week's sermon",
    startTime: "2025-02-16T10:00:00",
    duration: 90,
    isLive: false,
    speaker: "Pastor John",
  },
];

export const CHURCH_EVENTS: Event[] = [
  {
    id: "1",
    title: "Sunday  Worship",
    description:
      "Join us for our  worship services with praise, worship, and a powerful message from God's Word.",
    date: "Every Sunday",
    startTime: "7:00 AM",
    endTime: "2:00 PM",
    location: "Omega Cathedral",
    category: "worship",
    capacity: 500,
    registered: 287,
  },
  {
    id: "2",
    title: "Monday Bible Study",
    description:
      "Deep dive into Scripture as we study the Bible. Bring your Bible and join us for discussion and fellowship.",
    date: "Every Monday",
    startTime: "6:00 PM",
    endTime: "9:00 PM",
    location: "Omega Cathedral",
    category: "study",
    capacity: 100,
    registered: 56,
  },
  {
    id: "3",
    title: "Young Adults Fellowship",
    description:
      "Social gathering for young adults (18-30) with dinner, games, and networking. Great way to build community!",
    date: "2025-02-28",
    startTime: "6:00 PM",
    endTime: "9:00 PM",
    location: "Community Center",
    category: "fellowship",
    capacity: 75,
    registered: 42,
  },
  {
    id: "4",
    title: "Prayer Breakfast",
    description:
      "Join us for a light breakfast and time of corporate prayer. Intercede for our church, community, and nation.",
    date: "2025-02-25",
    startTime: "7:00 AM",
    endTime: "8:30 AM",
    location: "Dining Area",
    category: "prayer",
    capacity: 50,
    registered: 28,
  },
  {
    id: "5",
    title: "Community Outreach Day",
    description:
      "Serve our local community by helping at the food bank. We need volunteers of all ages. Lunch provided!",
    date: "2025-03-01",
    startTime: "9:00 AM",
    endTime: "12:30 PM",
    location: "City Food Bank",
    category: "outreach",
    capacity: 40,
    registered: 22,
  },
  {
    id: "6",
    title: "Children's Ministry Program",
    description:
      "Fun and engaging Bible lessons, crafts, and games for children ages 4-12. Parents can join Sunday School too!",
    date: "2025-02-23",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    location: "Children's Wing",
    category: "worship",
    capacity: 120,
    registered: 87,
  },
];

export const getCategoryColor = (category: string): string => {
  const colors: { [key: string]: string } = {
    announcement: "#E84797", // Bold Pink
    news: "#4E7CB2", // Muted Blue
    prayer: "#94C2DA", // Pastel Blue
    ministry: "#203F9A", // Bold Blue
    worship: "#E7A0CC", // Pastel Pink
    study: "#4E7CB2", // Muted Blue
    fellowship: "#E7A0CC", // Pastel Pink
    outreach: "#94C2DA", // Pastel Blue
  };
  return colors[category] || "#94C2DA";
};

export const getCategoryIcon = (category: string): string => {
  const icons: { [key: string]: string } = {
    announcement: "megaphone.fill",
    news: "newspaper.fill",
    prayer: "hands.sparkles",
    ministry: "person.2.fill",
    worship: "music.note",
    study: "book.fill",
    fellowship: "person.3.fill",
    outreach: "heart.fill",
  };
  return icons[category] || "star.fill";
};
