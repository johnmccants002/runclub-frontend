import { useEffect, useState, useRef } from "react";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as Device from "expo-device";
import { Platform } from "react-native";
import axios from "axios"; // Axios for API requests
import { BASE_URL } from "@/constants";

export default function usePushNotifications(userId: string) {
  // Pass userId as an argument
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        setExpoPushToken(token);
        if (token) {
          savePushToken(userId, token); // Call the function to save the token in the backend
        }
      })
      .catch((error) => {
        console.error("Failed to register for push notifications:", error);
        setExpoPushToken(null);
      });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification Response:", response);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }

      if (expoPushToken) {
        removePushToken(userId); // Call the function to remove the token from the backend
      }
    };
  }, [expoPushToken]);

  return { expoPushToken, notification };
}

// Function to save push token to backend
async function savePushToken(userId: string, pushToken: string) {
  try {
    await axios.post(`${BASE_URL}/notifications/save-token`, {
      userId,
      pushToken,
    });
    console.log("Push token saved successfully.");
  } catch (error) {
    console.error("Error saving push token:", error);
  }
}

// Function to remove push token from backend
async function removePushToken(userId: string) {
  try {
    await axios.delete(`${BASE_URL}/notifications/remove-token`, {
      data: { userId }, // Pass userId in the request body
    });
    console.log("Push token removed successfully.");
  } catch (error) {
    console.error("Error removing push token:", error);
  }
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    console.log("DEVICE");
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    console.log(existingStatus, "THIS IS THE EXISTING STATUS");
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      console.log("IN HERE");
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      throw new Error(
        "Permission not granted to get push token for push notification!"
      );
    }

    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;

    if (!projectId) {
      throw new Error("Project ID not found");
    }

    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log("Push token:", pushTokenString);
      return pushTokenString;
    } catch (e: unknown) {
      throw new Error(`Failed to get push token: ${e}`);
    }
  } else {
    throw new Error("Must use physical device for push notifications");
  }
}
