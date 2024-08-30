import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useMembersQuery } from "@/services/members"; // Adjust the path according to your project structure
import MemberCard from "@/components/MemberCard"; // Adjust the path according to your project structure

const MembersScreen: React.FC = () => {
  const { data: members, isLoading, error } = useMembersQuery();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Failed to load members</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {members?.map((member) => (
        <MemberCard key={member._id} member={member} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginHorizontal: 20,
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});

export default MembersScreen;
