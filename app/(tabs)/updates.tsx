import { useAppTheme } from "@/hooks/use-app-theme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* ── Mock sermon & Bible data ──────────────────── */

interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  duration: string;
  type: "video" | "audio";
  series?: string;
}

const SERMONS: Sermon[] = [
  {
    id: "1",
    title: "Walking in Purpose",
    speaker: "Pastor David",
    date: "Feb 25, 2026",
    duration: "45 min",
    type: "video",
    series: "The Purpose Series",
  },
  {
    id: "2",
    title: "The Power of Prayer",
    speaker: "Pastor Grace",
    date: "Feb 18, 2026",
    duration: "38 min",
    type: "video",
    series: "Prayer Life",
  },
  {
    id: "3",
    title: "Faith Over Fear",
    speaker: "Pastor David",
    date: "Feb 11, 2026",
    duration: "42 min",
    type: "audio",
  },
  {
    id: "4",
    title: "Hymn Night Special",
    speaker: "Worship Team",
    date: "Feb 4, 2026",
    duration: "1 hr 20 min",
    type: "audio",
  },
  {
    id: "5",
    title: "Grace Abounding",
    speaker: "Pastor David",
    date: "Jan 28, 2026",
    duration: "50 min",
    type: "video",
    series: "Grace Series",
  },
];

interface BibleBook {
  id: string;
  name: string;
  chapters: number;
  testament: "old" | "new";
}

const BIBLE_BOOKS: BibleBook[] = [
  { id: "gen", name: "Genesis", chapters: 50, testament: "old" },
  { id: "exo", name: "Exodus", chapters: 40, testament: "old" },
  { id: "lev", name: "Leviticus", chapters: 27, testament: "old" },
  { id: "psa", name: "Psalms", chapters: 150, testament: "old" },
  { id: "pro", name: "Proverbs", chapters: 31, testament: "old" },
  { id: "isa", name: "Isaiah", chapters: 66, testament: "old" },
  { id: "mat", name: "Matthew", chapters: 28, testament: "new" },
  { id: "mrk", name: "Mark", chapters: 16, testament: "new" },
  { id: "luk", name: "Luke", chapters: 24, testament: "new" },
  { id: "jhn", name: "John", chapters: 21, testament: "new" },
  { id: "act", name: "Acts", chapters: 28, testament: "new" },
  { id: "rom", name: "Romans", chapters: 16, testament: "new" },
  { id: "rev", name: "Revelation", chapters: 22, testament: "new" },
];

type Tab = "sermons" | "bible";
type SermonFilter = "all" | "video" | "audio";
type BibleFilter = "all" | "old" | "new";

export default function MediaScreen() {
  const t = useAppTheme();
  const [activeTab, setActiveTab] = useState<Tab>("sermons");
  const [sermonFilter, setSermonFilter] = useState<SermonFilter>("all");
  const [bibleFilter, setBibleFilter] = useState<BibleFilter>("all");

  const filteredSermons =
    sermonFilter === "all"
      ? SERMONS
      : SERMONS.filter((s) => s.type === sermonFilter);

  const filteredBooks =
    bibleFilter === "all"
      ? BIBLE_BOOKS
      : BIBLE_BOOKS.filter((b) => b.testament === bibleFilter);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: t.background }}
      edges={["top"]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerSection}>
          <Text style={[styles.headerTitle, { color: t.text }]}>Media</Text>
          <Text style={[styles.headerSubtitle, { color: t.textSecondary }]}>
            Sermons, worship &amp; the Word
          </Text>
        </View>

        {/* Tab Switcher */}
        <View style={styles.tabSwitcher}>
          <TouchableOpacity
            onPress={() => setActiveTab("sermons")}
            style={[
              styles.tabButton,
              {
                backgroundColor: activeTab === "sermons" ? t.tint : t.cardBg,
                borderColor: activeTab === "sermons" ? t.tint : t.border,
              },
            ]}
          >
            <Ionicons
              name="musical-notes"
              size={18}
              color={activeTab === "sermons" ? "#FFF" : t.text}
            />
            <Text
              style={[
                styles.tabButtonText,
                { color: activeTab === "sermons" ? "#FFF" : t.text },
              ]}
            >
              Sermons
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("bible")}
            style={[
              styles.tabButton,
              {
                backgroundColor: activeTab === "bible" ? t.tint : t.cardBg,
                borderColor: activeTab === "bible" ? t.tint : t.border,
              },
            ]}
          >
            <MaterialCommunityIcons
              name="book-open-variant"
              size={18}
              color={activeTab === "bible" ? "#FFF" : t.text}
            />
            <Text
              style={[
                styles.tabButtonText,
                { color: activeTab === "bible" ? "#FFF" : t.text },
              ]}
            >
              Bible
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === "sermons" ? (
          <>
            {/* Sermon Filters */}
            <View style={styles.filterRow}>
              {(["all", "video", "audio"] as SermonFilter[]).map((f) => (
                <TouchableOpacity
                  key={f}
                  onPress={() => setSermonFilter(f)}
                  style={[
                    styles.filterPill,
                    {
                      backgroundColor: sermonFilter === f ? t.tint : t.filterBg,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.filterPillText,
                      {
                        color: sermonFilter === f ? "#FFF" : t.text,
                      },
                    ]}
                  >
                    {f === "all" ? "All" : f === "video" ? "Video" : "Audio"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Sermon List */}
            <View style={styles.listContainer}>
              {filteredSermons.map((sermon) => (
                <TouchableOpacity
                  key={sermon.id}
                  activeOpacity={0.8}
                  style={[
                    styles.sermonCard,
                    { backgroundColor: t.cardBg, borderColor: t.border },
                  ]}
                >
                  <View
                    style={[
                      styles.sermonTypeIcon,
                      {
                        backgroundColor:
                          sermon.type === "video"
                            ? t.isDark
                              ? "rgba(245,166,35,0.12)"
                              : "#FFF1E0"
                            : t.isDark
                              ? "rgba(107,76,230,0.12)"
                              : "#EDE9FE",
                      },
                    ]}
                  >
                    <Ionicons
                      name={sermon.type === "video" ? "videocam" : "headset"}
                      size={22}
                      color={
                        sermon.type === "video"
                          ? t.tint
                          : (t as any).bentoAccent
                      }
                    />
                  </View>
                  <View style={styles.sermonInfo}>
                    <Text
                      style={[styles.sermonTitle, { color: t.text }]}
                      numberOfLines={1}
                    >
                      {sermon.title}
                    </Text>
                    <Text
                      style={[styles.sermonMeta, { color: t.textSecondary }]}
                    >
                      {sermon.speaker} · {sermon.date}
                    </Text>
                    {sermon.series && (
                      <Text style={[styles.sermonSeries, { color: t.tint }]}>
                        {sermon.series}
                      </Text>
                    )}
                  </View>
                  <View style={styles.sermonRight}>
                    <Text
                      style={[
                        styles.sermonDuration,
                        { color: t.textSecondary },
                      ]}
                    >
                      {sermon.duration}
                    </Text>
                    <Ionicons name="play-circle" size={28} color={t.tint} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <>
            {/* Bible Filters */}
            <View style={styles.filterRow}>
              {(["all", "old", "new"] as BibleFilter[]).map((f) => (
                <TouchableOpacity
                  key={f}
                  onPress={() => setBibleFilter(f)}
                  style={[
                    styles.filterPill,
                    {
                      backgroundColor: bibleFilter === f ? t.tint : t.filterBg,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.filterPillText,
                      {
                        color: bibleFilter === f ? "#FFF" : t.text,
                      },
                    ]}
                  >
                    {f === "all"
                      ? "All Books"
                      : f === "old"
                        ? "Old Testament"
                        : "New Testament"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Bible Books Grid */}
            <View style={styles.bibleGrid}>
              {filteredBooks.map((book) => (
                <TouchableOpacity
                  key={book.id}
                  activeOpacity={0.8}
                  style={[
                    styles.bibleCard,
                    { backgroundColor: t.cardBg, borderColor: t.border },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="book-open-variant"
                    size={24}
                    color={
                      book.testament === "new" ? t.tint : (t as any).bentoAccent
                    }
                  />
                  <Text
                    style={[styles.bibleBookName, { color: t.text }]}
                    numberOfLines={1}
                  >
                    {book.name}
                  </Text>
                  <Text
                    style={[styles.bibleChapters, { color: t.textSecondary }]}
                  >
                    {book.chapters} chapters
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {/* Bottom spacer for floating tab bar */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
  },

  /* Tab switcher */
  tabSwitcher: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 12,
  },
  tabButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
  tabButtonText: {
    fontSize: 15,
    fontWeight: "700",
  },

  /* Filters */
  filterRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  filterPillText: {
    fontSize: 13,
    fontWeight: "600",
  },

  /* Sermon list */
  listContainer: {
    paddingHorizontal: 16,
    gap: 10,
  },
  sermonCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  sermonTypeIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  sermonInfo: {
    flex: 1,
  },
  sermonTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  sermonMeta: {
    fontSize: 12,
    marginTop: 2,
  },
  sermonSeries: {
    fontSize: 11,
    fontWeight: "600",
    marginTop: 3,
  },
  sermonRight: {
    alignItems: "center",
    gap: 4,
  },
  sermonDuration: {
    fontSize: 11,
    fontWeight: "500",
  },

  /* Bible grid */
  bibleGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    gap: 10,
  },
  bibleCard: {
    width: "47%",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 8,
  },
  bibleBookName: {
    fontSize: 15,
    fontWeight: "700",
  },
  bibleChapters: {
    fontSize: 12,
  },
});
