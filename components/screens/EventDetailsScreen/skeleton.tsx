import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Skeleton } from "moti/skeleton";

import { StyleSheet, View, Dimensions, Pressable } from "react-native";

const SkeletonDetailsScreen = ({ onBackPressed }) => {
  const width = Dimensions.get("screen").width;

  return (
    <View style={styles.container}>
      <Pressable
        style={{
          position: "absolute",
          left: 20,
          top: 40,
          width: 40,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2,
        }}
        onPress={onBackPressed}
      >
        <MaterialCommunityIcons name="chevron-left" size={40} color={"white"} />
      </Pressable>
      <Skeleton
        width={width}
        height={250}
        radius={"square"}
        colorMode="light"
      />

      <View style={styles.detailsContainer}>
        <Skeleton width={240} height={40} radius={"square"} colorMode="light" />
        <Skeleton width={200} height={20} radius={"square"} colorMode="light" />

        <Skeleton
          width={280}
          height={100}
          radius={"square"}
          colorMode="light"
        />

        <Skeleton width={width - 40} height={60} colorMode="light" />
      </View>
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
    gap: 12,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
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
  detailsContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    gap: 22,
    marginTop: -20,
    shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default SkeletonDetailsScreen;
