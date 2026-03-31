import { Fonts } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import { useUser } from "@/hooks/use-user";
import { supabase } from "@/services/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function cleanPhone(input: string) {
  return input.replace(/[\s()-]/g, "").trim();
}

export default function AuthGateScreen() {
  const t = useAppTheme();
  const router = useRouter();

  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [loading, setLoading] = useState(false);

  // sign-up fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  // shared auth fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const { refreshLocalProfile } = useUser();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const onSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) throw error;

      router.replace("/(tabs)");
    } catch (e: any) {
      Alert.alert("Sign in failed", e?.message ?? "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onSignUp = async () => {
    if (!fullName.trim()) {
      Alert.alert("Missing name", "Please enter your full name.");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            phone: cleanPhone(phone),
          },
        },
      });
      if (error) throw error;

      // If Supabase email confirmation is OFF, a session will be returned and the user can proceed.
      // If it's ON, data.session will be null and the user must confirm email.
      if (!data?.session) {
        Alert.alert(
          "Email confirmation required",
          "Please confirm your email, then sign in to continue.",
        );
        setMode("signin");
        return;
      }

      // If user picked a photo, save it locally
      if (data?.user && avatarUri) {
        try {
          const filename = `avatar_${data.user.id}_${Date.now()}.jpg`;
          const savedUri = `${FileSystem.documentDirectory}${filename}`;
          await FileSystem.copyAsync({ from: avatarUri, to: savedUri });

          // Save to AsyncStorage so useUser merges it
          const profileData = {
            full_name: fullName.trim(),
            avatar_url: savedUri,
          };
          await AsyncStorage.setItem(
            `user_profile_${data.user.id}`,
            JSON.stringify(profileData),
          );

          // Force a refresh of user data
          await refreshLocalProfile();
        } catch (e) {
          console.error("Local profile save failed during signup:", e);
        }
      }

      router.replace("/(tabs)");
    } catch (e: any) {
      Alert.alert("Sign up failed", e?.message ?? "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const title = mode === "signup" ? "Create your account" : "Welcome back";

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: t.background }}
      edges={["top"]}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({ ios: "padding", android: undefined })}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 32 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={[styles.title, { color: t.text }]}>{title}</Text>
            <Text style={[styles.subtitle, { color: t.textSecondary }]}>
              {mode === "signup"
                ? "You must create an account (or sign in) before you can access the app."
                : "Sign in to access the app."}
            </Text>
          </View>

          <View style={styles.form}>
            {mode === "signup" ? (
              <>
                <Text style={[styles.label, { color: t.textSecondary }]}>
                  Full name
                </Text>
                <TextInput
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="John Doe"
                  placeholderTextColor={t.textSecondary}
                  style={[
                    styles.input,
                    {
                      color: t.text,
                      backgroundColor: t.cardBg,
                      borderColor: t.border,
                    },
                  ]}
                />

                <Text
                  style={[
                    styles.label,
                    { color: t.textSecondary, marginTop: 12 },
                  ]}
                >
                  Contact
                </Text>
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType={Platform.select({
                    ios: "phone-pad",
                    android: "phone-pad",
                    default: "numeric",
                  })}
                  placeholder="+234..."
                  placeholderTextColor={t.textSecondary}
                  style={[
                    styles.input,
                    {
                      color: t.text,
                      backgroundColor: t.cardBg,
                      borderColor: t.border,
                    },
                  ]}
                />

                <Text style={[styles.label, { color: t.textSecondary, marginTop: 12 }]}>
                  Profile Photo (Optional)
                </Text>
                <TouchableOpacity
                  onPress={pickImage}
                  style={[
                    styles.photoPicker,
                    { backgroundColor: t.cardBg, borderColor: t.border },
                  ]}
                >
                  {avatarUri ? (
                    <Image source={{ uri: avatarUri }} style={styles.photoPreview} />
                  ) : (
                    <View style={styles.photoPickerPlaceholder}>
                      <Ionicons name="camera" size={24} color={t.textSecondary} />
                      <Text style={[styles.photoPickerText, { color: t.textSecondary }]}>
                        Pick a photo
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </>
            ) : null}

            <Text
              style={[
                styles.label,
                {
                  color: t.textSecondary,
                  marginTop: mode === "signup" ? 12 : 0,
                },
              ]}
            >
              Email
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="you@example.com"
              placeholderTextColor={t.textSecondary}
              style={[
                styles.input,
                {
                  color: t.text,
                  backgroundColor: t.cardBg,
                  borderColor: t.border,
                },
              ]}
            />

            <Text
              style={[styles.label, { color: t.textSecondary, marginTop: 12 }]}
            >
              Password
            </Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="••••••••"
              placeholderTextColor={t.textSecondary}
              style={[
                styles.input,
                {
                  color: t.text,
                  backgroundColor: t.cardBg,
                  borderColor: t.border,
                },
              ]}
            />

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={mode === "signup" ? onSignUp : onSignIn}
              disabled={loading}
              style={[
                styles.primaryBtn,
                { backgroundColor: t.tint, opacity: loading ? 0.7 : 1 },
              ]}
            >
              {loading ? (
                <ActivityIndicator color={t.buttonText} />
              ) : (
                <Text style={[styles.primaryBtnText, { color: t.buttonText }]}>
                  {mode === "signup" ? "Create account" : "Sign in"}
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              disabled={loading}
              onPress={() =>
                setMode((m) => (m === "signup" ? "signin" : "signup"))
              }
              style={[styles.secondaryBtn, { borderColor: t.border }]}
            >
              <Text style={[styles.secondaryBtnText, { color: t.text }]}>
                {mode === "signup"
                  ? "Already have an account? Sign in"
                  : "New here? Create account"}
              </Text>
            </TouchableOpacity>

            <Text style={[styles.hint, { color: t.textSecondary }]}>
              {mode === "signup"
                ? "The name you provide will be used to greet you on the Home screen."
                : "No access without an account — sign in with an existing one or create a new one."}
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.extraBold,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: Fonts.regular,
  },
  form: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  label: {
    fontSize: 13,
    fontFamily: Fonts.medium,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    fontFamily: Fonts.regular,
  },
  primaryBtn: {
    marginTop: 18,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  primaryBtnText: {
    fontSize: 15,
    fontFamily: Fonts.bold,
  },
  secondaryBtn: {
    marginTop: 12,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
  },
  secondaryBtnText: {
    fontSize: 14,
    fontFamily: Fonts.bold,
  },
  hint: {
    marginTop: 14,
    fontSize: 12,
    fontFamily: Fonts.regular,
    lineHeight: 18,
  },
  photoPicker: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    overflow: "hidden",
    alignSelf: "center",
  },
  photoPreview: {
    width: "100%",
    height: "100%",
  },
  photoPickerPlaceholder: {
    alignItems: "center",
    gap: 4,
  },
  photoPickerText: {
    fontSize: 12,
    fontFamily: Fonts.medium,
  },
});
