import {
    Update,
    getCategoryColor,
    getCategoryIcon,
} from "@/constants/church-data";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
import { IconSymbol } from "./ui/icon-symbol";

export interface UpdateCardProps {
  update: Update;
  onPress?: () => void;
}

export function UpdateCard({ update, onPress }: UpdateCardProps) {
  const colorScheme = useColorScheme();
  const categoryColor = getCategoryColor(update.category);
  const categoryIcon = getCategoryIcon(update.category);

  const date = new Date(update.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
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
        <View style={styles.header}>
          <View
            style={[styles.categoryBadge, { backgroundColor: categoryColor }]}
          >
            <IconSymbol name={categoryIcon as any} size={14} color="white" />
            <Text style={styles.categoryText}>
              {update.category.charAt(0).toUpperCase() +
                update.category.slice(1)}
            </Text>
          </View>
          <ThemedText style={styles.date}>{formattedDate}</ThemedText>
        </View>

        <ThemedText style={styles.title} type="subtitle">
          {update.title}
        </ThemedText>

        <ThemedText style={styles.description} numberOfLines={3}>
          {update.description}
        </ThemedText>

        <View style={styles.footer}>
          <ThemedText
            style={[
              styles.readMore,
              {
                color:
                  colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint,
              },
            ]}
          >
            Read more →
          </ThemedText>
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  categoryBadge: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: "center",
    gap: 6,
  },
  categoryText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  date: {
    fontSize: 12,
    fontWeight: "500",
  },
  title: {
    marginBottom: 8,
    fontWeight: "600",
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  readMore: {
    fontSize: 14,
    fontWeight: "600",
  },
});
