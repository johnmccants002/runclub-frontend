import { BASE_URL } from "@/constants";
import axios from "@/middleware/axios";
import { useLocalSearchParams, useRouter } from "expo-router"; // For Expo router
import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ImageView from "react-native-image-viewing";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useAuthStore from "@/stores/auth";

const AdminEventDetails: React.FC = () => {
  const params = useLocalSearchParams(); // Get eventId from the URL params
  const [event, setEvent] = useState<any>(null); // Store the event details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [visible, setIsVisible] = useState(false); // Image viewer state
  const [photosUploaded, setPhotosUploaded] = useState(false); // Track if photos are uploaded
  const token = useAuthStore.getState().token; // Get the token from the auth store
  const router = useRouter();

  // Function to mark photos as uploaded
  const markPhotosUploaded = async () => {
    try {
      await axios.post(
        `${BASE_URL}/admin/uploaded/${params.id}`, // The route to mark photos as uploaded
        {}, // No body is needed for this request
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
          },
        }
      );
      setPhotosUploaded(true); // Update state to reflect that photos have been uploaded
    } catch (err) {
      console.error(
        "Error marking photos as uploaded:",
        err.response ? err.response.data : err.message
      );
      Alert.alert("Error", "Could not mark photos as uploaded.");
    }
  };

  useEffect(() => {
    const fetchEventDetails = async () => {
      console.log("FETCHING DETAILS");
      try {
        // Fetch event details from the backend
        const response = await axios.get(`${BASE_URL}/events/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
          },
        });
        setEvent(response.data); // Set event data
        setPhotosUploaded(response.data.photosUploaded); // Initialize photosUploaded state
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Failed to load event details");
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [params.id]); // Fetch event data on component mount and eventId change

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator />
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ backgroundColor: "white" }}
    >
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

        <Text style={styles.date}>Start: {event.startTime}</Text>
        <Text style={styles.date}>End: {event.endTime}</Text>

        <Text style={styles.description}>{event.details}</Text>

        {/* Photo Upload Button */}
        <TouchableOpacity
          style={[
            styles.uploadButton,
            photosUploaded
              ? styles.uploadButtonCompleted
              : styles.uploadButtonActive,
          ]}
          onPress={markPhotosUploaded}
          disabled={photosUploaded}
        >
          <Text style={styles.uploadButtonText}>
            {photosUploaded
              ? "Photo Upload Completed"
              : "Complete Photo Upload"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
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
  uploadButton: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  uploadButtonActive: {
    backgroundColor: "#3b5998",
  },
  uploadButtonCompleted: {
    backgroundColor: "#4CAF50",
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AdminEventDetails;
