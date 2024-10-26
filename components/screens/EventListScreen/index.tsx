import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons"; // For the chevron right arrow
import { useRouter } from "expo-router";
import { BASE_URL } from "@/constants";
import useAuthStore from "@/stores/auth";

const EventListScreen = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const token = useAuthStore.getState().token; // Get the token from the auth store

  useEffect(() => {
    // Fetch events on component mount
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/events/list`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(response.data); // Set the events in the state
      } catch (error) {
        console.error("Error fetching events", error);
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchEvents();
  }, []);

  // Format the event date to Month Day, Year
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long", // Full month name
      day: "numeric", // Day of the month
      year: "numeric", // Full year
    });
  };

  // Render individual event row
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => router.push(`/(tabs)/about/gallery/${item._id}`)} // Navigate to details on press
    >
      <View style={styles.eventInfo}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{formatDate(item.startTime)}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="black" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading events...</Text>
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item._id}
          style={{ backgroundColor: "white" }}
          contentContainerStyle={{ backgroundColor: "white" }}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text>No Photos yet. We'll let you know when we upload some</Text>
          } // Handle empty list
        />
      )}
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "white",
  },
  eventInfo: {
    flexDirection: "column",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  date: {
    fontSize: 16,
    color: "#555",
  },
});

export default EventListScreen;
