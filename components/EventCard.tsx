import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ImageView from "react-native-image-viewing";
import { showLocation } from "react-native-map-link";
// Utility function to format the date
import axios from "@/middleware/axios";
import { BASE_URL } from "@/constants";
import useAuthStore from "@/stores/auth";

interface EventCardProps {
  title: string;
  description: string;
  imageUrl: string;
  onRSVP: (
    eventId: string,
    userId: string,
    isRsvp: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) => void; // Function to handle RSVP
  location: string; // Formatted location address
  lat: number; // Latitude
  lng: number; // Longitude
  startTime: string; // Start time as a timestamp
  endTime: string; // End time as a timestamp
  isRsvp: boolean; // Indicate whether the user has RSVP'd
  rsvpLoading: boolean; // Loading state for RSVP action
  eventId: string;
  userId: string;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  description,
  imageUrl,
  onRSVP,
  location,
  lat,
  lng,
  startTime,
  endTime,
  isRsvp,
  rsvpLoading,
  userId,
  eventId,
}) => {
  const [visible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const token = useAuthStore.getState().token; // Get the token from the auth store
  const user = useAuthStore.getState().user;

  const reportPost = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/events/report`,
        { eventId: eventId, userId: user.userId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      // if (response.ok) {
      //   Alert.alert("Report Submitted", "Thank you for reporting the event.");
      // } else {
      //   Alert.alert("Error", data.message || "Unable to report the event.");
      // }
    } catch (error) {
      console.error("Error reporting event:", error);
      Alert.alert("Error", "Something went wrong while reporting the event.");
    } finally {
    }
  };

  const confirmReport = () => {
    Alert.alert(
      "Report Event",
      "Are you sure you want to report this event?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: reportPost, // Call reportPost if user confirms
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <Pressable
      style={styles.card}
      onPress={() => router.push(`/events/${eventId}`)}
    >
      {visible ? (
        <ImageView
          images={[{ uri: imageUrl }]}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />
      ) : (
        <TouchableOpacity onPress={() => setIsVisible(true)}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </TouchableOpacity>
      )}
      <View>
        <Text style={styles.title}>{title}</Text>
        <Pressable
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            right: 8,
            top: 4,
            height: 30,
            width: 30,
          }}
          onPress={confirmReport}
        >
          <Entypo name="dots-three-horizontal" size={20} color={"lightgray"} />
        </Pressable>
      </View>
      <TouchableOpacity
        onPress={() =>
          showLocation({
            latitude: lat,
            longitude: lng,
            title: location,
          })
        }
      >
        <Text style={styles.location}>{location}</Text>
      </TouchableOpacity>

      <Text style={styles.date}>Start: {startTime}</Text>
      <Text style={styles.date}>End: {endTime}</Text>

      <Text style={styles.description}>{description}</Text>

      {/* RSVP Button */}
      <TouchableOpacity
        style={[
          styles.rsvpButton,
          isRsvp ? styles.rsvpButtonActive : styles.rsvpButtonInactive,
        ]}
        onPress={() => onRSVP(eventId, userId, isRsvp, setLoading)}
        disabled={rsvpLoading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.rsvpButtonText}>
            {isRsvp ? "RSVP'd" : "RSVP"}
          </Text>
        )}
      </TouchableOpacity>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
  },
  location: {
    fontSize: 16,
    color: "#1a73e8", // Make location text blue to indicate it's tappable
    marginBottom: 5,
    textDecorationLine: "underline", // Add underline for a link-like feel
  },
  date: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: "#444",
  },
  rsvpButton: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  rsvpButtonActive: {
    backgroundColor: "#4CAF50", // Green color for RSVP'd
  },
  rsvpButtonInactive: {
    backgroundColor: "#3b5998", // Default Facebook-like blue color for RSVP
  },
  rsvpButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EventCard;
