import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

const ONBOARDING_KEY = "@caoim_onboarding_complete";

/**
 * Manages first-launch onboarding state.
 * Returns { isLoading, isOnboarded, completeOnboarding }.
 */
export function useOnboarding() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(ONBOARDING_KEY)
      .then((value) => setIsOnboarded(value === "true"))
      .finally(() => setIsLoading(false));
  }, []);

  const completeOnboarding = useCallback(async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, "true");
    setIsOnboarded(true);
  }, []);

  return { isLoading, isOnboarded, completeOnboarding };
}
