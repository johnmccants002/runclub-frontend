import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";

const DATA = [
  {
    id: "1",
    title: "Contact Us",
    icon: "call-outline",
    route: "/about/contact",
  },
  {
    id: "2",
    title: "About Us",
    icon: "information-circle-outline",
    route: "/about/aboutus",
  },
  {
    id: "3",
    title: "Notifications",
    icon: "notifications-outline",
    route: "/about/contact",
  },
];

export default function AboutSectionScreen() {
  const router = useRouter();
  const renderItem = ({ item }) => (
    <Pressable
      style={styles.itemContainer}
      onPress={() => router.push(item.route)}
    >
      <View style={styles.leftContainer}>
        <Ionicons name={item.icon} size={24} color="#333" />
        <Text style={styles.itemText}>{item.title}</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={24} color="#333" />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* Header Image */}
      <Image
        source={require("@/assets/images/group.jpg")}
        style={styles.headerImage}
      />

      {/* FlatList */}
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  headerImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  listContent: {
    paddingTop: 16,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "100%",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
});
