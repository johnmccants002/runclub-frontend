import React from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  ImageSourcePropType,
} from "react-native";
import ParallaxScrollView from "../../ParallaxScrollView";
import Announcement from "../../Announcement";
import { useAnnouncementsQuery } from "../../../services/announcements";
import { Announcement as AnnouncementType } from "../../../types/types";

export default function HomeScreen() {
  const { data: announcements, isLoading, error } = useAnnouncementsQuery();

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
        <Text style={styles.errorText}>Failed to load announcements</Text>
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
        <Text style={styles.sectionTitle}>Announcements</Text>

        <View style={{ marginTop: -80, zIndex: 99 }}>
          {announcements?.map((item: AnnouncementType) => (
            <View key={item._id} style={styles.announcementContainer}>
              <Announcement
                title={item.title}
                description={item.content}
                date={item.createdAt}
                imageUrl={item.imageUrl as ImageSourcePropType}
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
  announcementContainer: {
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
