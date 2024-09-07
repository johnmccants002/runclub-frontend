import KPIHeader from "@/components/KPIHeader";
import { Colors } from "@/constants/Colors";
import useAuthStore from "@/stores/auth";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

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

  {
    id: "6",
    title: "Settings",
    icon: "settings",
    route: "/about/settings",
  },
];

const ADMIN_DATA = [
  {
    id: "1",
    title: "Contact Us",
    icon: "call-outline",
    route: "/admin/about/contact",
  },
  {
    id: "2",
    title: "About Us",
    icon: "information-circle-outline",
    route: "/admin/about/aboutus",
  },
  {
    id: "3",
    title: "Notifications",
    icon: "notifications-outline",
    route: "/admin/about/contact",
  },
  {
    id: "4",
    title: "Run Club Members",
    icon: "person",
    route: "/admin/about/members",
  },
  {
    id: "5",
    title: "Pending Members",
    icon: "list",
    route: "/admin/about/pending-members",
  },
  {
    id: "6",
    title: "Settings",
    icon: "settings",
    route: "/admin/about/settings",
  },
];

export default function AboutSectionScreen() {
  const router = useRouter();

  const isAdmin = useAuthStore((state) => state.isAdmin);
  const user = useAuthStore((state) => state.user);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        if (!user?.userId) {
          console.warn("No valid userId found");
          return;
        }

        const response = await axios.get(
          `http://localhost:5050/users/${user.userId}`
        );

        console.log(response.data);
        setCurrentUser(response.data);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    if (user?.userId) {
      fetchCurrentUser();
    }
  }, [user?.userId]); // Ensure that the effect runs only when `userId` changes

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
      <View style={styles.backgroundCover}></View>

      {isAdmin ? (
        <KPIHeader />
      ) : (
        <View style={styles.header}>
          <Image
            source={require("@/assets/images/group.jpg")}
            style={styles.avatar}
          />
          <View style={styles.info}>
            <View style={styles.infoDescription}>
              <Text style={styles.numberText}>
                {currentUser?.firstName} {currentUser?.lastName}
              </Text>
              <Text style={styles.numberText}>
                Favorite Brunch Spot: 58 & Holding
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* FlatList */}
      <FlatList
        data={isAdmin ? ADMIN_DATA : DATA}
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
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 120,
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
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    height: 300,
  },
  info: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginVertical: 10,
  },
  infoDescription: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  numberText: {
    fontFamily: "PilcrowRounded",
    fontSize: 18,
    color: "black",
  },
  blurContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 400,
    top: 0,
  },
  backgroundCover: {
    position: "absolute",
    left: 0,
    height: 200,
    right: 0,
    top: 0,
    backgroundColor: Colors.primary.gray,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});
