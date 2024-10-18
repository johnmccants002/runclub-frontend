import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRegisterMutation } from "../../../services/auth";
import useAuthStore from "../../../stores/auth";

const { width, height } = Dimensions.get("window");

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

const SignUpScreen: React.FC = () => {
  const { authLoading } = useAuthStore();
  const registerMutation = useRegisterMutation();
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [tosAccepted, setTosAccepted] = useState<boolean>(false);
  const [emailList, setEmailList] = useState<boolean>(false);

  const handleSignup = () => {
    if (!email || !password || !firstName || !lastName || !confirmPassword) {
      setErrorMessage("Please fill out all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!tosAccepted) {
      setErrorMessage("Please accept the Terms of Service");
    }

    registerMutation.mutate(
      { email, password, firstName, lastName, emailList, tosAccepted },
      {
        onSuccess: async () => {
          Alert.alert("Success", "You have registered successfully.");
        },
        onError: () => {
          setErrorMessage("Registration failed. Please try again.");
        },
      }
    );
  };

  const handleTOSPressed = async () => {
    await WebBrowser.openBrowserAsync(
      "https://runclub-nextjs-sanity.vercel.app/terms-of-service"
    );
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      style={{ backgroundColor: "white" }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          paddingBottom: 20,
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            height: height * 0.6,
            justifyContent: "center",
            gap: 20,
          }}
        >
          <View style={{ gap: 16 }}>
            <Text style={styles.title}>Let's Create An Account For You</Text>
          </View>

          <View style={{ gap: 20 }}>
            {/* First Name */}
            <View style={styles.inputContainer}>
              <Text>First Name</Text>
              <TextInput
                placeholder="Cory"
                placeholderTextColor={colors.neutral["300"]}
                value={firstName}
                onChangeText={setFirstName}
                style={styles.input}
              />
            </View>

            {/* Last Name */}
            <View style={styles.inputContainer}>
              <Text>Last Name</Text>
              <TextInput
                placeholder="Peters"
                placeholderTextColor={colors.neutral["300"]}
                value={lastName}
                onChangeText={setLastName}
                style={styles.input}
              />
            </View>

            {/* Email */}
            <View style={styles.inputContainer}>
              <Text>Email Address</Text>
              <TextInput
                placeholder="hello@runclub.com"
                placeholderTextColor={colors.neutral["300"]}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                style={styles.input}
              />
            </View>

            {/* Password */}
            <View style={styles.inputContainer}>
              <Text>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  placeholder="**********"
                  secureTextEntry={!showPassword}
                  placeholderTextColor={colors.neutral["300"]}
                  value={password}
                  onChangeText={setPassword}
                  style={styles.input}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <Text>{showPassword ? "Hide" : "Show"}</Text>
                </Pressable>
              </View>
            </View>

            {/* Confirm Password */}
            <View style={styles.inputContainer}>
              <Text>Confirm Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  placeholder="**********"
                  secureTextEntry={!showPassword}
                  placeholderTextColor={colors.neutral["300"]}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  style={styles.input}
                />
              </View>
            </View>
          </View>
        </View>

        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        <View
          style={{
            gap: 12,
            width: width,
            alignItems: "flex-start",
            justifyContent: "flex-start",
            paddingHorizontal: 40,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 20,
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: "blue",
                fontWeight: "bold",
              }}
            >
              Join Email List 🏃‍♂️
            </Text>

            <Checkbox
              value={emailList}
              onValueChange={() => setEmailList(!emailList)}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 20,
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Pressable onPress={handleTOSPressed}>
              <Text
                style={{
                  textDecorationLine: "underline",
                  color: "blue",
                }}
              >
                Accept Terms of Service
              </Text>
            </Pressable>

            <Checkbox
              value={tosAccepted}
              onValueChange={() => setTosAccepted(!tosAccepted)}
            />
          </View>
          <Pressable style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Create Account</Text>
          </Pressable>
        </View>
      </View>

      {authLoading && (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.centeredView}
        />
      )}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    borderColor: colors.neutral["200"],
    borderWidth: 1,
    height: 60,
    width: width * 0.9,
    alignSelf: "center",
    borderRadius: 16,
    justifyContent: "center",
    paddingHorizontal: 12,
    gap: 4,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    color: colors.neutral["700"],
  },
  passwordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    width: "100%",
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary["700"],
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 12,
  },
  centeredView: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: colors.whiteBlack["50"],
    fontSize: 16,
    fontWeight: "600",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginHorizontal: 20,
    maxWidth: 300,
  },
  description: {
    fontSize: 16,
    textAlign: "left",
    marginHorizontal: 20,
    color: colors.neutral["700"],
  },
  errorText: {
    color: "red",
    alignSelf: "center",
    marginBottom: 20,
  },
  loginLink: {
    textDecorationLine: "underline",
    fontSize: 16,
    lineHeight: 24,
  },
});

export default SignUpScreen;
