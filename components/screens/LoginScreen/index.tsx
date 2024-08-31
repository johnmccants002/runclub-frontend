import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { Colors } from "../../../constants/Colors";
import { defaultStyles } from "../../../constants/Styles";
import { useLoginMutation } from "../../../services/auth"; // Adjust the path according to your project structure

type Props = {};

const LoginScreen = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
  const router = useRouter();
  const loginMutation = useLoginMutation();

  async function signInWithEmail() {
    if (!email || !password) {
      Alert.alert("Please enter both email and password.");
      return;
    }

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          console.log("SUCCESS LOGGING IN");
        },
        onError: (error) => {
          Alert.alert(
            "Login failed",
            "Please check your credentials and try again."
          );
        },
      }
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Welcome back</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter your email and password to sign in
        </Text>
        <View style={styles.inputContainer}>
          <View style={{ gap: 20 }}>
            <View>
              <Text style={styles.label}>Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="jon@gmail.com"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View>
              <Text style={styles.label}>Password</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                style={styles.input}
                secureTextEntry
              />
            </View>
          </View>

          <View style={{ gap: 20 }}>
            <TouchableOpacity
              style={[
                defaultStyles.pillButton,
                email && password ? styles.enabled : styles.disabled,
                { marginBottom: 20 },
              ]}
              onPress={signInWithEmail}
              disabled={loginMutation.isLoading}
            >
              <Text style={defaultStyles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 16 }}
            >
              <View
                style={{
                  flex: 1,
                  height: StyleSheet.hairlineWidth,
                  backgroundColor: Colors.primary.gray,
                }}
              />
              <Text style={{ color: Colors.primary.gray, fontSize: 20 }}>
                or
              </Text>
              <View
                style={{
                  flex: 1,
                  height: StyleSheet.hairlineWidth,
                  backgroundColor: Colors.primary.gray,
                }}
              />
            </View>

            <TouchableOpacity
              style={[defaultStyles.pillButton, { marginBottom: 20 }]}
              onPress={() => router.push("/(auth)/signup")}
            >
              <Text style={defaultStyles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 20,
    flexDirection: "column",
    justifyContent: "space-around",
    flex: 1,
  },
  input: {
    backgroundColor: Colors.primary.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
  enabled: {
    backgroundColor: Colors.primary.primary,
  },
  disabled: {
    backgroundColor: Colors.primary.primaryMuted,
  },
  label: {
    color: Colors.primary.gray,
  },
});

export default LoginScreen;
