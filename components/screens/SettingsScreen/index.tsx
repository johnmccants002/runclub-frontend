import { useDeleteUserMutation } from "@/services/user";
import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors, palette } from "../../../constants/Colors";
import useAuthStore from "../../../stores/auth"; // Adjust the path according to your project structure

const SettingsScreen: React.FC = () => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const deleteUserMutation = useDeleteUserMutation();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          logout();
        },
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This action is irreversible. Are you sure you want to delete your account?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            // Call the mutation to delete the user account
            deleteUserMutation.mutate(user.userId, {
              onSuccess: () => {
                // Optional: Add a success notification or redirect logic here
                logout();
                console.log("Account deleted successfully");
              },
              onError: (error) => {
                // Optional: Handle error case
                console.error("Failed to delete account", error);
              },
            });
          },
        },
      ]
    );
  };

  const handleResetPassword = () => {
    Alert.alert(
      "Reset Password",
      "An email will be sent to reset your password. Continue?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Send Email",
          onPress: () => {
            // Implement reset password logic here
            Alert.alert(
              "Password Reset",
              "Check your email to reset your password."
            );
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={{ backgroundColor: palette.offWhite }}
    >
      <Text style={styles.header}>Settings</Text>

      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleDeleteAccount}>
        <Text style={[styles.buttonText, { color: Colors.primary.danger }]}>
          Delete Account
        </Text>
      </TouchableOpacity>

      <View style={styles.spacer} />

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: palette.offWhite,
    justifyContent: "space-between",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: Colors.primary.dark,
  },
  button: {
    backgroundColor: palette.white,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    color: Colors.primary.dark,
  },
  logoutButton: {
    backgroundColor: Colors.primary.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: {
    fontSize: 18,
    color: palette.white,
  },
  spacer: {
    flex: 1,
  },
});

export default SettingsScreen;
