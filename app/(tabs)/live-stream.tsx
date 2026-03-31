import { BottomFade } from "@/components/bottom-fade";
import { Fonts } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import {
    fetchChannelInfo,
    fetchLiveStream,
    fetchRecentVideos,
    formatViews,
    getSubscribeUrl,
    isYouTubeConfigured,
    timeAgo,
    VideoCategory,
    VideoType,
    YouTubeChannelInfo,
    YouTubeVideo,
} from "@/services/youtube-api";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    Image,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const PLAYER_HEIGHT = Math.round(SCREEN_WIDTH * (9 / 16));
const CARD_WIDTH = SCREEN_WIDTH - 32;
const CARD_THUMB_HEIGHT = Math.round(CARD_WIDTH * (9 / 16));
const SHORT_CARD_W = (SCREEN_WIDTH - 48) / 2;
const SHORT_CARD_H = Math.round(SHORT_CARD_W * (16 / 9));

/* ── Filter chip definitions ── */
type TypeFilter = "all" | VideoType;
type CategoryFilter = "all" | VideoCategory;

const TYPE_CHIPS: { key: TypeFilter; label: string; icon: string }[] = [
  { key: "all", label: "All", icon: "apps" },
  { key: "video", label: "Videos", icon: "videocam" },
  { key: "short", label: "Shorts", icon: "flash" },
  { key: "live", label: "Live", icon: "radio" },
];

const CATEGORY_CHIPS: { key: CategoryFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "conference", label: "Conference" },
  { key: "sunday", label: "Sunday" },
  { key: "wednesday", label: "Wednesday" },
  { key: "worship", label: "Worship" },
  { key: "other", label: "Other" },
];

export default function LiveStreamScreen() {
  const t = useAppTheme();

  const [channelInfo, setChannelInfo] = useState<YouTubeChannelInfo | null>(
    null,
  );
  const [ytVideos, setYtVideos] = useState<YouTubeVideo[]>([]);
  const [ytLive, setYtLive] = useState<YouTubeVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [playerFailed, setPlayerFailed] = useState(false);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [catFilter, setCatFilter] = useState<CategoryFilter>("all");
  const ytConfigured = isYouTubeConfigured();
  const webViewRef = useRef<WebView>(null);

  const loadYouTube = useCallback(
    async (opts?: { forceRefresh?: boolean }) => {
      if (!ytConfigured) {
        setLoading(false);
        return;
      }
      try {
        const [videos, live, channel] = await Promise.all([
          fetchRecentVideos(50, { forceRefresh: opts?.forceRefresh }),
          fetchLiveStream({ forceRefresh: opts?.forceRefresh }),
          fetchChannelInfo(),
        ]);
        setYtVideos(videos);
        setYtLive(live);
        setChannelInfo(channel);
        if (live) setActiveVideoId(live.id);
      } catch {
        /* silently fail */
      } finally {
        setLoading(false);
      }
    },
    [ytConfigured],
  );

  useEffect(() => {
    loadYouTube();
  }, [loadYouTube]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadYouTube({ forceRefresh: true });
    setRefreshing(false);
  };

  const playVideo = (videoId: string) => {
    setPlayerFailed(false);
    setActiveVideoId(videoId);
  };

  const activeVideo =
    ytLive?.id === activeVideoId
      ? ytLive
      : (ytVideos.find((v) => v.id === activeVideoId) ?? null);

  /* Filtered videos */
  const filteredVideos = useMemo(() => {
    return ytVideos.filter((v) => {
      if (typeFilter !== "all" && v.videoType !== typeFilter) return false;
      if (catFilter !== "all" && v.category !== catFilter) return false;
      return true;
    });
  }, [ytVideos, typeFilter, catFilter]);

  /* Available categories (only show chips that have content) */
  const availableCategories = useMemo(() => {
    const cats = new Set(ytVideos.map((v) => v.category));
    return CATEGORY_CHIPS.filter(
      (c) => c.key === "all" || cats.has(c.key as VideoCategory),
    );
  }, [ytVideos]);

  /* YouTube watch URL for the WebView player — loads the real YouTube mobile player */
  const getPlayerUrl = (videoId: string) =>
    `https://www.youtube.com/embed/${videoId}?playsinline=1&autoplay=1&rel=0&modestbranding=1&origin=https%3A%2F%2Fwww.youtube.com`;

  const openVideoExternally = useCallback((videoId: string) => {
    // Prefer the YouTube app; fall back to browser.
    const appUrl = `vnd.youtube://watch?v=${videoId}`;
    const webUrl = `https://www.youtube.com/watch?v=${videoId}`;

    Linking.canOpenURL(appUrl)
      .then((can) => Linking.openURL(can ? appUrl : webUrl))
      .catch(() => Linking.openURL(webUrl));
  }, []);

  const handleSubscribe = () => Linking.openURL(getSubscribeUrl());

  const fmtSubs = (n: string) => {
    const v = parseInt(n, 10);
    if (isNaN(v)) return "0";
    if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
    if (v >= 1_000) return `${(v / 1_000).toFixed(1)}K`;
    return `${v}`;
  };

  const shorts = filteredVideos.filter((v) => v.videoType === "short");
  const nonShorts = filteredVideos.filter((v) => v.videoType !== "short");
  const showShorts = typeFilter === "all" || typeFilter === "short";
  const showNonShorts = typeFilter === "all" || typeFilter !== "short";

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: t.background }}
      edges={["top"]}
    >
      {/* Header */}
      <View style={styles.headerSection}>
        <View style={styles.headerRow}>
          <View>
            <Text style={[styles.headerTitle, { color: t.text }]}>
              CAOIM Live
            </Text>
            <Text style={[styles.headerSubtitle, { color: t.textSecondary }]}>
              Watch services & streams
            </Text>
          </View>
          {ytLive && (
            <View style={styles.liveIndicator}>
              <View style={styles.livePulse} />
              <Text style={styles.liveIndicatorText}>LIVE NOW</Text>
            </View>
          )}
        </View>
      </View>

      {/* Sticky Player (stays on top while list scrolls) */}
      {activeVideoId ? (
        <View
          style={{
            position: "absolute",
            top: 92, // below header section
            left: 16,
            right: 16,
            zIndex: 50,
          }}
        >
          <View
            style={{
              backgroundColor: t.background,
            }}
          >
            <View style={styles.playerContainer}>
              {playerFailed ? (
                <View
                  style={{
                    height: PLAYER_HEIGHT,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 16,
                    backgroundColor: t.cardBg,
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor: t.border,
                  }}
                >
                  <Text
                    style={{
                      color: t.text,
                      fontFamily: Fonts.semiBold,
                      textAlign: "center",
                    }}
                  >
                    This video can’t be played in-app.
                  </Text>
                  <Text
                    style={{
                      color: t.textSecondary,
                      marginTop: 6,
                      textAlign: "center",
                    }}
                  >
                    Tap below to open it in YouTube.
                  </Text>
                  <TouchableOpacity
                    onPress={() => openVideoExternally(activeVideoId)}
                    activeOpacity={0.85}
                    style={{
                      marginTop: 14,
                      paddingVertical: 10,
                      paddingHorizontal: 14,
                      borderRadius: 12,
                      backgroundColor: "#FF0000",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Ionicons name="logo-youtube" size={18} color="#FFF" />
                    <Text style={{ color: "#FFF", fontFamily: Fonts.semiBold }}>
                      Open in YouTube
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <WebView
                  ref={webViewRef}
                  source={{ uri: getPlayerUrl(activeVideoId) }}
                  style={[styles.playerWebView, { height: PLAYER_HEIGHT }]}
                  allowsInlineMediaPlayback
                  mediaPlaybackRequiresUserAction={false}
                  javaScriptEnabled
                  domStorageEnabled
                  allowsFullscreenVideo
                  scrollEnabled={false}
                  userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
                  onError={() => setPlayerFailed(true)}
                  onHttpError={() => setPlayerFailed(true)}
                />
              )}
            </View>

            {activeVideo && (
              <View style={styles.nowPlayingInfo}>
                <View style={styles.nowPlayingRow}>
                  <Text
                    style={[styles.nowPlayingTitle, { color: t.text, flex: 1 }]}
                    numberOfLines={2}
                  >
                    {activeVideo.title}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setActiveVideoId(null)}
                    hitSlop={8}
                  >
                    <Ionicons
                      name="close-circle"
                      size={24}
                      color={t.textSecondary}
                    />
                  </TouchableOpacity>
                </View>
                {!activeVideo.isLive ? (
                  <Text
                    style={[
                      styles.nowPlayingMeta,
                      { color: t.textSecondary, paddingHorizontal: 16 },
                    ]}
                    numberOfLines={1}
                  >
                    {activeVideo.viewCount
                      ? formatViews(activeVideo.viewCount)
                      : ""}
                    {activeVideo.viewCount && activeVideo.publishedAt
                      ? "  ·  "
                      : ""}
                    {activeVideo.publishedAt
                      ? timeAgo(activeVideo.publishedAt)
                      : ""}
                  </Text>
                ) : null}
              </View>
            )}
          </View>
        </View>
      ) : null}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
          paddingTop: activeVideoId ? PLAYER_HEIGHT + 120 : 0,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* ── Channel Header ── */}
        {channelInfo && (
          <View style={styles.channelHeader}>
            <Image
              source={{ uri: channelInfo.thumbnail }}
              style={styles.channelAvatar}
            />
            <View style={styles.channelMeta}>
              <Text
                style={[styles.channelName, { color: t.text }]}
                numberOfLines={1}
              >
                {channelInfo.name}
              </Text>
              <Text style={[styles.channelStats, { color: t.textSecondary }]}>
                {fmtSubs(channelInfo.subscriberCount)} subscribers ·{" "}
                {channelInfo.videoCount} videos
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleSubscribe}
              style={styles.subscribeBtn}
            >
              <Ionicons name="logo-youtube" size={16} color="#FFF" />
              <Text style={styles.subscribeBtnText}>Subscribe</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ── Loading ── */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={t.tint} />
            <Text style={[styles.loadingText, { color: t.textSecondary }]}>
              Loading from YouTube...
            </Text>
          </View>
        )}

        {/* ── Live Stream Card ── */}
        {!loading && ytLive && activeVideoId !== ytLive.id && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionTitleRow}>
              <View style={styles.sectionDot} />
              <Text style={[styles.sectionTitle, { color: t.text }]}>
                Now Live
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => playVideo(ytLive.id)}
              style={[
                styles.videoCard,
                { backgroundColor: t.cardBg, borderColor: t.border },
              ]}
            >
              {ytLive.thumbnail ? (
                <View style={styles.cardThumbWrap}>
                  <Image
                    source={{ uri: ytLive.thumbnail }}
                    style={styles.cardThumbImg}
                    resizeMode="cover"
                  />
                  <View style={styles.playOverlay}>
                    <View
                      style={[
                        styles.playBtn,
                        { backgroundColor: "rgba(232,71,151,0.9)" },
                      ]}
                    >
                      <Ionicons name="play" size={28} color="#FFF" />
                    </View>
                  </View>
                  <View style={styles.liveBadge}>
                    <View style={styles.liveBadgeDot} />
                    <Text style={styles.liveBadgeText}>LIVE</Text>
                  </View>
                </View>
              ) : null}
              <View style={styles.cardBody}>
                <Text
                  style={[styles.cardTitle, { color: t.text }]}
                  numberOfLines={2}
                >
                  {ytLive.title}
                </Text>
                <Text style={[styles.cardMeta, { color: t.tint }]}>
                  Tap to watch live
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* ── Filter Chips: Type ── */}
        {!loading && ytConfigured && ytVideos.length > 0 && (
          <View style={styles.filterSection}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipRow}
            >
              {TYPE_CHIPS.map((chip) => {
                const active = typeFilter === chip.key;
                return (
                  <TouchableOpacity
                    key={chip.key}
                    activeOpacity={0.8}
                    onPress={() => {
                      setTypeFilter(chip.key);
                      setCatFilter("all");
                    }}
                    style={[
                      styles.filterChip,
                      { borderColor: t.border },
                      active && {
                        backgroundColor: t.tint,
                        borderColor: t.tint,
                      },
                    ]}
                  >
                    <Ionicons
                      name={chip.icon as any}
                      size={14}
                      color={active ? "#FFF" : t.textSecondary}
                    />
                    <Text
                      style={[
                        styles.filterChipText,
                        { color: active ? "#FFF" : t.textSecondary },
                      ]}
                    >
                      {chip.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Category sub-chips */}
            {typeFilter !== "short" && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.chipRow}
              >
                {availableCategories.map((chip) => {
                  const active = catFilter === chip.key;
                  return (
                    <TouchableOpacity
                      key={chip.key}
                      activeOpacity={0.8}
                      onPress={() => setCatFilter(chip.key)}
                      style={[
                        styles.catChip,
                        {
                          borderColor: t.border,
                          backgroundColor: active
                            ? "rgba(232,71,151,0.15)"
                            : "transparent",
                        },
                        active && { borderColor: "#E84797" },
                      ]}
                    >
                      <Text
                        style={[
                          styles.catChipText,
                          { color: active ? "#E84797" : t.textSecondary },
                        ]}
                      >
                        {chip.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}
          </View>
        )}

        {/* ── Shorts Grid (2-column) ── */}
        {!loading && showShorts && shorts.length > 0 && (
          <View style={styles.sectionContainer}>
            {typeFilter === "all" && (
              <View style={styles.sectionHeaderRow}>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
                >
                  <Ionicons name="flash" size={18} color="#E84797" />
                  <Text style={[styles.sectionTitle, { color: t.text }]}>
                    Shorts
                  </Text>
                </View>
                <Text style={[styles.videoCount, { color: t.textSecondary }]}>
                  {shorts.length} clips
                </Text>
              </View>
            )}
            <View style={styles.shortsGrid}>
              {shorts.map((video) => {
                const isPlaying = activeVideoId === video.id;
                return (
                  <TouchableOpacity
                    key={video.id}
                    activeOpacity={0.85}
                    onPress={() => playVideo(video.id)}
                    style={[
                      styles.shortCard,
                      { backgroundColor: t.cardBg, borderColor: t.border },
                      isPlaying && { borderColor: t.tint, borderWidth: 2 },
                    ]}
                  >
                    <Image
                      source={{ uri: video.thumbnail }}
                      style={styles.shortThumb}
                      resizeMode="cover"
                    />
                    <View style={styles.shortOverlay}>
                      <Ionicons name="play" size={28} color="#FFF" />
                    </View>
                    {video.duration ? (
                      <View style={styles.shortDuration}>
                        <Text style={styles.durationText}>
                          {video.duration}
                        </Text>
                      </View>
                    ) : null}
                    {isPlaying && (
                      <View style={styles.playingStrip}>
                        <Text style={styles.playingStripText}>PLAYING</Text>
                      </View>
                    )}
                    <View style={styles.shortBody}>
                      <Text
                        style={[styles.shortTitle, { color: t.text }]}
                        numberOfLines={2}
                      >
                        {video.title}
                      </Text>
                      {video.viewCount ? (
                        <Text
                          style={[styles.shortMeta, { color: t.textSecondary }]}
                        >
                          {formatViews(video.viewCount)}
                        </Text>
                      ) : null}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* ── Videos (full-width cards) ── */}
        {!loading && showNonShorts && nonShorts.length > 0 && (
          <View style={styles.sectionContainer}>
            {typeFilter === "all" && (
              <View style={styles.sectionHeaderRow}>
                <Text style={[styles.sectionTitle, { color: t.text }]}>
                  Videos
                </Text>
                <Text style={[styles.videoCount, { color: t.textSecondary }]}>
                  {nonShorts.length} videos
                </Text>
              </View>
            )}
            {typeFilter !== "all" && (
              <View style={styles.sectionHeaderRow}>
                <Text style={[styles.sectionTitle, { color: t.text }]}>
                  {catFilter !== "all"
                    ? (CATEGORY_CHIPS.find((c) => c.key === catFilter)?.label ??
                      "Videos")
                    : typeFilter === "live"
                      ? "Past Live Streams"
                      : "Videos"}
                </Text>
                <Text style={[styles.videoCount, { color: t.textSecondary }]}>
                  {nonShorts.length} videos
                </Text>
              </View>
            )}
            {nonShorts.map((video) => {
              const isPlaying = activeVideoId === video.id;
              return (
                <TouchableOpacity
                  key={video.id}
                  activeOpacity={0.85}
                  onPress={() => playVideo(video.id)}
                  style={[
                    styles.videoCard,
                    { backgroundColor: t.cardBg, borderColor: t.border },
                    isPlaying && { borderColor: t.tint, borderWidth: 2 },
                  ]}
                >
                  <View style={styles.cardThumbWrap}>
                    <Image
                      source={{ uri: video.thumbnail }}
                      style={styles.cardThumbImg}
                      resizeMode="cover"
                    />
                    {video.duration ? (
                      <View style={styles.durationBadge}>
                        <Text style={styles.durationText}>
                          {video.duration}
                        </Text>
                      </View>
                    ) : null}
                    {/* Category pill */}
                    {video.category && video.category !== "other" && (
                      <View style={styles.categoryBadge}>
                        <Text style={styles.categoryBadgeText}>
                          {video.category === "conference"
                            ? "Conference"
                            : video.category === "sunday"
                              ? "Sunday"
                              : video.category === "wednesday"
                                ? "Wednesday"
                                : video.category === "worship"
                                  ? "Worship"
                                  : ""}
                        </Text>
                      </View>
                    )}
                    <View style={styles.playOverlay}>
                      <View
                        style={[
                          styles.playBtn,
                          isPlaying && {
                            backgroundColor: "rgba(232,71,151,1)",
                          },
                        ]}
                      >
                        <Ionicons
                          name={isPlaying ? "musical-notes" : "play"}
                          size={24}
                          color="#FFF"
                        />
                      </View>
                    </View>
                    {isPlaying && (
                      <View style={styles.playingStrip}>
                        <Text style={styles.playingStripText}>NOW PLAYING</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.cardBody}>
                    <Text
                      style={[styles.cardTitle, { color: t.text }]}
                      numberOfLines={2}
                    >
                      {video.title}
                    </Text>
                    <View style={styles.cardMetaRow}>
                      {video.viewCount ? (
                        <View style={styles.metaChip}>
                          <Ionicons
                            name="eye-outline"
                            size={12}
                            color={t.textSecondary}
                          />
                          <Text
                            style={[
                              styles.metaChipText,
                              { color: t.textSecondary },
                            ]}
                          >
                            {formatViews(video.viewCount)}
                          </Text>
                        </View>
                      ) : null}
                      {video.likeCount && parseInt(video.likeCount) > 0 ? (
                        <View style={styles.metaChip}>
                          <Ionicons
                            name="heart-outline"
                            size={12}
                            color={t.textSecondary}
                          />
                          <Text
                            style={[
                              styles.metaChipText,
                              { color: t.textSecondary },
                            ]}
                          >
                            {formatViews(video.likeCount).replace(" views", "")}
                          </Text>
                        </View>
                      ) : null}
                      {video.publishedAt ? (
                        <View style={styles.metaChip}>
                          <Ionicons
                            name="time-outline"
                            size={12}
                            color={t.textSecondary}
                          />
                          <Text
                            style={[
                              styles.metaChipText,
                              { color: t.textSecondary },
                            ]}
                          >
                            {timeAgo(video.publishedAt)}
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* ── Empty state ── */}
        {!loading &&
          ytConfigured &&
          filteredVideos.length === 0 &&
          ytVideos.length > 0 && (
            <View style={styles.emptyState}>
              <Ionicons name="film-outline" size={48} color={t.textSecondary} />
              <Text style={[styles.emptyText, { color: t.textSecondary }]}>
                No videos match this filter
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setTypeFilter("all");
                  setCatFilter("all");
                }}
              >
                <Text style={[styles.emptyReset, { color: t.tint }]}>
                  Clear filters
                </Text>
              </TouchableOpacity>
            </View>
          )}

        {/* ── Info Cards ── */}
        <View style={styles.infoSection}>
          <View
            style={[
              styles.infoCard,
              { backgroundColor: t.cardBgElevated, borderColor: t.border },
            ]}
          >
            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={18} color={t.tint} />
              <Text style={[styles.infoTitle, { color: t.text }]}>
                Service Schedule
              </Text>
            </View>
            <Text style={[styles.infoText, { color: t.textSecondary }]}>
              Sunday Service: 10:00 AM{"\n"}Midweek Prayer: 7:00 PM{"\n"}Youth
              Group: 6:30 PM
            </Text>
          </View>
          <View
            style={[
              styles.infoCard,
              { backgroundColor: t.cardBgElevated, borderColor: t.border },
            ]}
          >
            <View style={styles.infoRow}>
              <Ionicons name="notifications-outline" size={18} color={t.tint} />
              <Text style={[styles.infoTitle, { color: t.text }]}>
                Never Miss a Stream
              </Text>
            </View>
            <Text style={[styles.infoText, { color: t.textSecondary }]}>
              Enable notifications to be alerted when we go live with a new
              service or event.
            </Text>
          </View>
        </View>
      </ScrollView>
      <BottomFade />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /* Header */
  headerSection: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerTitle: { fontSize: 28, fontFamily: Fonts.extraBold, marginBottom: 2 },
  headerSubtitle: { fontSize: 14, fontFamily: Fonts.regular },
  liveIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(232,71,151,0.12)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
    marginTop: 4,
  },
  livePulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E84797",
  },
  liveIndicatorText: {
    fontSize: 11,
    fontFamily: Fonts.extraBold,
    color: "#E84797",
    letterSpacing: 0.5,
  },

  /* Channel header */
  channelHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  channelAvatar: { width: 44, height: 44, borderRadius: 22 },
  channelMeta: { flex: 1 },
  channelName: { fontSize: 15, fontFamily: Fonts.bold, marginBottom: 1 },
  channelStats: { fontSize: 12, fontFamily: Fonts.regular },
  subscribeBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF0000",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 5,
  },
  subscribeBtnText: { color: "#FFF", fontSize: 13, fontFamily: Fonts.bold },

  /* Player */
  playerSection: { marginBottom: 16 },
  playerContainer: { backgroundColor: "#000" },
  playerWebView: {
    width: "100%",
    height: PLAYER_HEIGHT,
    backgroundColor: "#000",
  },
  nowPlayingInfo: { paddingTop: 12, paddingHorizontal: 16 },
  nowPlayingTitle: { fontSize: 16, fontFamily: Fonts.bold, lineHeight: 22 },
  nowPlayingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },
  nowPlayingMeta: { fontSize: 13, fontFamily: Fonts.regular },
  nowPlayingLive: { flexDirection: "row", alignItems: "center", gap: 6 },
  nowPlayingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E84797",
  },
  nowPlayingLiveText: {
    fontSize: 12,
    fontFamily: Fonts.bold,
    color: "#E84797",
  },

  /* Loading */
  loadingContainer: { alignItems: "center", paddingVertical: 48, gap: 12 },
  loadingText: { fontSize: 14, fontFamily: Fonts.medium },

  /* Filter chips */
  filterSection: { paddingBottom: 8 },
  chipRow: { paddingHorizontal: 16, gap: 8, paddingVertical: 6 },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterChipText: { fontSize: 13, fontFamily: Fonts.semiBold },
  catChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  catChipText: { fontSize: 12, fontFamily: Fonts.semiBold },

  /* Sections */
  sectionContainer: { paddingHorizontal: 16, marginBottom: 24 },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  sectionDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#E84797",
  },
  sectionTitle: { fontSize: 18, fontFamily: Fonts.bold },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  videoCount: { fontSize: 13, fontFamily: Fonts.medium },

  /* Video card */
  videoCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 16,
  },
  cardThumbWrap: { position: "relative" },
  cardThumbImg: { width: "100%", height: CARD_THUMB_HEIGHT },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  playBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 3,
  },
  durationBadge: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.8)",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
  },
  durationText: {
    color: "#FFF",
    fontSize: 11,
    fontFamily: Fonts.bold,
    letterSpacing: 0.3,
  },
  categoryBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(32,63,154,0.85)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryBadgeText: {
    color: "#FFF",
    fontSize: 10,
    fontFamily: Fonts.bold,
    letterSpacing: 0.5,
  },
  playingStrip: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(232,71,151,0.9)",
    paddingVertical: 4,
    alignItems: "center",
  },
  playingStripText: {
    color: "#FFF",
    fontSize: 10,
    fontFamily: Fonts.extraBold,
    letterSpacing: 1,
  },
  liveBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(232,71,151,0.9)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 6,
  },
  liveBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FFF",
  },
  liveBadgeText: {
    color: "#FFF",
    fontSize: 11,
    fontFamily: Fonts.extraBold,
    letterSpacing: 0.5,
  },
  cardBody: { padding: 14 },
  cardTitle: {
    fontSize: 15,
    fontFamily: Fonts.semiBold,
    lineHeight: 21,
    marginBottom: 8,
  },
  cardMeta: { fontSize: 13, fontFamily: Fonts.medium },
  cardMetaRow: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  metaChip: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaChipText: { fontSize: 12, fontFamily: Fonts.medium },

  /* Shorts grid */
  shortsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  shortCard: {
    width: SHORT_CARD_W,
    borderRadius: 14,
    borderWidth: 1,
    overflow: "hidden",
  },
  shortThumb: {
    width: "100%",
    height: SHORT_CARD_H * 0.65,
    backgroundColor: "#111",
  },
  shortOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.15)",
    height: SHORT_CARD_H * 0.65,
  },
  shortDuration: {
    position: "absolute",
    top: SHORT_CARD_H * 0.65 - 24,
    right: 6,
    backgroundColor: "rgba(0,0,0,0.8)",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
  },
  shortBody: { padding: 8 },
  shortTitle: {
    fontSize: 12,
    fontFamily: Fonts.semiBold,
    lineHeight: 16,
    marginBottom: 4,
  },
  shortMeta: { fontSize: 11, fontFamily: Fonts.regular },

  /* Empty */
  emptyState: { alignItems: "center", paddingVertical: 48, gap: 10 },
  emptyText: { fontSize: 15, fontFamily: Fonts.medium },
  emptyReset: { fontSize: 14, fontFamily: Fonts.bold },

  /* Info */
  infoSection: { paddingHorizontal: 16, marginBottom: 32, gap: 12 },
  infoCard: { padding: 16, borderRadius: 14, borderWidth: 1 },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  infoTitle: { fontFamily: Fonts.bold, fontSize: 16 },
  infoText: { fontSize: 13, fontFamily: Fonts.regular, lineHeight: 20 },
});
