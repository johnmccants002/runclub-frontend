import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../../constants/Colors";
import { defaultStyles } from "../../../constants/Styles";
import { useForgotPasswordMutation } from "../../../services/auth"; // Adjust the path according to your project structure

type Props = {};

const colors = {
  primary: {
    "700": "#4F46E5",
  },
  whiteBlack: {
    "50": "#FFFFFF",
  },
  neutral: {
    "200": "#E5E7EB",
    "300": "#9CA3AF",
    "700": "#374151",
  },
};

const ForgotPasswordScreen = (props: Props) => {
  const [email, setEmail] = useState("");
  const keyboardVerticalOffset = Platform.OS === "ios" ? 20 : 0;
  const forgotPasswordMutation = useForgotPasswordMutation();

  async function handleForgotPassword() {
    if (!email) {
      Alert.alert("Please enter your email address.");
      return;
    }

    forgotPasswordMutation.mutate(
      { email },
      {
        onSuccess: () => {
          Alert.alert(
            "Password Reset",
            "An email has been sent with instructions to reset your password."
          );
        },
        onError: (error) => {
          Alert.alert(
            "Password reset failed",
            "Please check your email and try again."
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
        <Text style={defaultStyles.header}>Forgot Password</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter your email to reset your password
        </Text>
        <View style={styles.inputContainer}>
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="john@gmail.com"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor={colors.neutral["300"]}
            />
          </View>

          <TouchableOpacity
            style={[
              defaultStyles.pillButton,
              email ? styles.enabled : styles.disabled,
              { marginTop: 20 },
            ]}
            onPress={handleForgotPassword}
            disabled={forgotPasswordMutation.isLoading}
          >
            <Text style={defaultStyles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
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
    fontSize: 16,
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

export default ForgotPasswordScreen;
