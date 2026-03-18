import { useSupabaseAuth } from "@/hooks/use-supabase-auth";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  isLoggedIn: boolean;
}

/**
 * Mock user hook for testing.
 * Replace with real auth (Firebase, etc.) later.
 */
export function useUser() {
  const { user: sbUser, isLoading } = useSupabaseAuth();

  const greeting = getGreeting();

  const meta = (sbUser?.user_metadata ?? {}) as Record<string, any>;
  const fullName =
    (meta.full_name as string | undefined) ||
    (meta.name as string | undefined) ||
    (meta.display_name as string | undefined);

  const firstName = fullName?.split(" ").filter(Boolean)[0];
  const email = sbUser?.email ?? "";

  return {
    user: sbUser
      ? {
          id: sbUser.id,
          firstName: firstName ?? "",
          lastName: "",
          email,
          avatar: meta.avatar_url as string | undefined,
          isLoggedIn: true,
        }
      : {
          id: "",
          firstName: "",
          lastName: "",
          email: "",
          isLoggedIn: false,
        },
    greeting,
    displayName: sbUser ? (firstName ?? fullName ?? email ?? "User") : "Guest",
    isLoading,
  };
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}
