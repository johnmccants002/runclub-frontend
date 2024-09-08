import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "@/types/types"; // Adjust path accordingly
import {
  useAcceptMemberMutation,
  useDenyMemberMutation,
} from "@/services/members"; // Adjust path accordingly
import { BASE_URL } from "@/constants";

const fetchPendingMembers = async (): Promise<User[]> => {
  const { data } = await axios.get(`${BASE_URL}/admin/pending-members`); // Adjust URL accordingly
  return data;
};

const PendingMembersScreen: React.FC = () => {
  const {
    data: pendingMembers,
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ["pendingMembers"],
    queryFn: fetchPendingMembers,
  });

  const acceptMemberMutation = useAcceptMemberMutation();
  const denyMemberMutation = useDenyMemberMutation();

  const handleAccept = (userId: string) => {
    acceptMemberMutation.mutate(userId, {
      onSuccess: () => {
        Alert.alert("Success", "Member accepted");
      },
      onError: () => {
        Alert.alert("Error", "Failed to accept member");
      },
    });
  };

  const handleDeny = (userId: string) => {
    denyMemberMutation.mutate(userId, {
      onSuccess: () => {
        Alert.alert("Success", "Member denied");
      },
      onError: () => {
        Alert.alert("Error", "Failed to deny member");
      },
    });
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error loading pending members</Text>
      </View>
    );
  }

  if (pendingMembers && pendingMembers?.length < 1) {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={require("@/assets/images/middle.png")}
          resizeMode="contain"
          style={{ width: 300, height: 300 }}
        />
        <View
          style={{ gap: 20, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 24, fontFamily: "helvetica" }}>
            No Pending Members
          </Text>
          <Text style={{ fontSize: 24, fontFamily: "helvetica" }}>
            Go invite some more people
          </Text>
        </View>
      </View>
    );
  }

  return (
    <>
      <FlatList
        data={pendingMembers}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>
              {item.firstName} {item.lastName}
            </Text>
            <Text style={styles.email}>{item.email}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.button, styles.acceptButton]}
                onPress={() => handleAccept(item._id)}
              >
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.denyButton]}
                onPress={() => handleDeny(item._id)}
              >
                <Text style={styles.buttonText}>Deny</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: "#555",
    marginBottom: 15,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
  },
  denyButton: {
    backgroundColor: "#f44336",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default PendingMembersScreen;
