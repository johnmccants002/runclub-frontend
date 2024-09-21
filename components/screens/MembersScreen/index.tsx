import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { useDenyMemberMutation, useMembersQuery } from "@/services/members"; // Adjust the path according to your project structure
import MemberCard from "@/components/MemberCard"; // Adjust the path according to your project structure

const MembersScreen: React.FC = () => {
  const { data: members, isLoading, error } = useMembersQuery();
  const denyMemberMutation = useDenyMemberMutation();

  const handleRemoveMember = (userId: string) => {
    denyMemberMutation.mutate(userId);
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <Image
          source={require("@/assets/images/middle.png")}
          resizeMode="contain"
          style={{ width: 300, height: 300 }}
        />
        <View
          style={{ gap: 20, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 24, fontFamily: "helvetica" }}>
            No Events Scheduled
          </Text>
          <Text style={{ fontSize: 24, fontFamily: "helvetica" }}>
            Check back in later
          </Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {members?.map((member) => (
        <MemberCard
          key={member._id}
          member={member}
          onRemove={handleRemoveMember}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  container: {
    paddingTop: 16,
    backgroundColor: "white",
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
