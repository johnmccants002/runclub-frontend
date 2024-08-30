import { StyleSheet } from "react-native";
import About from "../../../../components/screens/AboutScreen";

export default function TabTwoScreen() {
  return <About />;
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
