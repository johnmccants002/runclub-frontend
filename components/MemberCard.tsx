import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { User } from "@/types/types"; // Adjust the path according to your project structure
import { MaterialCommunityIcons } from "@expo/vector-icons";
interface MemberCardProps {
  member: User;
  onRemove: (userId: string) => void; // Add onRemove prop for the deny functionality
}

const MemberCard: React.FC<MemberCardProps> = ({ member, onRemove }) => {
  const onPress = () => {
    console.log("PRESSING");
    console.log(JSON.stringify(member));
    Alert.alert(
      "Remove Member",
      `Are you sure you want to remove ${member.firstName} ${member.lastName}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => onRemove(member._id),
        },
      ]
    );
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 20,
          top: 16,
          width: 40,
          height: 40,
          justifyContent: "center",
          alignItems: "center",

          zIndex: 1,
        }}
        onPress={() => onPress()}
      >
        <MaterialCommunityIcons
          name="dots-horizontal"
          size={30}
          color={"gray"}
        />
      </TouchableOpacity>
      <Image
        source={{
          uri: member.profile?.instagram
            ? "https://i.imgur.com/XJGQoa5.png"
            : "https://i.imgur.com/XJGQoa5.png", // Placeholder image
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.name}>
        {member.firstName} {member.lastName}
      </Text>
      <Text style={styles.instagram}>@{member.profile?.instagram}</Text>
      <Text style={styles.brunchSpot}>
        Favorite Brunch Spot: {member.profile?.favoriteBrunchSpot}
      </Text>
      {/* <Button
        title="Deny"
        onPress={handleDeny} // Add button to deny member
        color="#ff0000" // Optional: Red color for "Deny" button to indicate removal
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  instagram: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
  },
  brunchSpot: {
    fontSize: 14,
    color: "#555",
  },
});

export default MemberCard;
