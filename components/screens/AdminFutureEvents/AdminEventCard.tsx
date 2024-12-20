import { BASE_URL } from "@/constants";
import axiosInstance from "@/middleware/axios";
import useAuthStore from "@/stores/auth";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
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
  onDeleteEvent: () => void;
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
  onDeleteEvent,
}) => {
  const [visible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = useMemo(() => useAuthStore.getState().token, []);
  const [photosUploaded, setPhotosUploaded] = useState(false);

  const [rsvps, setRsvps] = useState([]);
  const router = useRouter();

  const fetchRSVPs = async () => {
    setLoading(true);

    try {
      const { data } = await axiosInstance.get(`${BASE_URL}/rsvps/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRsvps(data.rsvps);
      console.log("RSVPS", JSON.stringify(rsvps));
    } catch (err) {
      console.log("ERROR FETCHING RSVPS: ", err);
    } finally {
      setLoading(false);
    }
  };

  const markPhotosUploaded = async (eventId, token) => {
    try {
      const response = await axiosInstance.post(
        `/admin/uploaded/${eventId}`, // The route to mark photos as uploaded
        {}, // No body is needed for this request
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the Bearer token for authorization
          },
        }
      );

      console.log("Photos uploaded status updated:", response.data);
    } catch (err) {
      console.error(
        "Error marking photos as uploaded:",
        err.response ? err.response.data : err.message
      );
    }
  };

  useEffect(() => {
    // Wrap the fetchRSVPs call in an async function
    const loadRSVPs = async () => {
      await fetchRSVPs();
    };

    loadRSVPs(); // Call the function when the component mounts
  }, [eventId, token]); // Add eventId and token as dependencies

  const confirmDeletePost = () => {
    Alert.alert(
      "Report Event",
      "Are you sure you want to delete this event?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: onDeleteEvent, // Call reportPost if user confirms
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <Pressable
      style={styles.card}
      onPress={() => router.push(`/admin/events/${eventId}`)}
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
          onPress={confirmDeletePost}
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
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          flexDirection: "row",
          paddingHorizontal: 20,
        }}
      >
        <Pressable
          style={{ justifyContent: "center", alignItems: "center" }}
          onPress={() => router.push(`/admin/rsvps/${eventId}`)}
        >
          <Text
            style={{
              fontSize: 14,
              color: "blue",
              fontWeight: "semibold",
            }}
          >
            {rsvps.length > 0 ? `${rsvps.length} RSVPs` : <></>}
          </Text>
        </Pressable>
      </View>
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
