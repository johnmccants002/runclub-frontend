import React from "react";
import { Image, StyleSheet, View, Text, ScrollView } from "react-native";
import ParallaxScrollView from "../../ParallaxScrollView";
import Announcement from "../../Announcement";

const dummyData = [
  {
    id: "1",
    title: "Welcome to the 916 Run Club!",
    description:
      "We are excited to kick off our first run of the season. Join us this Saturday at 8 AM at the City Park!",
    date: "August 22, 2024",
    imageUrl: require("@/assets/images/running.jpg"),
  },
  {
    id: "2",
    title: "Running Tips for Beginners",
    description:
      "Check out our latest blog post with tips for those new to running. Let's get you started on the right foot!",
    date: "August 20, 2024",
  },
  {
    id: "3",
    title: "Weekly Challenge: 5K",
    description:
      "This week's challenge is to complete a 5K. Post your results on our social media with the hashtag #916RunClub!",
    date: "August 18, 2024",
    imageUrl: require("@/assets/images/grouprun.jpg"),
  },
];

export default function HomeScreen() {
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
          {dummyData.map((item) => (
            <View key={item.id} style={styles.announcementContainer}>
              <Announcement
                title={item.title}
                description={item.description}
                date={item.date}
                imageUrl={item.imageUrl}
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
});
