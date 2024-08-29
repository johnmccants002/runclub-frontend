import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { Link, Stack, useRouter } from "expo-router";
// import { supabase } from "@/lib/supabase";
import { defaultStyles } from "@/constants/Styles";
// import { Session } from "@supabase/supabase-js";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // supabase.auth.onAuthStateChange((_event, session) => {
    //   console.log(JSON.stringify(session));
    // });
  }, []);

  async function signUpWithEmail() {
    // setLoading(true);
    // const { error } = await supabase.auth.signUp({ email, password });
    // if (error) Alert.alert(error.message);
    // setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign up" }} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="jon@gmail.com"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder=""
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity
        style={[
          defaultStyles.pillButton,
          { marginBottom: 20, backgroundColor: Colors.primary.primary },
        ]}
        onPress={() => signUpWithEmail()}
      >
        <Text style={defaultStyles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <Link href="/login" style={styles.textButton}>
        Sign in
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    flex: 1,
  },
  label: {
    color: "gray",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 5,
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
});

export default SignUpScreen;
