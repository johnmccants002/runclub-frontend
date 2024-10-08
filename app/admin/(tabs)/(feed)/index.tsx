import { StyleSheet, Text } from "react-native";

import AdminFutureEvents from "@/components/screens/AdminFutureEvents";
export default function HomeScreen() {
  return <AdminFutureEvents />;
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 500,
    width: "100%",
    bottom: 0,
    left: 0,
    top: 0,
    position: "absolute",
  },
});
