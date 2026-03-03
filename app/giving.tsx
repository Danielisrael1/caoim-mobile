import { Fonts } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
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

type PaymentMethod = "mtn" | "airtel" | null;

const PRESET_AMOUNTS = [5000, 10000, 20000, 50000, 100000];

export default function GivingScreen() {
  const t = useAppTheme();
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [givingType, setGivingType] = useState<string>("tithe");

  const givingTypes = [
    { id: "tithe", label: "Tithe" },
    { id: "offering", label: "Offering" },
    { id: "missions", label: "Missions" },
    { id: "building", label: "Building Fund" },
    { id: "other", label: "Other" },
  ];

  const handleSubmit = () => {
    if (!selectedMethod) {
      Alert.alert(
        "Select Payment",
        "Please choose MTN or Airtel Mobile Money.",
      );
      return;
    }
    if (!amount || parseInt(amount, 10) < 500) {
      Alert.alert("Invalid Amount", "Please enter at least UGX 500.");
      return;
    }
    if (!phone || phone.length < 10) {
      Alert.alert("Invalid Phone", "Please enter a valid phone number.");
      return;
    }

    const provider =
      selectedMethod === "mtn" ? "MTN Mobile Money" : "Airtel Money";
    Alert.alert(
      "Confirm Giving",
      `You are about to give UGX ${parseInt(amount, 10).toLocaleString()} via ${provider} (${phone}) as ${givingType}.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: () => {
            Alert.alert(
              "Thank You!",
              "Your giving has been submitted. You will receive a confirmation prompt on your phone.",
              [{ text: "OK", onPress: () => router.back() }],
            );
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: t.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={[
                styles.backButton,
                { backgroundColor: t.cardBg, borderColor: t.border },
              ]}
            >
              <Ionicons name="arrow-back" size={22} color={t.text} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: t.text }]}>Giving</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* Hero */}
          <View style={styles.heroSection}>
            <View
              style={[
                styles.heroIcon,
                {
                  backgroundColor: t.isDark
                    ? "rgba(232,71,151,0.12)"
                    : "#F8D7EA",
                },
              ]}
            >
              <Ionicons
                name="heart"
                size={36}
                color={(t as any).accent || "#E84797"}
              />
            </View>
            <Text style={[styles.heroTitle, { color: t.text }]}>
              Give with a Cheerful Heart
            </Text>
            <Text style={[styles.heroSubtitle, { color: t.textSecondary }]}>
              &quot;Each of you should give what you have decided in your heart
              to give.&quot; — 2 Cor 9:7
            </Text>
          </View>

          {/* Giving Type */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: t.text }]}>
              Giving Type
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.typePills}
            >
              {givingTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  onPress={() => setGivingType(type.id)}
                  style={[
                    styles.typePill,
                    {
                      backgroundColor:
                        givingType === type.id ? t.tint : t.cardBg,
                      borderColor: givingType === type.id ? t.tint : t.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.typePillText,
                      {
                        color: givingType === type.id ? "#FFF" : t.text,
                      },
                    ]}
                  >
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Amount */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: t.text }]}>
              Amount (UGX)
            </Text>
            <View
              style={[
                styles.amountInputWrapper,
                { backgroundColor: t.cardBg, borderColor: t.border },
              ]}
            >
              <Text style={[styles.currencyLabel, { color: t.tint }]}>UGX</Text>
              <TextInput
                style={[styles.amountInput, { color: t.text }]}
                placeholder="0"
                placeholderTextColor={t.textSecondary}
                keyboardType="number-pad"
                value={amount}
                onChangeText={setAmount}
              />
            </View>

            {/* Preset amounts */}
            <View style={styles.presets}>
              {PRESET_AMOUNTS.map((preset) => (
                <TouchableOpacity
                  key={preset}
                  onPress={() => setAmount(preset.toString())}
                  style={[
                    styles.presetButton,
                    {
                      backgroundColor:
                        amount === preset.toString() ? t.tint : t.cardBg,
                      borderColor:
                        amount === preset.toString() ? t.tint : t.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.presetText,
                      {
                        color: amount === preset.toString() ? "#FFF" : t.text,
                      },
                    ]}
                  >
                    {(preset / 1000).toFixed(0)}K
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Payment Method */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: t.text }]}>
              Payment Method
            </Text>

            {/* MTN */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelectedMethod("mtn")}
              style={[
                styles.paymentCard,
                {
                  backgroundColor: t.cardBg,
                  borderColor: selectedMethod === "mtn" ? "#FFCC00" : t.border,
                  borderWidth: selectedMethod === "mtn" ? 2 : 1,
                },
              ]}
            >
              <View
                style={[styles.paymentIconBox, { backgroundColor: "#FFCC00" }]}
              >
                <MaterialCommunityIcons
                  name="cellphone"
                  size={24}
                  color="#003B73"
                />
              </View>
              <View style={styles.paymentInfo}>
                <Text style={[styles.paymentName, { color: t.text }]}>
                  MTN Mobile Money
                </Text>
                <Text style={[styles.paymentDesc, { color: t.textSecondary }]}>
                  Pay with MTN MoMo
                </Text>
              </View>
              <View
                style={[
                  styles.radioOuter,
                  {
                    borderColor:
                      selectedMethod === "mtn" ? "#FFCC00" : t.textSecondary,
                  },
                ]}
              >
                {selectedMethod === "mtn" && (
                  <View
                    style={[styles.radioInner, { backgroundColor: "#FFCC00" }]}
                  />
                )}
              </View>
            </TouchableOpacity>

            {/* Airtel */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelectedMethod("airtel")}
              style={[
                styles.paymentCard,
                {
                  backgroundColor: t.cardBg,
                  borderColor:
                    selectedMethod === "airtel" ? "#ED1C24" : t.border,
                  borderWidth: selectedMethod === "airtel" ? 2 : 1,
                },
              ]}
            >
              <View
                style={[styles.paymentIconBox, { backgroundColor: "#ED1C24" }]}
              >
                <MaterialCommunityIcons
                  name="cellphone"
                  size={24}
                  color="#FFF"
                />
              </View>
              <View style={styles.paymentInfo}>
                <Text style={[styles.paymentName, { color: t.text }]}>
                  Airtel Money
                </Text>
                <Text style={[styles.paymentDesc, { color: t.textSecondary }]}>
                  Pay with Airtel Money
                </Text>
              </View>
              <View
                style={[
                  styles.radioOuter,
                  {
                    borderColor:
                      selectedMethod === "airtel" ? "#ED1C24" : t.textSecondary,
                  },
                ]}
              >
                {selectedMethod === "airtel" && (
                  <View
                    style={[styles.radioInner, { backgroundColor: "#ED1C24" }]}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>

          {/* Phone Number */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: t.text }]}>
              Phone Number
            </Text>
            <View
              style={[
                styles.phoneInputWrapper,
                { backgroundColor: t.cardBg, borderColor: t.border },
              ]}
            >
              <Text style={[styles.phonePrefix, { color: t.tint }]}>+256</Text>
              <TextInput
                style={[styles.phoneInput, { color: t.text }]}
                placeholder="7XX XXX XXX"
                placeholderTextColor={t.textSecondary}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                maxLength={10}
              />
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleSubmit}
            style={[
              styles.submitButton,
              { backgroundColor: (t as any).accent || t.tint },
            ]}
          >
            <Ionicons name="heart" size={20} color="#FFF" />
            <Text style={styles.submitButtonText}>
              Give{" "}
              {amount ? `UGX ${parseInt(amount, 10).toLocaleString()}` : "Now"}
            </Text>
          </TouchableOpacity>

          {/* Secure note */}
          <View style={styles.secureNote}>
            <Ionicons name="lock-closed" size={14} color={t.textSecondary} />
            <Text style={[styles.secureNoteText, { color: t.textSecondary }]}>
              Your transaction is secure and encrypted
            </Text>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
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
  headerTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
  },

  /* Hero */
  heroSection: {
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 20,
  },
  heroIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontFamily: Fonts.extraBold,
    textAlign: "center",
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 13,
    fontFamily: Fonts.italic,
    textAlign: "center",
    lineHeight: 20,
  },

  /* Sections */
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: Fonts.bold,
    marginBottom: 12,
  },

  /* Giving type pills */
  typePills: {
    gap: 8,
  },
  typePill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  typePillText: {
    fontSize: 13,
    fontFamily: Fonts.semiBold,
  },

  /* Amount */
  amountInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    height: 56,
    gap: 8,
  },
  currencyLabel: {
    fontSize: 16,
    fontFamily: Fonts.extraBold,
  },
  amountInput: {
    flex: 1,
    fontSize: 22,
    fontFamily: Fonts.bold,
  },
  presets: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
    flexWrap: "wrap",
  },
  presetButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  presetText: {
    fontSize: 13,
    fontFamily: Fonts.bold,
  },

  /* Payment cards */
  paymentCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
    gap: 14,
  },
  paymentIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  paymentInfo: {
    flex: 1,
  },
  paymentName: {
    fontSize: 15,
    fontFamily: Fonts.bold,
  },
  paymentDesc: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    marginTop: 2,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },

  /* Phone */
  phoneInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    height: 56,
    gap: 8,
  },
  phonePrefix: {
    fontSize: 16,
    fontFamily: Fonts.bold,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: Fonts.semiBold,
  },

  /* Submit */
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    fontSize: 17,
    fontFamily: Fonts.bold,
    color: "#FFF",
  },

  /* Secure */
  secureNote: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 16,
  },
  secureNoteText: {
    fontSize: 12,
    fontFamily: Fonts.medium,
  },
});
