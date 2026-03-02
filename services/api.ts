// Example API Service for Church App
// This file demonstrates how to replace mock data with real API calls

import { Event, LiveStream, Update } from "@/constants/church-data";

// Configure your API endpoint here
const API_BASE_URL = "https://your-church-api.com/api";

/**
 * Updates Service
 */
export const updateService = {
  // Fetch all updates
  getAll: async (): Promise<Update[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/updates`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching updates:", error);
      throw error;
    }
  },

  // Fetch updates by category
  getByCategory: async (category: string): Promise<Update[]> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/updates?category=${category}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching updates by category:", error);
      throw error;
    }
  },

  // Fetch single update
  getById: async (id: string): Promise<Update | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/updates/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching update:", error);
      return null;
    }
  },

  // Create new update (admin)
  create: async (update: Omit<Update, "id">): Promise<Update> => {
    try {
      const response = await fetch(`${API_BASE_URL}/updates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getAuthToken()}`,
        },
        body: JSON.stringify(update),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating update:", error);
      throw error;
    }
  },
};

/**
 * Events Service
 */
export const eventService = {
  // Fetch all events
  getAll: async (): Promise<Event[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/events`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  },

  // Fetch events by category
  getByCategory: async (category: string): Promise<Event[]> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/events?category=${category}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching events by category:", error);
      throw error;
    }
  },

  // Fetch upcoming events
  getUpcoming: async (): Promise<Event[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/events?upcoming=true`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching upcoming events:", error);
      throw error;
    }
  },

  // Register for event
  register: async (
    eventId: string,
    userId: string,
  ): Promise<{ success: boolean }> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/events/${eventId}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getAuthToken()}`,
          },
          body: JSON.stringify({ userId }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error registering for event:", error);
      throw error;
    }
  },

  // Unregister from event
  unregister: async (
    eventId: string,
    userId: string,
  ): Promise<{ success: boolean }> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/events/${eventId}/unregister`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getAuthToken()}`,
          },
          body: JSON.stringify({ userId }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error unregistering from event:", error);
      throw error;
    }
  },
};

/**
 * Live Stream Service
 */
export const liveStreamService = {
  // Fetch all streams
  getAll: async (): Promise<LiveStream[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/live-streams`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching live streams:", error);
      throw error;
    }
  },

  // Fetch active/live streams
  getLive: async (): Promise<LiveStream[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/live-streams?live=true`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching live streams:", error);
      throw error;
    }
  },

  // Get stream details and viewer count
  getById: async (id: string): Promise<LiveStream | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/live-streams/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching stream:", error);
      return null;
    }
  },

  // Get stream URL for playback
  getStreamUrl: async (streamId: string): Promise<string> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/live-streams/${streamId}/url`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getAuthToken()}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("Error fetching stream URL:", error);
      throw error;
    }
  },
};

/**
 * Notification Service
 */
export const notificationService = {
  // Subscribe to notifications
  subscribe: async (
    userId: string,
    topics: string[],
  ): Promise<{ success: boolean }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/notifications/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getAuthToken()}`,
        },
        body: JSON.stringify({ userId, topics }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error subscribing to notifications:", error);
      throw error;
    }
  },

  // Unsubscribe from notifications
  unsubscribe: async (
    userId: string,
    topics: string[],
  ): Promise<{ success: boolean }> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/notifications/unsubscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getAuthToken()}`,
          },
          body: JSON.stringify({ userId, topics }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error unsubscribing from notifications:", error);
      throw error;
    }
  },

  // Send test notification
  sendTestNotification: async (
    userId: string,
  ): Promise<{ success: boolean }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/notifications/test`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getAuthToken()}`,
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error sending test notification:", error);
      throw error;
    }
  },
};

/**
 * Authentication Helper
 */
async function getAuthToken(): Promise<string> {
  // Replace with your actual token retrieval logic
  // This could be from AsyncStorage, Secure Store, etc.
  return "your-auth-token";
}

/**
 * Error Handler
 */
export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
};

/**
 * Example Usage in Components
 */

// In a Screen Component:
/*
import { useEffect, useState } from 'react';
import { updateService, eventService } from '@/services/api';
import { Update, Event } from '@/constants/church-data';

export default function UpdatesScreen() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        setLoading(true);
        const data = await updateService.getAll();
        setUpdates(data);
      } catch (err) {
        setError(handleApiError(err));
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <ScrollView>
      {updates.map(update => (
        <UpdateCard key={update.id} update={update} />
      ))}
    </ScrollView>
  );
}
*/

export default {
  updateService,
  eventService,
  liveStreamService,
  notificationService,
  handleApiError,
};
