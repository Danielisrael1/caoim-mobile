/**
 * YouTube Service for CAOIM Church
 *
 * Fetches recent videos and live streams from the church's YouTube channel.
 * Requires a YouTube Data API v3 key.
 *
 * To get your API key:
 * 1. Go to https://console.cloud.google.com
 * 2. Create a project → Enable "YouTube Data API v3"
 * 3. Create an API Key under Credentials
 * 4. Paste it into YOUTUBE_API_KEY below
 */

/** YouTube Data API v3 key */
const YOUTUBE_API_KEY: string = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY ?? "";

/** CAOIM YouTube channel ID — resolved from @caoim26 */
const CHANNEL_ID = "UCbS5Y40CjCU316YugzroIlg";

/** Fallback channel handle used for URL linking */
export const CHANNEL_URL = "https://www.youtube.com/@caoim26";

export type VideoType = "live" | "short" | "video";
export type VideoCategory =
  | "conference"
  | "sunday"
  | "wednesday"
  | "worship"
  | "other";

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  isLive: boolean;
  viewCount?: string;
  duration?: string;
  likeCount?: string;
  /** Raw ISO 8601 duration for classification */
  rawDuration?: string;
  videoType?: VideoType;
  category?: VideoCategory;
}

export interface YouTubeChannelInfo {
  name: string;
  thumbnail: string;
  subscriberCount: string;
  videoCount: string;
  description: string;
}

/** Check if API key is configured */
export function isYouTubeConfigured(): boolean {
  return (
    YOUTUBE_API_KEY !== "YOUR_YOUTUBE_API_KEY_HERE" &&
    YOUTUBE_API_KEY.length > 10
  );
}

/** Fetch recent uploads from the CAOIM channel */
export async function fetchRecentVideos(
  maxResults = 10,
): Promise<YouTubeVideo[]> {
  if (!isYouTubeConfigured()) return [];

  try {
    // Step 1: Get the uploads playlist ID
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`,
    );
    const channelData = await channelRes.json();
    const uploadsPlaylistId =
      channelData?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

    if (!uploadsPlaylistId) return [];

    // Step 2: Get recent videos from uploads playlist
    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${uploadsPlaylistId}&key=${YOUTUBE_API_KEY}`,
    );
    const playlistData = await playlistRes.json();
    const items = playlistData?.items ?? [];

    const videos: YouTubeVideo[] = items.map((item: any) => ({
      id: item.snippet?.resourceId?.videoId ?? "",
      title: item.snippet?.title ?? "Untitled",
      description: item.snippet?.description?.slice(0, 200) ?? "",
      thumbnail:
        item.snippet?.thumbnails?.high?.url ??
        item.snippet?.thumbnails?.default?.url ??
        "",
      publishedAt: item.snippet?.publishedAt ?? "",
      isLive: false,
    }));

    // Step 3: Enrich with statistics (view counts, durations, likes)
    const videoIds = videos.map((v) => v.id).filter(Boolean);
    const stats = await fetchVideoStats(videoIds);
    for (const video of videos) {
      const s = stats[video.id];
      if (s) {
        video.viewCount = s.viewCount;
        video.duration = s.duration;
        video.likeCount = s.likeCount;
        video.rawDuration = s.rawDuration;
      }
      // Classify type & category
      video.videoType = classifyVideoType(video);
      video.category = classifyCategory(video);
    }

    return videos;
  } catch (error) {
    console.warn("YouTube API error:", error);
    return [];
  }
}

/** Check if channel is currently live */
export async function fetchLiveStream(): Promise<YouTubeVideo | null> {
  if (!isYouTubeConfigured()) return null;

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${YOUTUBE_API_KEY}`,
    );
    const data = await res.json();
    const liveItem = data?.items?.[0];

    if (!liveItem) return null;

    return {
      id: liveItem.id?.videoId ?? "",
      title: liveItem.snippet?.title ?? "Live Stream",
      description: liveItem.snippet?.description?.slice(0, 200) ?? "",
      thumbnail:
        liveItem.snippet?.thumbnails?.high?.url ??
        liveItem.snippet?.thumbnails?.default?.url ??
        "",
      publishedAt: liveItem.snippet?.publishedAt ?? "",
      isLive: true,
    };
  } catch (error) {
    console.warn("YouTube live check error:", error);
    return null;
  }
}

/** Build a YouTube watch URL */
export function getVideoUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

/** Build a YouTube subscribe URL */
export function getSubscribeUrl(): string {
  return `https://www.youtube.com/channel/${CHANNEL_ID}?sub_confirmation=1`;
}

/** Fetch channel info (name, thumbnail, subscriber count) */
export async function fetchChannelInfo(): Promise<YouTubeChannelInfo | null> {
  if (!isYouTubeConfigured()) return null;

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`,
    );
    const data = await res.json();
    const channel = data?.items?.[0];
    if (!channel) return null;

    return {
      name: channel.snippet?.title ?? "CAOIM",
      thumbnail:
        channel.snippet?.thumbnails?.medium?.url ??
        channel.snippet?.thumbnails?.default?.url ??
        "",
      subscriberCount: channel.statistics?.subscriberCount ?? "0",
      videoCount: channel.statistics?.videoCount ?? "0",
      description: channel.snippet?.description?.slice(0, 200) ?? "",
    };
  } catch (error) {
    console.warn("YouTube channel info error:", error);
    return null;
  }
}

/** Fetch view counts and durations for a list of video IDs */
export async function fetchVideoStats(videoIds: string[]): Promise<
  Record<
    string,
    {
      viewCount: string;
      duration: string;
      likeCount: string;
      rawDuration: string;
    }
  >
> {
  if (!isYouTubeConfigured() || videoIds.length === 0) return {};

  try {
    const ids = videoIds.join(",");
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${ids}&key=${YOUTUBE_API_KEY}`,
    );
    const data = await res.json();
    const result: Record<
      string,
      {
        viewCount: string;
        duration: string;
        likeCount: string;
        rawDuration: string;
      }
    > = {};

    for (const item of data?.items ?? []) {
      const raw = item.contentDetails?.duration ?? "";
      result[item.id] = {
        viewCount: item.statistics?.viewCount ?? "0",
        likeCount: item.statistics?.likeCount ?? "0",
        duration: parseDuration(raw),
        rawDuration: raw,
      };
    }
    return result;
  } catch {
    return {};
  }
}

/** Get duration in seconds from ISO 8601 */
function durationToSeconds(iso: string): number {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  return (
    parseInt(match[1] ?? "0") * 3600 +
    parseInt(match[2] ?? "0") * 60 +
    parseInt(match[3] ?? "0")
  );
}

/** Classify video as short, live, or regular video */
function classifyVideoType(video: YouTubeVideo): VideoType {
  if (video.isLive) return "live";
  // Shorts are ≤ 60 seconds
  if (video.rawDuration && durationToSeconds(video.rawDuration) <= 60)
    return "short";
  // Title-based: hashtag-heavy short titles are usually Shorts
  if (
    video.title.startsWith("#") &&
    (!video.rawDuration || durationToSeconds(video.rawDuration) <= 120)
  )
    return "short";
  return "video";
}

/** Classify video into a content category based on title keywords */
function classifyCategory(video: YouTubeVideo): VideoCategory {
  const t = video.title.toUpperCase();
  if (t.includes("CONFERENCE") || t.includes("BELIEVER")) return "conference";
  if (t.includes("SUNDAY") || t.includes("MAIN SERVICE")) return "sunday";
  if (
    t.includes("WEDNESDAY") ||
    t.includes("MIDWEEK") ||
    t.includes("MID-WEEK") ||
    t.includes("PRAYER")
  )
    return "wednesday";
  if (t.includes("WORSHIP") || t.includes("PRAISE") || t.includes("HYMN"))
    return "worship";
  // Description fallback
  const d = video.description.toUpperCase();
  if (d.includes("CONFERENCE")) return "conference";
  if (d.includes("SUNDAY")) return "sunday";
  if (d.includes("WEDNESDAY") || d.includes("MIDWEEK")) return "wednesday";
  if (d.includes("WORSHIP") || d.includes("PRAISE")) return "worship";
  return "other";
}

/** Parse ISO 8601 duration (PT1H2M3S) to readable string */
function parseDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "";
  const h = match[1] ? `${match[1]}:` : "";
  const m = match[2] ?? "0";
  const s = (match[3] ?? "0").padStart(2, "0");
  return h ? `${h}${m.padStart(2, "0")}:${s}` : `${m}:${s}`;
}

/** Format view count to human-readable */
export function formatViews(count: string): string {
  const n = parseInt(count, 10);
  if (isNaN(n)) return "0 views";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M views`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K views`;
  return `${n} views`;
}

/** Format time ago from ISO date */
export function timeAgo(dateStr: string): string {
  const now = Date.now();
  const date = new Date(dateStr).getTime();
  const diff = now - date;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}
