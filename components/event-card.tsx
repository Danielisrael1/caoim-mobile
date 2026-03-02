import {
    Event,
    getCategoryColor,
    getCategoryIcon,
} from "@/constants/church-data";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
import { IconSymbol } from "./ui/icon-symbol";

export interface EventCardProps {
  event: Event;
  onPress?: () => void;
}

export function EventCard({ event, onPress }: EventCardProps) {
  const colorScheme = useColorScheme();
  const categoryColor = getCategoryColor(event.category);
  const categoryIcon = getCategoryIcon(event.category);

  const eventDate = new Date(event.date);
  const registered = event.registered || 0;
  const capacity = event.capacity || 0;
  const percentFilled = capacity > 0 ? (registered / capacity) * 100 : 0;

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
        <View style={styles.header}>
          <View
            style={[
              styles.dateSection,
              {
                backgroundColor: colorScheme === "dark" ? "#2D2B42" : "#F0E8FF",
              },
            ]}
          >
            <Text
              style={[
                styles.dateMonth,
                {
                  color:
                    colorScheme === "dark"
                      ? Colors.dark.secondary
                      : Colors.light.secondary,
                },
              ]}
            >
              {eventDate.toLocaleDateString("en-US", { month: "short" })}
            </Text>
            <Text
              style={[
                styles.dateDay,
                {
                  color:
                    colorScheme === "dark"
                      ? Colors.dark.tint
                      : Colors.light.tint,
                },
              ]}
            >
              {eventDate.toLocaleDateString("en-US", { day: "numeric" })}
            </Text>
          </View>

          <View style={styles.contentSection}>
            <View style={styles.titleRow}>
              <ThemedText style={styles.title} type="subtitle">
                {event.title}
              </ThemedText>
              <View
                style={[
                  styles.categoryBadge,
                  { backgroundColor: categoryColor },
                ]}
              >
                <IconSymbol
                  name={categoryIcon as any}
                  size={12}
                  color="white"
                />
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <IconSymbol
                  name="clock"
                  size={14}
                  color={colorScheme === "dark" ? "#9D9DB0" : "#6B4CE6"}
                />
                <ThemedText style={styles.infoText}>
                  {event.startTime}
                </ThemedText>
              </View>

              <View style={styles.infoItem}>
                <IconSymbol
                  name="location.fill"
                  size={14}
                  color={colorScheme === "dark" ? "#9D9DB0" : "#6B4CE6"}
                />
                <ThemedText style={styles.infoText} numberOfLines={1}>
                  {event.location}
                </ThemedText>
              </View>
            </View>

            {event.capacity && (
              <View style={styles.capacitySection}>
                <View
                  style={[
                    styles.capacityBar,
                    {
                      backgroundColor:
                        colorScheme === "dark" ? "#2D2B42" : "#E5E1F5",
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.capacityFill,
                      {
                        width: `${Math.min(percentFilled, 100)}%`,
                        backgroundColor: categoryColor,
                      },
                    ]}
                  />
                </View>
                <ThemedText style={styles.capacityText}>
                  {registered}/{capacity} registered
                </ThemedText>
              </View>
            )}
          </View>
        </View>

        <ThemedText style={styles.description} numberOfLines={2}>
          {event.description}
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  dateSection: {
    width: 55,
    height: 70,
    borderRadius: 8,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
  },
  dateMonth: {
    fontSize: 11,
    fontWeight: "700",
    color: "#666",
    letterSpacing: 0.5,
  },
  dateDay: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginTop: 2,
  },
  contentSection: {
    flex: 1,
    justifyContent: "space-between",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
  },
  categoryBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  infoRow: {
    gap: 12,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoText: {
    fontSize: 12,
  },
  capacitySection: {
    marginTop: 8,
    gap: 6,
  },
  capacityBar: {
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    overflow: "hidden",
  },
  capacityFill: {
    height: "100%",
    borderRadius: 2,
  },
  capacityText: {
    fontSize: 11,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 8,
  },
});
