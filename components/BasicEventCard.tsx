import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
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
  location: string; // Formatted location address
  lat: number; // Latitude
  lng: number; // Longitude
  startTime: string; // Start time as a timestamp
  endTime: string; // End time as a timestamp
  eventId: string;
}

const BasicEventCard: React.FC<EventCardProps> = ({
  title,
  description,
  imageUrl,
  location,
  lat,
  lng,
  startTime,
  endTime,
  eventId,
}) => {
  const [visible, setIsVisible] = useState(false);
  const router = useRouter();

  return (
    <>
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
    </>
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
});

export default BasicEventCard;
