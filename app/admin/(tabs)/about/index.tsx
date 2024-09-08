import { StyleSheet } from "react-native";
import AdminScreen from "@/components/screens/AdminScreen";

export default function TabTwoScreen() {
  return <AdminScreen />;
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
