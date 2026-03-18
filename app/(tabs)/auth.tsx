import { Fonts } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import { supabase } from "@/services/supabase";
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

export default function AuthScreen() {
  const t = useAppTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) throw error;
    } catch (e: any) {
      Alert.alert("Sign in failed", e?.message ?? "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onSignUp = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });
      if (error) throw error;
      Alert.alert(
        "Check your email",
        "We sent you a confirmation email. Confirm it, then come back and sign in.",
      );
    } catch (e: any) {
      Alert.alert("Sign up failed", e?.message ?? "Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
            <Text style={[styles.title, { color: t.text }]}>Sign in</Text>
            <Text style={[styles.subtitle, { color: t.textSecondary }]}>
              Use your Supabase account.
            </Text>
          </View>

          <View style={styles.form}>
            <Text style={[styles.label, { color: t.textSecondary }]}>
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
              onPress={onSignIn}
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
                  Sign in
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={onSignUp}
              disabled={loading}
              style={[styles.secondaryBtn, { borderColor: t.border }]}
            >
              <Text style={[styles.secondaryBtnText, { color: t.text }]}>
                Create account
              </Text>
            </TouchableOpacity>

            <Text style={[styles.hint, { color: t.textSecondary }]}>
              If email confirmation is enabled in Supabase, you must confirm
              before signing in.
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
    fontSize: 15,
    fontFamily: Fonts.bold,
  },
  hint: {
    marginTop: 14,
    fontSize: 12,
    fontFamily: Fonts.regular,
    lineHeight: 18,
  },
});
