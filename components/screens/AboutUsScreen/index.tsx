import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const AboutUsScreen = () => {
  return (
    <ScrollView
      style={{ backgroundColor: "white" }}
      contentContainerStyle={styles.container}
    >
      <Image
        source={require("@/assets/images/group.jpg")} // Replace with your image URL
        style={styles.image}
      />

      <Text style={styles.title}>About Us</Text>

      <Text style={styles.story}>
        916 Run Club was founded by Cory Peters, a Sacramento native, who was
        inspired to bring the community together through fitness. Inclusiveness
        is what we pride ourselves on; anyone, regardless of how good you are at
        running, is invited. Starting in early 2024, we’ve grown into something
        bigger, and we’re here to stay for many more years to come.
      </Text>

      <Text style={styles.sectionTitle}>Our Mission</Text>
      <Text style={styles.sectionContent}>
        To foster a welcoming community that encourages everyone, regardless of
        their running experience, to pursue a healthier lifestyle and form
        lasting connections.
      </Text>

      <Text style={styles.sectionTitle}>Our Values</Text>
      <Text style={styles.sectionContent}>
        - Inclusivity: We welcome everyone.{"\n"}- Health: We promote a healthy
        lifestyle.{"\n"}- Community: We believe in building strong, supportive
        relationships.
      </Text>

      <Text style={styles.footer}>
        © 2024 916 Run Club. All rights reserved.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 120,
    padding: 20,
    backgroundColor: "#ffffff", // White background
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333333", // Dark grey for a modern feel
    textAlign: "center",
    marginBottom: 20,
  },
  story: {
    fontSize: 18,
    color: "#555555", // Medium grey for readability
    marginBottom: 20,
    lineHeight: 28,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
    color: "#444444", // Darker grey for section titles
  },
  sectionContent: {
    fontSize: 18,
    color: "#666666", // Lighter grey for content
    marginBottom: 20,
    lineHeight: 26,
    textAlign: "center",
  },
  footer: {
    fontSize: 16,
    color: "#999999", // Light grey for the footer
    marginTop: 30,
    textAlign: "center",
  },
});

export default AboutUsScreen;
