import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router"; // For Expo router
import { showLocation } from "react-native-map-link";
import ImageView from "react-native-image-viewing";
import axios from "@/middleware/axios";
import { BASE_URL } from "@/constants";
import useAuthStore from "@/stores/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const EventDetailsScreen: React.FC = () => {
  const params = useLocalSearchParams(); // Get eventId from the URL params
  const [event, setEvent] = useState<any>(null); // Store the event details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [visible, setIsVisible] = useState(false); // Image viewer state
  const token = useAuthStore.getState().token; // Get the token from the auth store
  const router = useRouter();
  const [rsvp, setRsvp] = useState(false);

  const currentUser = useAuthStore((state) => state.user);

  const fetchUserRsvp = async () => {
    console.log("FETCHING User RSVP");
    try {
      // Fetch event details from the backend
      const response = await axios.get(
        `${BASE_URL}/rsvps/${params.id}/user/${currentUser.userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
          },
        }
      );
      console.log("THIS IS THE EVENT DETAILS", response.data);
      setRsvp(true);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setRsvp(false);
    }
  };

  const rsvpToEvent = async () => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/rsvps`,
        {
          userId: currentUser.userId,
          eventId: params.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
          },
        }
      );
      setRsvp(true);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Failed to load event details");
      setLoading(false);
      setRsvp(false);
    }
  };

  const unrsvpToEvent = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/rsvps/${params.id}/${currentUser.userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
            "Content-Type": "application/json",
          },
        }
      );

      setRsvp(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(JSON.stringify(params));
    console.log(token, "USER TOKEN");
    const fetchEventDetails = async () => {
      console.log("FETCHING DETAILS");
      try {
        // Fetch event details from the backend
        const response = await axios.get(`${BASE_URL}/events/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
          },
        });
        console.log("THIS IS THE EVENT DETAILS", response.data);
        setEvent(response.data); // Set event data
        setLoading(false);
        fetchUserRsvp();
      } catch (err) {
        console.log(err);
        setError("Failed to load event details");
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [params.id, rsvp]); // Fetch event data on component mount and eventId change

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading event details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Image Viewer */}

      {visible ? (
        <ImageView
          images={[{ uri: event.photo }]}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />
      ) : (
        <TouchableOpacity onPress={() => setIsVisible(true)}>
          <Image source={{ uri: event.photo }} style={styles.image} />
        </TouchableOpacity>
      )}
      <Pressable
        style={{
          position: "absolute",
          left: 20,
          top: 40,
          width: 40,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => router.back()}
      >
        <MaterialCommunityIcons name="chevron-left" size={40} color={"white"} />
      </Pressable>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{event.title}</Text>

        <TouchableOpacity
          onPress={() =>
            showLocation({
              latitude: event.location.lat,
              longitude: event.location.lng,
              title: event.location.name,
            })
          }
        >
          <Text style={styles.location}>{event.location.name}</Text>
        </TouchableOpacity>

        <Text style={styles.date}>
          Start: {new Date(event.startTime).toLocaleString()}
        </Text>
        <Text style={styles.date}>
          End: {new Date(event.endTime).toLocaleString()}
        </Text>

        <Text style={styles.description}>{event.details}</Text>

        {/* RSVP Button */}
        <TouchableOpacity
          style={[
            styles.rsvpButton,
            rsvp ? styles.rsvpButtonActive : styles.rsvpButtonInactive,
          ]}
          onPress={() => {
            if (rsvp) {
              unrsvpToEvent();
            } else {
              rsvpToEvent();
            }
          }}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.rsvpButtonText}>
              {rsvp ? "RSVP'd" : "RSVP"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  location: {
    fontSize: 18,
    color: "#1a73e8",
    textDecorationLine: "underline",
    marginBottom: 15,
  },
  date: {
    fontSize: 16,
    color: "#888",
    marginBottom: 5,
  },
  description: {
    fontSize: 18,
    color: "#555",
    marginVertical: 15,
  },
  rsvpButton: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  rsvpButtonActive: {
    backgroundColor: "#4CAF50",
  },
  rsvpButtonInactive: {
    backgroundColor: "#3b5998",
  },
  rsvpButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default EventDetailsScreen;
