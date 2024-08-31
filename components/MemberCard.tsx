import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { User } from "@/types/types"; // Adjust the path according to your project structure

interface MemberCardProps {
  member: User;
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={{
          uri: member.profile?.instagram
            ? "https://i.imgur.com/XJGQoa5.png"
            : "https://i.imgur.com/XJGQoa5.png",
        }} // Assuming Instagram is used for the profile image
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
