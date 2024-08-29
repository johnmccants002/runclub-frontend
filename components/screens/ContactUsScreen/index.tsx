import FadingImages from "@/components/animated/FadingImages";
import React from "react";
import {
  View,
  Text,
  Linking,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Colors, palette } from "@/constants/Colors";
const ContactUsScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: palette.offWhite,
        padding: 20,
        justifyContent: "space-evenly",
      }}
    >
      <View style={{ marginTop: 40 }}>
        <FadingImages />
      </View>
      <View>
        <View style={{ gap: 8 }}>
          <Text style={styles.label}>Instagram:</Text>
          <TouchableOpacity
            onPress={() => Linking.openURL("https://instagram.com/916RunClub")}
          >
            <Text style={styles.link}>@916RunClub</Text>
          </TouchableOpacity>
        </View>

        <View style={{ gap: 8 }}>
          <Text style={styles.label}>Email:</Text>
          <TouchableOpacity
            onPress={() => Linking.openURL("mailto:info@916runclub.com")}
          >
            <Text style={styles.link}>info@916runclub.com</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Add other sections like phone, address, etc. */}

      <Text style={styles.footer}>
        © 2024 916 Run Club. All rights reserved.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  label: {
    fontSize: 18,
    color: "#555",
    marginBottom: 5,
  },
  link: {
    fontSize: 20,
    color: "#1e90ff",
    marginBottom: 20,
  },
  footer: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 30,
    textAlign: "center",
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
  },
});

export default ContactUsScreen;
