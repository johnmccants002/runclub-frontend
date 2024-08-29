import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const AboutUsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("@/assets/images/group.jpg")} // Replace with your image URL
        style={styles.image}
      />

      <Text style={styles.title}>About Us</Text>

      <Text style={styles.story}>
        916 Run Club started with a vision to bring together like-minded
        individuals who are passionate about running and community. Our story
        began in [Year] when [Founder's Name] decided to...
      </Text>

      <Text style={styles.sectionTitle}>Our Mission</Text>
      <Text style={styles.sectionContent}>
        To foster a welcoming community that encourages everyone, regardless of
        their running experience, to pursue a healthier lifestyle and form
        lasting connections.
      </Text>

      <Text style={styles.sectionTitle}>Our Values</Text>
      <Text style={styles.sectionContent}>
        - Inclusivity: We welcome everyone. - Health: We promote a healthy
        lifestyle. - Community: We believe in building strong, supportive
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
    backgroundColor: "#ffffff",
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
    color: "#1e90ff", // Electric blue for a vibrant feel
    textAlign: "center",
    marginBottom: 20,
  },
  story: {
    fontSize: 18,
    color: "#555",
    marginBottom: 20,
    lineHeight: 28,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
    color: "#ff6347", // Bright tomato color for section titles
  },
  sectionContent: {
    fontSize: 18,
    color: "#333",
    marginBottom: 20,
    lineHeight: 26,
    textAlign: "center",
  },
  footer: {
    fontSize: 16,
    color: "#aaa",
    marginTop: 30,
    textAlign: "center",
  },
});

export default AboutUsScreen;
