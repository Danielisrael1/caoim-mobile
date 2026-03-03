import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

const ONBOARDING_KEY = "@caoim_onboarding_complete";

/**
 * Manages first-launch onboarding state.
 * Set ALWAYS_SHOW_ONBOARDING to true during development to see it every time.
 */
const ALWAYS_SHOW_ONBOARDING = true; // ← flip to false for production

export function useOnboarding() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    if (ALWAYS_SHOW_ONBOARDING) {
      // Always show onboarding in dev mode
      setIsOnboarded(false);
      setIsLoading(false);
      return;
    }
    AsyncStorage.getItem(ONBOARDING_KEY)
      .then((value) => setIsOnboarded(value === "true"))
      .finally(() => setIsLoading(false));
  }, []);

  const completeOnboarding = useCallback(async () => {
    if (!ALWAYS_SHOW_ONBOARDING) {
      await AsyncStorage.setItem(ONBOARDING_KEY, "true");
    }
    setIsOnboarded(true);
  }, []);

  return { isLoading, isOnboarded, completeOnboarding };
}
