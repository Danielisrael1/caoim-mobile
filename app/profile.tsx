import { BottomFade } from "@/components/bottom-fade";
import { Fonts } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import { useThemeToggle } from "@/hooks/use-theme-toggle";
import { useUser } from "@/hooks/use-user";
import { isSupabaseConfigured, supabase } from "@/services/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ThemeMode = "system" | "light" | "dark";

export default function ProfileScreen() {
  const router = useRouter();
  const t = useAppTheme();
  const { isDark, mode, setMode } = useThemeToggle();
  const { user, displayName, refreshLocalProfile } = useUser();

  const [editOpen, setEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [fullNameDraft, setFullNameDraft] = useState(displayName ?? "");
  const [avatarDraft, setAvatarDraft] = useState<string | undefined>(
    user.avatar,
  );

  const initials = useMemo(() => {
    const a = `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.trim();
    if (a) return a;
    const fromDisplay = (displayName ?? "").trim();
    return fromDisplay ? (fromDisplay[0]?.toUpperCase() ?? "") : "";
  }, [displayName, user.firstName, user.lastName]);

  const onRequestNotifications = async () => {
    try {
      const perms = await Notifications.getPermissionsAsync();
      if (perms.granted) {
        Alert.alert("Notifications enabled", "You're all set.");
        return;
      }

      const req = await Notifications.requestPermissionsAsync();
      if (!req.granted) {
        Alert.alert(
          "Permission not granted",
          "Please enable notifications in Settings to receive updates.",
        );
        return;
      }

      Alert.alert("Notifications enabled", "You're all set.");
    } catch {
      Alert.alert("Error", "Could not request notification permission.");
    }
  };

  const onPickAvatar = async () => {
    try {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (perm.status !== "granted") {
        Alert.alert(
          "Permission needed",
          "Please allow photo library access to choose a profile photo.",
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        // Accept any image format the picker can return (jpg/png/heic/webp/etc.)
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (result.canceled) return;

      const uri = result.assets?.[0]?.uri;
      if (!uri) return;

      // Persist to on-device app storage so it remains available on this device.
      const extFromName = (() => {
        try {
          const noQuery = uri.split("?")[0];
          const last = noQuery.split("/").pop() ?? "";
          const dot = last.lastIndexOf(".");
          if (dot === -1) return "";
          return last.slice(dot).toLowerCase();
        } catch {
          return "";
        }
      })();

      const baseDir =
        (FileSystem as any).documentDirectory ??
        (FileSystem as any).cacheDirectory ??
        "";
      if (!baseDir) {
        // If we can't resolve a writable directory, fall back to using the picked URI.
        setAvatarDraft(uri);
        return;
      }

      const savedUri = `${baseDir}avatar_${user.id}${extFromName || ".jpg"}`;

      // Best-effort cleanup (ignore if it doesn't exist).
      await FileSystem.deleteAsync(savedUri, { idempotent: true });
      await FileSystem.copyAsync({ from: uri, to: savedUri });

      setAvatarDraft(savedUri);
    } catch {
      Alert.alert("Error", "Could not pick an image.");
    }
  };
  const onSaveProfile = async () => {
    const full = fullNameDraft.trim();
    if (!full) {
      Alert.alert("Missing name", "Please enter your full name.");
      return;
    }

    setSaving(true);
    try {
      // Save profile updates locally to AsyncStorage as requested
      const profileData = {
        full_name: full,
        avatar_url: avatarDraft,
      };

      await AsyncStorage.setItem(
        `user_profile_${user.id}`,
        JSON.stringify(profileData),
      );

      // Trigger a refresh of the user hook state
      await refreshLocalProfile();

      setEditOpen(false);
      Alert.alert("Saved", "Your profile has been updated locally on this device.");
    } catch (e: any) {
      Alert.alert("Save failed", "Could not save your profile changes locally.");
    } finally {
      setSaving(false);
    }
  };

  const onSignOut = async () => {
    try {
      if (!isSupabaseConfigured) {
        Alert.alert(
          "Not configured",
          "Supabase is not configured for this build. Please rebuild the app with EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY.",
        );
        return;
      }

      await supabase.auth.signOut();
      router.replace("/auth");
    } catch {
      // ignore
    }
  };

  const themeOptions: { id: ThemeMode; label: string; icon: string }[] = [
    { id: "system", label: "System", icon: "phone-portrait-outline" },
    { id: "light", label: "Light", icon: "sunny-outline" },
    { id: "dark", label: "Dark", icon: "moon-outline" },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: t.background }]}
      edges={["top"]}
    >
      {/* Back button */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[
            styles.backButton,
            { backgroundColor: t.cardBg, borderColor: t.border },
          ]}
        >
          <Ionicons name="chevron-back" size={22} color={t.text} />
        </TouchableOpacity>
        <Text style={[styles.topBarTitle, { color: t.text }]}>My Account</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* ── Profile Card ── */}
        <View style={styles.profileSection}>
          <View
            style={[
              styles.avatarCircle,
              { backgroundColor: isDark ? "#2D3A5C" : "#203F9A" },
            ]}
          >
            {user.avatar ? (
              <Image
                source={{ uri: user.avatar }}
                style={styles.avatarImage}
                contentFit="cover"
              />
            ) : (
              <Text style={styles.avatarText}>{initials}</Text>
            )}
          </View>
          <Text style={[styles.profileName, { color: t.text }]}>
            {displayName}
          </Text>
          <Text style={[styles.profileEmail, { color: t.textSecondary }]}>
            {user.email}
          </Text>

          <TouchableOpacity
            onPress={() => {
              setFullNameDraft(displayName ?? "");
              setAvatarDraft(user.avatar);
              setEditOpen(true);
            }}
            style={[
              styles.editProfileBtn,
              { backgroundColor: t.cardBg, borderColor: t.border },
            ]}
          >
            <Ionicons name="pencil" size={14} color={t.tint} />
            <Text style={[styles.editProfileText, { color: t.tint }]}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── Settings Section ── */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionLabel, { color: t.textSecondary }]}>
            APPEARANCE
          </Text>

          <View
            style={[
              styles.settingsCard,
              { backgroundColor: t.cardBg, borderColor: t.border },
            ]}
          >
            <View style={styles.settingRow}>
              <Ionicons
                name={isDark ? "moon" : "sunny"}
                size={20}
                color={t.tint}
              />
              <Text style={[styles.settingLabel, { color: t.text }]}>
                Theme
              </Text>
            </View>

            {/* Theme toggle options */}
            <View style={styles.themeToggleRow}>
              {themeOptions.map((opt) => (
                <TouchableOpacity
                  key={opt.id}
                  style={[
                    styles.themeOption,
                    {
                      backgroundColor:
                        mode === opt.id
                          ? isDark
                            ? "rgba(148, 194, 218, 0.15)"
                            : "rgba(32, 63, 154, 0.1)"
                          : "transparent",
                      borderColor: mode === opt.id ? t.tint : t.border,
                    },
                  ]}
                  onPress={() => setMode(opt.id)}
                >
                  <Ionicons
                    name={opt.icon as any}
                    size={18}
                    color={mode === opt.id ? t.tint : t.textSecondary}
                  />
                  <Text
                    style={[
                      styles.themeOptionText,
                      {
                        color: mode === opt.id ? t.tint : t.textSecondary,
                        fontFamily: mode === opt.id ? Fonts.bold : Fonts.medium,
                      },
                    ]}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.themeHint, { color: t.textSecondary }]}>
              {mode === "system"
                ? "Theme follows your device settings"
                : mode === "dark"
                  ? "Always use dark theme"
                  : "Always use light theme"}
            </Text>
          </View>
        </View>

        {/* ── General Settings ── */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionLabel, { color: t.textSecondary }]}>
            GENERAL
          </Text>

          <View
            style={[
              styles.settingsCard,
              { backgroundColor: t.cardBg, borderColor: t.border },
            ]}
          >
            <SettingItem
              icon="notifications-outline"
              label="Notifications"
              theme={t}
              value="Enable"
              hasChevron
              onPress={onRequestNotifications}
            />
            <View style={[styles.divider, { backgroundColor: t.border }]} />
            <SettingItem
              icon="language-outline"
              label="Language"
              theme={t}
              value="English"
              hasChevron
            />
            <View style={[styles.divider, { backgroundColor: t.border }]} />
            <SettingItem
              icon="cloud-download-outline"
              label="Offline Downloads"
              theme={t}
              hasChevron
            />
          </View>
        </View>

        {/* ── About Section ── */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionLabel, { color: t.textSecondary }]}>
            ABOUT
          </Text>

          <View
            style={[
              styles.settingsCard,
              { backgroundColor: t.cardBg, borderColor: t.border },
            ]}
          >
            <SettingItem
              icon="information-circle-outline"
              label="About CAOIM"
              theme={t}
              hasChevron
            />
            <View style={[styles.divider, { backgroundColor: t.border }]} />
            <SettingItem
              icon="shield-checkmark-outline"
              label="Privacy Policy"
              theme={t}
              hasChevron
            />
            <View style={[styles.divider, { backgroundColor: t.border }]} />
            <SettingItem
              icon="document-text-outline"
              label="Terms of Service"
              theme={t}
              hasChevron
            />
            <View style={[styles.divider, { backgroundColor: t.border }]} />
            <SettingItem
              icon="code-slash-outline"
              label="App Version"
              theme={t}
              value="1.0.0"
            />
          </View>
        </View>

        {/* ── Sign Out ── */}
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            onPress={onSignOut}
            style={[
              styles.signOutButton,
              { backgroundColor: t.cardBg, borderColor: t.border },
            ]}
          >
            <Ionicons name="log-out-outline" size={20} color="#EF4444" />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={editOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setEditOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalCard,
              { backgroundColor: t.cardBg, borderColor: t.border },
            ]}
          >
            <Text style={[styles.modalTitle, { color: t.text }]}>
              Edit Profile
            </Text>

            <TouchableOpacity
              onPress={onPickAvatar}
              activeOpacity={0.85}
              style={[styles.modalAction, { borderColor: t.border }]}
            >
              <Ionicons name="image-outline" size={18} color={t.tint} />
              <Text style={[styles.modalActionText, { color: t.text }]}>
                {avatarDraft ? "Change photo" : "Upload photo"}
              </Text>
            </TouchableOpacity>

            <Text style={[styles.modalLabel, { color: t.textSecondary }]}>
              Username
            </Text>
            <TextInput
              value={fullNameDraft}
              onChangeText={setFullNameDraft}
              placeholder="Your name"
              placeholderTextColor={t.textSecondary}
              style={[
                styles.modalInput,
                { color: t.text, borderColor: t.border },
              ]}
            />

            <View style={styles.modalBtnsRow}>
              <TouchableOpacity
                onPress={() => setEditOpen(false)}
                disabled={saving}
                style={[
                  styles.modalBtn,
                  styles.modalBtnSecondary,
                  { borderColor: t.border },
                ]}
              >
                <Text style={[styles.modalBtnText, { color: t.text }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onSaveProfile}
                disabled={saving}
                style={[
                  styles.modalBtn,
                  { backgroundColor: t.tint, opacity: saving ? 0.7 : 1 },
                ]}
              >
                <Text style={[styles.modalBtnText, { color: t.buttonText }]}>
                  {saving ? "Saving..." : "Save"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <BottomFade />
    </SafeAreaView>
  );
}

/* ── Setting Item Component ── */
function SettingItem({
  icon,
  label,
  theme,
  value,
  hasChevron,
  onPress,
}: {
  icon: string;
  label: string;
  theme: any;
  value?: string;
  hasChevron?: boolean;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.settingItem}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.settingItemLeft}>
        <Ionicons name={icon as any} size={20} color={theme.tint} />
        <Text style={[styles.settingItemLabel, { color: theme.text }]}>
          {label}
        </Text>
      </View>
      <View style={styles.settingItemRight}>
        {value && (
          <Text
            style={[styles.settingItemValue, { color: theme.textSecondary }]}
          >
            {value}
          </Text>
        )}
        {hasChevron && (
          <Ionicons
            name="chevron-forward"
            size={16}
            color={theme.textSecondary}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  topBarTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
  },

  /* Profile Card */
  profileSection: {
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  avatarCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    overflow: "hidden", // Important for contained images
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarText: {
    fontSize: 32,
    fontFamily: Fonts.bold,
    color: "#FFFFFF",
  },
  profileName: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    marginBottom: 16,
  },
  editProfileBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
  },
  editProfileText: {
    fontSize: 13,
    fontFamily: Fonts.semiBold,
  },

  /* Section */
  sectionContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 11,
    fontFamily: Fonts.bold,
    letterSpacing: 1.2,
    marginBottom: 10,
    marginLeft: 4,
  },
  settingsCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },

  /* Theme toggle */
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
  },
  themeToggleRow: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  themeOption: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  themeOptionText: {
    fontSize: 13,
  },
  themeHint: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  /* Setting item */
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  settingItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  settingItemLabel: {
    fontSize: 15,
    fontFamily: Fonts.medium,
  },
  settingItemRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  settingItemValue: {
    fontSize: 13,
    fontFamily: Fonts.regular,
  },
  divider: {
    height: 1,
    marginLeft: 48,
  },

  /* Sign out */
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  signOutText: {
    fontSize: 15,
    fontFamily: Fonts.semiBold,
    color: "#EF4444",
  },

  /* Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    padding: 20,
  },
  modalCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    marginBottom: 12,
  },
  modalAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  modalActionText: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
  },
  modalLabel: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    marginBottom: 8,
  },
  modalInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 15,
    fontFamily: Fonts.regular,
    marginBottom: 14,
  },
  modalBtnsRow: {
    flexDirection: "row",
    gap: 10,
  },
  modalBtn: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  modalBtnSecondary: {
    borderWidth: 1,
    backgroundColor: "transparent",
  },
  modalBtnText: {
    fontSize: 14,
    fontFamily: Fonts.bold,
  },
});
