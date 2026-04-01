import { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

// This determines how notifications look when they show up while the app is open
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

import { supabase } from '@/services/supabase';

export function usePushNotifications(userId?: string) {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>();
  const [notification, setNotification] = useState<Notifications.Notification | undefined>();
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('User interacted with notification:', response);
    });

    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove();
      }
      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, []);

  // Sync token to Supabase when we have both a user ID and a token
  useEffect(() => {
    if (expoPushToken && userId) {
      syncTokenToSupabase(userId, expoPushToken);
    }
  }, [expoPushToken, userId]);

  async function syncTokenToSupabase(id: string, token: string) {
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({ id, push_token: token });

      if (error) {
        console.error('Error syncing push token to Supabase:', error);
      } else {
        console.log('Push token successfully synced to Supabase for user:', id);
      }
    } catch (err) {
      console.error('Unexpected error syncing push token:', err);
    }
  }

  return { expoPushToken, notification };
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
    }
    
    // Explicit project ID fetching for EAS builds
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      
    try {
      token = (await Notifications.getExpoPushTokenAsync({
        projectId,
      })).data;
      console.log('Expo Push Token generated (use this in dashboard): ', token);
    } catch (e) {
      console.log('Error getting token:', e);
    }
  } else {
    console.log('Must use a physical device for Push Notifications');
  }

  return token;
}
