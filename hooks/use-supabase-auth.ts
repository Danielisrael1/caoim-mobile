import { supabase } from "@/services/supabase";
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

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
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
