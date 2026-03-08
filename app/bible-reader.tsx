import {
    BIBLE_VERSIONS,
    BibleVersionId,
    getAvailableChapters,
    getBook,
    getChapter,
    isVersionComplete,
} from "@/constants/bible";
import { Fonts } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BibleReaderScreen() {
  const router = useRouter();
  const t = useAppTheme();
  const params = useLocalSearchParams<{
    bookId: string;
    chapter: string;
    version: string;
  }>();

  const bookId = params.bookId ?? "gen";
  const [chapter, setChapter] = useState(Number(params.chapter) || 1);
  const [version, setVersion] = useState<BibleVersionId>(
    (params.version as BibleVersionId) ?? "kjv",
  );

  const book = getBook(bookId);
  const totalChapters = book?.chapters ?? 1;
  const verses = getChapter(version, bookId, chapter);
  const availableChapters = getAvailableChapters(version, bookId);

  // Reset chapter to 1 when version changes if current chapter unavailable
  useEffect(() => {
    if (verses === null && availableChapters.length > 0) {
      setChapter(availableChapters[0]);
    }
  }, [version]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: t.background }]}
      edges={["top"]}
    >
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: t.border }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[styles.backButton, { backgroundColor: t.cardBg }]}
        >
          <Ionicons name="chevron-back" size={22} color={t.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.bookTitle, { color: t.text }]}>
            {book?.name ?? "Book"}
          </Text>
          <Text style={[styles.chapterLabel, { color: t.textSecondary }]}>
            Chapter {chapter}
          </Text>
        </View>
        <View style={{ width: 38 }} />
      </View>

      {/* Version Selector */}
      <View style={styles.versionRow}>
        {BIBLE_VERSIONS.map((v) => (
          <TouchableOpacity
            key={v.id}
            onPress={() => setVersion(v.id)}
            style={[
              styles.versionPill,
              {
                backgroundColor: version === v.id ? t.tint : t.cardBg,
                borderColor: version === v.id ? t.tint : t.border,
              },
            ]}
          >
            <Text
              style={[
                styles.versionPillText,
                { color: version === v.id ? "#FFF" : t.text },
              ]}
            >
              {v.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.chapterSelectorContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chapterSelectorScroll}
        >
          {Array.from({ length: totalChapters }, (_, i) => i + 1).map((ch) => {
            const versionComplete = isVersionComplete(version);
            const isAvailable =
              versionComplete || availableChapters.includes(ch);
            const isActive = ch === chapter;
            return (
              <TouchableOpacity
                key={ch}
                onPress={() => isAvailable && setChapter(ch)}
                disabled={!isAvailable}
                style={[
                  styles.chapterChip,
                  {
                    backgroundColor: isActive
                      ? t.tint
                      : isAvailable
                        ? t.cardBg
                        : "transparent",
                    borderColor: isActive
                      ? t.tint
                      : isAvailable
                        ? t.border
                        : t.border + "40",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.chapterChipText,
                    {
                      color: isActive
                        ? "#FFF"
                        : isAvailable
                          ? t.text
                          : t.textSecondary + "60",
                    },
                  ]}
                >
                  {ch}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Verse Content */}
      <ScrollView
        style={styles.verseScroll}
        contentContainerStyle={styles.verseContent}
        showsVerticalScrollIndicator={false}
      >
        {verses && verses.length > 0 ? (
          verses.map((v) => (
            <View key={v.verse} style={styles.verseLine}>
              <Text style={[styles.verseNumber, { color: t.tint }]}>
                {v.verse}
              </Text>
              <Text style={[styles.verseText, { color: t.text }]}>
                {v.text}
              </Text>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons
              name="book-outline"
              size={48}
              color={t.textSecondary + "60"}
            />
            <Text style={[styles.emptyTitle, { color: t.text }]}>
              Not Available in{" "}
              {BIBLE_VERSIONS.find((v) => v.id === version)?.label}
            </Text>
            <Text style={[styles.emptyDesc, { color: t.textSecondary }]}>
              This chapter is only available as a sample in{" "}
              {BIBLE_VERSIONS.find((v) => v.id === version)?.label}. Switch to
              KJV for the complete Bible with all 1,189 chapters.
            </Text>
            <TouchableOpacity
              onPress={() => setVersion("kjv")}
              style={[styles.switchKjvButton, { backgroundColor: t.tint }]}
            >
              <Ionicons name="swap-horizontal" size={16} color="#FFF" />
              <Text style={styles.switchKjvText}>Switch to KJV</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View
        style={[
          styles.bottomNav,
          { backgroundColor: t.background, borderTopColor: t.border },
        ]}
      >
        <TouchableOpacity
          onPress={() => setChapter(Math.max(1, chapter - 1))}
          disabled={chapter <= 1}
          style={[
            styles.navButton,
            {
              backgroundColor: t.cardBg,
              opacity: chapter <= 1 ? 0.4 : 1,
            },
          ]}
        >
          <Ionicons name="chevron-back" size={18} color={t.text} />
          <Text style={[styles.navButtonText, { color: t.text }]}>
            Previous
          </Text>
        </TouchableOpacity>

        <Text style={[styles.navChapter, { color: t.textSecondary }]}>
          {chapter} / {totalChapters}
        </Text>

        <TouchableOpacity
          onPress={() => setChapter(Math.min(totalChapters, chapter + 1))}
          disabled={chapter >= totalChapters}
          style={[
            styles.navButton,
            {
              backgroundColor: t.cardBg,
              opacity: chapter >= totalChapters ? 0.4 : 1,
            },
          ]}
        >
          <Text style={[styles.navButtonText, { color: t.text }]}>Next</Text>
          <Ionicons name="chevron-forward" size={18} color={t.text} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  bookTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
  },
  chapterLabel: {
    fontSize: 13,
    fontFamily: Fonts.medium,
    marginTop: 2,
  },
  versionRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  versionPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  versionPillText: {
    fontSize: 13,
    fontFamily: Fonts.bold,
  },
  chapterSelectorContainer: {
    paddingBottom: 8,
  },
  chapterSelectorScroll: {
    paddingHorizontal: 16,
    gap: 6,
  },
  chapterChip: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  chapterChipText: {
    fontSize: 13,
    fontFamily: Fonts.semiBold,
  },
  verseScroll: {
    flex: 1,
  },
  verseContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  verseLine: {
    flexDirection: "row",
    marginBottom: 12,
    gap: 8,
  },
  verseNumber: {
    fontSize: 11,
    fontFamily: Fonts.bold,
    marginTop: 4,
    minWidth: 20,
  },
  verseText: {
    flex: 1,
    fontSize: 17,
    fontFamily: Fonts.regular,
    lineHeight: 28,
  },
  emptyState: {
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 32,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    marginTop: 8,
  },
  emptyDesc: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    textAlign: "center",
    lineHeight: 22,
  },
  emptyHint: {
    fontSize: 13,
    fontFamily: Fonts.semiBold,
    marginTop: 8,
  },
  switchKjvButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 12,
  },
  switchKjvText: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: "#FFF",
  },
  bottomNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  navButtonText: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
  },
  navChapter: {
    fontSize: 13,
    fontFamily: Fonts.medium,
  },
});
