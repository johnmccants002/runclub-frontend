import React from "react";
import { Colors } from "../../../constants/Colors";
import { defaultStyles } from "../../../constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Button,
} from "react-native";

type Props = {};

enum SignInType {
  Phone,
  Email,
  Google,
  Apple,
}

const LoginScreen = (props: Props) => {
  const [countryCode, setCountryCode] = useState("+49");
  const [phoneNumber, setPhoneNumber] = useState("");
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    // setLoading(true);
    // const { error } = await supabase.auth.signInWithPassword({
    //   email,
    //   password,
    // });
    // if (error) Alert.alert(error.message);
    // setLoading(false);
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
          Enter the phone number associated with your account
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
              />
            </View>

            <View>
              <Text style={styles.label}>Password</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder=""
                style={styles.input}
                secureTextEntry
              />
            </View>
          </View>

          <View style={{ gap: 20 }}>
            <TouchableOpacity
              style={[
                defaultStyles.pillButton,
                phoneNumber !== "" ? styles.enabled : styles.disabled,
                { marginBottom: 20 },
              ]}
              onPress={() => signInWithEmail()}
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
              style={[
                defaultStyles.pillButton,
                phoneNumber !== "" ? styles.enabled : styles.disabled,
                { marginBottom: 20 },
              ]}
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
