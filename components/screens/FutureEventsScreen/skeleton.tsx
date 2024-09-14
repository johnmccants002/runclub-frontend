import { Skeleton } from "moti/skeleton";

import { StyleSheet, View } from "react-native";

const SkeletonEventCard = () => {
  return (
    <View style={styles.card}>
      <Skeleton
        height={140}
        width={"100%"}
        colorMode="light"
        radius={"square"}
      />
      <View style={{ gap: 4 }}>
        <Skeleton height={20} width={120} colorMode="light" radius={"square"} />

        <Skeleton height={20} width={200} colorMode="light" radius={"square"} />

        <View>
          <Skeleton
            height={12}
            width={200}
            colorMode="light"
            radius={"square"}
          />

          <Skeleton
            height={12}
            width={200}
            colorMode="light"
            radius={"square"}
          />
        </View>
      </View>

      <View>
        <Skeleton
          height={50}
          width={"100%"}
          colorMode="light"
          radius={"round"}
        />
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

export default SkeletonEventCard;
