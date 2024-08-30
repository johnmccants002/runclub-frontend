import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRegisterMutation } from "../../../services/auth";
import useAuthStore from "../../../stores/auth";

const SignUpScreen: React.FC = () => {
  const { authLoading } = useAuthStore();
  const registerMutation = useRegisterMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSignUp = () => {
    if (!email || !password || !firstName || !lastName) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    registerMutation.mutate(
      { email, password, firstName, lastName },
      {
        onSuccess: () => {
          Alert.alert("Success", "You have registered successfully.");
        },
        onError: () => {
          Alert.alert("Error", "Registration failed.");
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button
        title={authLoading ? "Registering..." : "Sign Up"}
        onPress={handleSignUp}
        disabled={authLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default SignUpScreen;
