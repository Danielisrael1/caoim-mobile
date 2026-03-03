import { useState } from "react";

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
  const [user] = useState<User>({
    id: "1",
    firstName: "Daniel",
    lastName: "Israel",
    email: "daniel@caoimchurch.org",
    isLoggedIn: true,
  });

  const greeting = getGreeting();

  return {
    user,
    greeting,
    displayName: user.isLoggedIn ? user.firstName : "Guest",
  };
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}
