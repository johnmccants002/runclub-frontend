import React from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ContactUsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Instagram:</Text>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://instagram.com/916RunClub")}
        >
          <Text style={styles.link}>@916RunClub</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <TouchableOpacity
          onPress={() => Linking.openURL("mailto:info@916runclub.com")}
        >
          <Text style={styles.link}>info@916runclub.com</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>
        © 2024 916 Run Club. All rights reserved.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white", // Dark modern background
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff", // White text for title
    marginBottom: 30,
    textAlign: "center",
  },
  infoContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#aaaaaa", // Light grey for labels
    marginBottom: 8,
  },
  link: {
    fontSize: 18,
    color: "#1e90ff", // Modern blue color for links
  },
  footer: {
    fontSize: 14,
    color: "#666666", // Dark grey for footer text
    marginTop: 40,
    textAlign: "center",
  },
});

export default ContactUsScreen;
