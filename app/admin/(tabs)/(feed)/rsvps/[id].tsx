import { BASE_URL } from "@/constants";
import axiosInstance from "@/middleware/axios";
import useAuthStore from "@/stores/auth";
import { useLocalSearchParams, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

type Props = {};

const EventRsvps = (props: Props) => {
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const token = useAuthStore((state) => state.token);
  const [rsvps, setRsvps] = useState([]);

  // Fetch RSVPs for the event
  const fetchRSVPs = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${BASE_URL}/rsvps/${params.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRsvps(data.rsvps);
      return data.rsvps;
    } catch (err) {
      console.log("ERROR FETCHING RSVPS: ", err);
      return [];
    }
  };

  // Fetch user details by userId
  const fetchUser = async (userId: string) => {
    try {
      const { data } = await axiosInstance.get(`${BASE_URL}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (err) {
      console.log("ERROR FETCHING USERS");
      return null;
    }
  };

  // Load RSVPs and their corresponding user details
  useEffect(() => {
    const loadRSVPsAndUsers = async () => {
      setLoading(true);
      const rsvpList = await fetchRSVPs();

      const userPromises = rsvpList.map((rsvp) => fetchUser(rsvp.userId));
      const userResults = await Promise.all(userPromises);

      // Filter out null values in case of errors in user fetching
      setUsers(userResults.filter((user) => user !== null));

      setLoading(false);
    };

    loadRSVPsAndUsers();
  }, [token]);

  // Render loading state
  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `${rsvps.length} RSVPs` }} />
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.userContainer}>
            <Image
              source={require("@/assets/images/profile.png")}
              style={styles.profileImage}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>
                {item.firstName} {item.lastName}
              </Text>
              <Text style={styles.userEmail}>{item.email}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userInfo: {
    justifyContent: "center",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 14,
    color: "#666",
  },
});

export default EventRsvps;
