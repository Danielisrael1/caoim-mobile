import { Fonts } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import { supabase } from "@/services/supabase";
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

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);

  // sign-in
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // sign-up extras
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const onSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) throw error;

      // Auth success → enter the app
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
      const { error } = await supabase.auth.signUp({
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

      Alert.alert(
        "Account created",
        "If email confirmation is enabled on Supabase, please confirm your email, then sign in.",
      );
      setMode("signin");
    } catch (e: any) {
      Alert.alert("Sign up failed", e?.message ?? "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const title = mode === "signin" ? "Welcome back" : "Create your account";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.background }} edges={["top"]}>
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
              {mode === "signin"
                ? "Sign in once to access the app."
                : "Fill in your details to get started."}
            </Text>
          </View>

          <View style={styles.form}>
            {mode === "signup" ? (
              <>
                <Text style={[styles.label, { color: t.textSecondary }]}>Full name</Text>
                <TextInput
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="John Doe"
                  placeholderTextColor={t.textSecondary}
                  style={[styles.input, { color: t.text, backgroundColor: t.cardBg, borderColor: t.border }]}
                />

                <Text style={[styles.label, { color: t.textSecondary, marginTop: 12 }]}>Contact</Text>
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType={Platform.select({ ios: "phone-pad", android: "phone-pad", default: "numeric" })}
                  placeholder="+234..."
                  placeholderTextColor={t.textSecondary}
                  style={[styles.input, { color: t.text, backgroundColor: t.cardBg, borderColor: t.border }]}
                />
              </>
            ) : null}

            <Text style={[styles.label, { color: t.textSecondary, marginTop: mode === "signup" ? 12 : 0 }]}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="you@example.com"
              placeholderTextColor={t.textSecondary}
              style={[styles.input, { color: t.text, backgroundColor: t.cardBg, borderColor: t.border }]}
            />

            <Text style={[styles.label, { color: t.textSecondary, marginTop: 12 }]}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="••••••••"
              placeholderTextColor={t.textSecondary}
              style={[styles.input, { color: t.text, backgroundColor: t.cardBg, borderColor: t.border }]}
            />

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={mode === "signin" ? onSignIn : onSignUp}
              disabled={loading}
              style={[styles.primaryBtn, { backgroundColor: t.tint, opacity: loading ? 0.7 : 1 }]}
            >
              {loading ? (
                <ActivityIndicator color={t.buttonText} />
              ) : (
                <Text style={[styles.primaryBtnText, { color: t.buttonText }]}>
                  {mode === "signin" ? "Sign in" : "Create account"}
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              disabled={loading}
              onPress={() => setMode((m) => (m === "signin" ? "signup" : "signin"))}
              style={[styles.secondaryBtn, { borderColor: t.border }]}
            >
              <Text style={[styles.secondaryBtnText, { color: t.text }]}>
                {mode === "signin" ? "New here? Create account" : "Already have an account? Sign in"}
              </Text>
            </TouchableOpacity>

            <Text style={[styles.hint, { color: t.textSecondary }]}>The name you provide will be used to greet you on the Home screen.</Text>
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
});
