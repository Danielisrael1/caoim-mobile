import { LiveStream } from "@/constants/church-data";
import { Colors, Fonts } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
import { IconSymbol } from "./ui/icon-symbol";

/* ── Poster thumbnails for events ── */
const THUMBNAILS: { [key: string]: ImageSourcePropType } = {
  conference: require("@/assets/images/conference.jpg"),
  upperroom: require("@/assets/images/upperroom.png"),
  thanksgiving: require("@/assets/images/thanksgiving.png"),
};

/** Cycle through available posters by stream index */
const THUMB_KEYS = Object.keys(THUMBNAILS);
function getThumbnail(streamId: string): ImageSourcePropType {
  const idx = (parseInt(streamId, 10) - 1) % THUMB_KEYS.length;
  return THUMBNAILS[THUMB_KEYS[Math.abs(idx)]];
}

export interface LiveStreamCardProps {
  stream: LiveStream;
  onPress?: () => void;
}

export function LiveStreamCard({ stream, onPress }: LiveStreamCardProps) {
  const colorScheme = useColorScheme();
  const startDate = new Date(stream.startTime);
  const timeString = startDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <ThemedView
        style={[
          styles.card,
          {
            backgroundColor:
              colorScheme === "dark" ? Colors.dark.cardBg : Colors.light.cardBg,
            borderColor:
              colorScheme === "dark" ? Colors.dark.border : Colors.light.border,
          },
        ]}
      >
        {/* Thumbnail area */}
        <View style={styles.thumbnail}>
          <Image
            source={getThumbnail(stream.id)}
            style={styles.thumbnailImage}
            resizeMode="cover"
          />
          <View style={styles.overlay}>
            <IconSymbol name="play.circle.fill" size={48} color="white" />
          </View>

          {stream.isLive && (
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          )}

          {stream.viewers && (
            <View style={styles.viewersBadge}>
              <IconSymbol name="person.fill" size={12} color="white" />
              <Text style={styles.viewersText}>{stream.viewers} watching</Text>
            </View>
          )}
        </View>

        {/* Content */}
        <View
          style={[
            styles.content,
            {
              backgroundColor:
                colorScheme === "dark"
                  ? Colors.dark.cardBg
                  : Colors.light.cardBg,
            },
          ]}
        >
          <ThemedText style={styles.title} type="subtitle">
            {stream.title}
          </ThemedText>

          <ThemedText style={styles.description} numberOfLines={2}>
            {stream.description}
          </ThemedText>

          <View style={styles.metadata}>
            <View style={styles.metadataItem}>
              <IconSymbol
                name="clock"
                size={14}
                color={
                  colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint
                }
              />
              <ThemedText style={styles.metadataText}>{timeString}</ThemedText>
            </View>

            {stream.speaker && (
              <View style={styles.metadataItem}>
                <IconSymbol
                  name="person.fill"
                  size={14}
                  color={
                    colorScheme === "dark"
                      ? Colors.dark.tint
                      : Colors.light.tint
                  }
                />
                <ThemedText style={styles.metadataText}>
                  {stream.speaker}
                </ThemedText>
              </View>
            )}
          </View>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    marginHorizontal: 16,
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  thumbnail: {
    width: "100%",
    height: 200,
    backgroundColor: "#1A2340",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  thumbnailImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  liveBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(232, 71, 151, 0.9)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "white",
  },
  liveText: {
    color: "white",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  viewersBadge: {
    position: "absolute",
    bottom: 12,
    left: 12,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  viewersText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    lineHeight: 18,
    marginBottom: 12,
  },
  metadata: {
    flexDirection: "row",
    gap: 16,
  },
  metadataItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metadataText: {
    fontSize: 12,
  },
});
