import React from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import ParallaxScrollView from "../../ParallaxScrollView";
import { useFutureEventsQuery } from "../../../services/events";
import { Event as EventType } from "../../../types/types"; // Adjust path if needed
import EventCard from "../../EventCard"; // Assuming you'll create a new component similar to Announcement

export default function FutureEventsScreen() {
  const { data: futureEvents, isLoading, error } = useFutureEventsQuery();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Failed to load future events</Text>
      </View>
    );
  }

  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={
          <Image
            source={require("@/assets/images/run.jpg")}
            style={styles.headerImage}
          />
        }
      >
        <Text style={styles.sectionTitle}>Upcoming Events</Text>

        <View style={{ marginTop: -80, zIndex: 99 }}>
          {futureEvents?.map((event: EventType) => (
            <View key={event._id} style={styles.eventContainer}>
              <EventCard
                title={event.title}
                description={event.details}
                date={new Date(event.startTime).toLocaleString()}
                imageUrl={event.photo} // Use event.photo or a placeholder image
              />
            </View>
          ))}
        </View>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: 500,
    width: "100%",
    bottom: 0,
    left: 0,
    top: 0,
    position: "absolute",
    zIndex: 1, // Ensures the header image is behind the overlay
  },
  overlay: {
    flex: 1,
    marginTop: -150, // Adjust this value to control the overlap
    backgroundColor: "rgba(240, 240, 240, 0.9)", // Semi-transparent background
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    zIndex: 2, // Ensures the overlay is on top of the header image
    position: "relative",
  },
  scrollViewContent: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
    color: "white",
    position: "absolute",
    top: 80,
    left: 20,
    width: 260,
    zIndex: 99,
  },
  eventContainer: {
    marginBottom: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});
