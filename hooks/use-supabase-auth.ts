import { isSupabaseConfigured, supabase } from "@/services/supabase";
import type { Session, User } from "@supabase/supabase-js";
import { useEffect, useMemo, useState } from "react";

export type SupabaseAuthState = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
};

export function useSupabaseAuth(): SupabaseAuthState {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If Supabase isn't configured for this build, don't attempt to call it.
    // (The Proxy would throw and can crash in production builds.)
    if (!isSupabaseConfigured) {
      setSession(null);
      setIsLoading(false);
      return;
    }

    let mounted = true;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!mounted) return;
        setSession(data.session ?? null);
      })
      .finally(() => {
        if (!mounted) return;
        setIsLoading(false);
      });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        setSession(nextSession);
      },
    );

    return () => {
      mounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const user = session?.user ?? null;
  const isLoggedIn = !!user;

  return useMemo(
    () => ({
      session,
      user,
      isLoading,
      isLoggedIn,
    }),
    [session, user, isLoading, isLoggedIn],
  );
}
