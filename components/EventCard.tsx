import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { showLocation } from "react-native-map-link";
import ImageView from "react-native-image-viewing";

// Utility function to format the date
const formatDate = (timestamp: string) => {
  const date = new Date(Number(timestamp));
  return date.toLocaleString(); // Adjust this as needed for your date format
};

interface EventCardProps {
  title: string;
  description: string;
  imageUrl: string;
  onRSVP: () => void; // Function to handle RSVP
  location: string; // Formatted location address
  lat: number; // Latitude
  lng: number; // Longitude
  startTime: string; // Start time as a timestamp
  endTime: string; // End time as a timestamp
  isRsvp: boolean; // Indicate whether the user has RSVP'd
  rsvpLoading: boolean; // Loading state for RSVP action
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
}) => {
  const [visible, setIsVisible] = useState(false);

  return (
    <View style={styles.card}>
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
      <Text style={styles.title}>{title}</Text>

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

      <Text style={styles.date}>Start: {formatDate(startTime)}</Text>
      <Text style={styles.date}>End: {formatDate(endTime)}</Text>

      <Text style={styles.description}>{description}</Text>

      {/* RSVP Button */}
      <TouchableOpacity
        style={[
          styles.rsvpButton,
          isRsvp ? styles.rsvpButtonActive : styles.rsvpButtonInactive,
        ]}
        onPress={onRSVP}
        disabled={rsvpLoading}
      >
        {rsvpLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.rsvpButtonText}>
            {isRsvp ? "RSVP'd" : "RSVP"}
          </Text>
        )}
      </TouchableOpacity>
    </View>
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
