import usePushNotifications from "@/hooks/usePushNotifications";
import {
  useDeleteEventMutation,
  useFutureEventsQuery,
  useAllEventsQuery,
} from "@/services/events";
import { useUserQuery } from "@/services/user";
import useAuthStore from "@/stores/auth";
import React, { Dispatch, SetStateAction } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import {
  useAllRsvpsQuery,
  useCreateRsvpMutation,
  useDeleteRsvpMutation,
} from "../../../services/rsvps";
import { Event as EventType } from "../../../types/types"; // Adjust path if needed
import ParallaxScrollView from "../../ParallaxScrollView";
import SkeletonEventCard from "../FutureEventsScreen/skeleton";
import AdminEventCard from "./AdminEventCard"; // Assuming you'll create a new component similar to Announcement

export default function FutureEventsScreen() {
  const {
    data: futureEvents,
    isLoading: eventsLoading,
    error,
  } = useAllEventsQuery();
  const { data: allRsvps, isLoading: rsvpsLoading } = useAllRsvpsQuery(); // Fetch all RSVPs at once
  const currentUser = useAuthStore((state) => state.user);

  const {
    data: user,
    error: err,
    isLoading,
  } = useUserQuery(currentUser?.userId);

  // Mutation to RSVP for an event
  const { mutate: createRsvp, status: createStatus } = useCreateRsvpMutation();
  const { mutate: deleteRsvp, status: deleteStatus } = useDeleteRsvpMutation();
  const { mutate: deleteEvent, status: deleteEventStatus } =
    useDeleteEventMutation();

  const { expoPushToken, notification } = usePushNotifications(user?._id);

  const rsvpLoading = createStatus === "pending" || deleteStatus === "pending";

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <Image
          source={require("@/assets/images/middle.png")}
          resizeMode="contain"
          style={{ width: 300, height: 300 }}
        />
        <View
          style={{ gap: 20, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 24, fontFamily: "helvetica" }}>
            No Events. Go create one
          </Text>
        </View>
      </View>
    );
  }

  // Function to handle RSVP
  const handleRsvp = (
    eventId: string,
    userId: string,
    isRsvp: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) => {
    console.log("HANDLING RSVP");
    setLoading(true);
    if (isRsvp) {
      // Call the delete RSVP mutation
      deleteRsvp(
        { userId, eventId },
        {
          onSuccess: () => {
            console.log(`RSVP removed for event ${eventId}`);
            // Optionally, refetch RSVPs or show a success message
          },
          onError: (error) => {
            console.error(`Failed to remove RSVP for event ${eventId}:`, error);
          },
        }
      );
    } else {
      // Call the create RSVP mutation
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
    }
    setLoading(false);
  };

  // Function to handle event deletion (for admins)
  const handleDeleteEvent = (eventId: string) => {
    deleteEvent(eventId, {
      onSuccess: () => {
        console.log(`Event ${eventId} deleted successfully`);
        // Optionally, refetch events or show a success message
      },
      onError: (error) => {
        console.error(`Failed to delete event ${eventId}:`, error);
      },
    });
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
        <Text style={styles.sectionTitle}>916 Run Club Events</Text>

        <View style={{ marginTop: -80, zIndex: 99 }}>
          {eventsLoading ? (
            <View>
              <SkeletonEventCard />
              <SkeletonEventCard />
            </View>
          ) : (
            <>
              {futureEvents?.map((event: EventType) => {
                // Find if the user has RSVP'd to this event
                const isRsvp = !!allRsvps?.find(
                  (rsvp) => rsvp.eventId === event._id
                );
                console.log(
                  JSON.stringify(event),
                  "THIS IS THE EVENT ____________"
                );

                return (
                  <View key={event._id} style={styles.eventContainer}>
                    <AdminEventCard
                      title={event.title}
                      description={event.details}
                      imageUrl={
                        event.photo || "https://via.placeholder.com/200"
                      }
                      location={event.location.formatted_address}
                      lat={event.location.lat}
                      lng={event.location.lng}
                      startTime={event.startTime}
                      endTime={event.endTime}
                      isRsvp={isRsvp} // Pass whether the user has RSVP'd
                      rsvpLoading={rsvpLoading} // Show loading while fetching RSVPs
                      eventId={event._id}
                      userId={user?.userId}
                      onRSVP={handleRsvp}
                      onDeleteEvent={() => handleDeleteEvent(event._id)} // Pass delete handler to the card
                    />
                  </View>
                );
              })}
            </>
          )}
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
