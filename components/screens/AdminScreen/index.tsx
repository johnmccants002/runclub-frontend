import KPIHeader from "@/components/KPIHeader";
import { useFutureEventsMutation } from "@/services/events";
import useAuthStore from "@/stores/auth";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
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
    id: "6",
    title: "Settings",
    icon: "settings",
    route: "/about/settings",
  },
];

const ADMIN_DATA = [
  {
    id: "2",
    title: "About Us",
    icon: "information-circle-outline",
    route: "/admin/about/aboutus",
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

export default function AdminScreen() {
  const router = useRouter();
  const { mutate: fetchFutureEvents, isError } = useFutureEventsMutation(); // Mutation to fetch events

  const isAdmin = useAuthStore((state) => state.isAdmin);

  useEffect(() => {
    console.log("FETCHING FUTURE EVENTS?");
    fetchFutureEvents();
  }, [fetchFutureEvents]);

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
      <KPIHeader />

      {/* FlatList */}
      <FlatList
        data={ADMIN_DATA}
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
