import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";

type AnnouncementProps = {
  title: string;
  description: string;
  date: string;
  imageUrl?: string;
};

const Announcement: React.FC<AnnouncementProps> = ({
  title,
  description,
  date,
  imageUrl,
}) => {
  return (
    // source={require("@/assets/images/run.jpg")}

    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}

      <Text style={styles.description}>{description}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    color: "#888",
    textAlign: "right",
  },
});

export default Announcement;
