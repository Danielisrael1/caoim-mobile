import { isSupabaseConfigured, supabase } from "@/services/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type UserProfile = {
  id: string;
  email?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
};

type UserState = {
  user: UserProfile;
  displayName: string;
  greeting: string;
  isLoggedIn: boolean;
  isLoading: boolean;
  refreshLocalProfile: () => Promise<void>;
};

const UserContext = createContext<UserState | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null);
  const [localProfile, setLocalProfile] = useState<{
    full_name?: string;
    avatar_url?: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Subscribe to auth changes
  useEffect(() => {
    if (!isSupabaseConfigured) {
      setIsLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSupabaseUser(session?.user ?? null);
      if (!session) setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSupabaseUser(session?.user ?? null);
      if (!session) {
        setLocalProfile(null);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch local AsyncStorage profile whenever user changes or we trigger a refresh
  useEffect(() => {
    if (!supabaseUser) return;

    const fetchLocal = async () => {
      try {
        const json = await AsyncStorage.getItem(`user_profile_${supabaseUser.id}`);
        if (json) {
          setLocalProfile(JSON.parse(json));
        } else {
            setLocalProfile(null);
        }
      } catch (e) {
        console.error("Failed to load local profile:", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocal();
  }, [supabaseUser, refreshKey]);

  const refreshLocalProfile = async () => {
    setRefreshKey((prev) => prev + 1);
  };

  const userObject: UserProfile = useMemo(() => {
    if (!supabaseUser) return { id: "" };

    const metadata = supabaseUser.user_metadata || {};
    // Priority: AsyncStorage > Supabase Metadata
    const fullName = localProfile?.full_name || metadata.full_name || "";
    const avatar = localProfile?.avatar_url || metadata.avatar_url;

    const names = fullName.split(" ");
    const firstName = names[0] || "";
    const lastName = names.length > 1 ? names[names.length - 1] : "";

    return {
      id: supabaseUser.id,
      email: supabaseUser.email,
      fullName,
      firstName,
      lastName,
      avatar,
    };
  }, [supabaseUser, localProfile]);

  const displayName = userObject.fullName || userObject.email || "User";

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  }, []);

  const value = {
    user: userObject,
    displayName,
    greeting,
    isLoggedIn: !!supabaseUser,
    isLoading,
    refreshLocalProfile,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
