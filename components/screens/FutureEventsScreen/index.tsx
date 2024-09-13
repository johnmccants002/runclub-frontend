import React from "react";
import { Image, StyleSheet, View, Text, ActivityIndicator } from "react-native";
import ParallaxScrollView from "../../ParallaxScrollView";
import {
  useAllRsvpsQuery,
  useCreateRsvpMutation,
} from "../../../services/rsvps";
import { useFutureEventsQuery } from "@/services/events";
import { Event as EventType } from "../../../types/types"; // Adjust path if needed
import EventCard from "../../EventCard"; // Assuming you'll create a new component similar to Announcement
import useAuthStore from "@/stores/auth";

export default function FutureEventsScreen() {
  const {
    data: futureEvents,
    isLoading: eventsLoading,
    error,
  } = useFutureEventsQuery();
  const { data: allRsvps, isLoading: rsvpsLoading } = useAllRsvpsQuery(); // Fetch all RSVPs at once
  const user = useAuthStore((state) => state.user);

  // Mutation to RSVP for an event
  const { mutate: createRsvp, status } = useCreateRsvpMutation();

  const rsvpLoading = status === "pending";

  if (eventsLoading || rsvpsLoading || rsvpLoading) {
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

  const handleRsvp = (eventId: string, userId: string) => {
    // Call the RSVP mutation
    createRsvp(
      { userId, eventId },
      {
        onSuccess: () => {
          console.log(`RSVP successful for event ${eventId}`);
          // Optionally, refetch RSVPs or show a success message
        },
        onError: (error) => {
          console.error(`Failed to RSVP for event ${eventId}:`, error);
        },
      }
    );
  };

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
          {futureEvents?.map((event: EventType) => {
            // Find if the user has RSVP'd to this event
            const isRsvp = !!allRsvps?.find(
              (rsvp) => rsvp.eventId === event._id
            );

            return (
              <View key={event._id} style={styles.eventContainer}>
                <EventCard
                  title={event.title}
                  description={event.details}
                  imageUrl={event.photo || "https://via.placeholder.com/200"}
                  location={event.location.formatted_address}
                  lat={event.location.lat}
                  lng={event.location.lng}
                  startTime={event.startTime}
                  endTime={event.endTime}
                  isRsvp={isRsvp} // Pass whether the user has RSVP'd
                  rsvpLoading={rsvpLoading} // Show loading while fetching RSVPs
                  onRSVP={() => handleRsvp(event._id, user?.userId)} // Replace "currentUserId" with the actual user ID
                />
              </View>
            );
          })}
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
    zIndex: 1,
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
