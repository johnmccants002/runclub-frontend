import { Colors } from "@/constants/Colors";
import axios from "@/middleware/axios";
import useAuthStore from "@/stores/auth";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import QRCode from "react-native-qrcode-svg";
import {
  Modal,
  Image,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
} from "react-native";
import io from "socket.io-client"; // Import socket.io-client
import ToastManager, { Toast } from "toastify-react-native";

export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profile?: {
    instagram?: string;
    phoneNumber?: string;
    favoriteBrunchSpot?: string;
    about?: string;
  };
  membershipStatus: "pending" | "accepted" | "denied";
  tosAccepted: boolean;
  emailList: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  isAdmin: boolean;
  qrCode?: string;
}

import { BASE_URL } from "@/constants";
import { FiestaAnimations, useFiesta } from "react-native-fiesta";
const DATA = [
  {
    id: "1",
    title: "Contact Us",
    icon: "call-outline",
    route: "/about/contact",
  },
  {
    id: "2",
    title: "About Us",
    icon: "information-circle-outline",
    route: "/about/aboutus",
  },
  {
    id: "6",
    title: "Settings",
    icon: "settings-outline",
    route: "/about/settings",
  },
  {
    id: "7",
    title: "Gallery",
    icon: "images-outline",
    route: "/about/gallery",
  },
];

export default function AboutSectionScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore.getState().token;
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [socket, setSocket] = useState(null);
  const { runFiestaAnimation } = useFiesta();
  const width = Dimensions.get("screen").width;

  useEffect(() => {
    const fetchCurrentUser = async () => {
      setLoading(true);
      try {
        if (!user?.userId) {
          console.warn("No valid userId found");
          return;
        }

        const response = await axios.get(`${BASE_URL}/users/${user.userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCurrentUser(response.data);
      } catch (error) {
        console.error("Error fetching current user:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.userId) {
      fetchCurrentUser();
    }
  }, [user?.userId]);

  const handleQRButtonPress = () => {
    setModalVisible(true);

    // Initialize socket connection and listen for events
    const newSocket = io(BASE_URL);
    setSocket(newSocket);

    newSocket.on("userCheckedIn", ({ userId, eventId }) => {
      if (userId === currentUser?._id) {
        setTimeout(() => setModalVisible(false), 50);

        // Trigger animation here (e.g., update state to trigger it)
        console.log("User checked in, triggering animation!");
        setTimeout(
          () => runFiestaAnimation({ animation: FiestaAnimations.Hearts }),
          150
        );
        setTimeout(() => Toast.success("Checked into the event!"), 1500);
      }
    });
  };

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.itemContainer}
      onPress={() => router.push(item.route)}
    >
      <View style={styles.leftContainer}>
        <Ionicons name={item.icon} size={24} color="#333" />
        <Text style={styles.itemText}>{item.title}</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={24} color="#333" />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <ToastManager
        width={width / 1.2}
        positionValue={50}
        animationInTiming={800}
        animationOutTiming={800}
        height={60}
        style={{ font: 10 }}
      />
      {/* Header Image */}
      <View style={styles.backgroundCover}></View>
      <View style={styles.header}>
        <Image
          source={require("../../../assets/images/profile.png")}
          style={styles.avatar}
          resizeMode="cover"
        />
        {currentUser?.membershipStatus === "accepted" && loading !== true && (
          <>
            {/* Display Profile Image instead of QR Code */}

            {/* Button to present QR code modal */}
            <Button
              title={modalVisible ? "Hide QR Code" : "Show QR Code"}
              onPress={() => {
                // Toast.success("Checked into the event!");
                if (modalVisible) {
                  setModalVisible(false);
                } else if (!modalVisible) {
                  handleQRButtonPress();
                }
              }}
            />
          </>
        )}
        <View style={styles.info}>
          <View style={styles.infoDescription}>
            <Text style={styles.numberText}>
              {currentUser?.firstName} {currentUser?.lastName}
            </Text>
          </View>
        </View>
      </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />

      {/* Modal for displaying QR Code */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <Pressable
          onPress={() => setModalVisible(false)}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View style={styles.qrWrapper}>
            <QRCode value={currentUser?._id} size={200} />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 120,
  },
  headerImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  listContent: {
    paddingTop: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: "semibold",
    color: "#333",
    textAlign: "center",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "100%",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    height: 300,
  },
  info: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginVertical: 10,
  },
  infoDescription: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  numberText: {
    fontSize: 18,
    color: "black",
  },
  backgroundCover: {
    position: "absolute",
    left: 0,
    height: 200,
    right: 0,
    top: 0,
    backgroundColor: Colors.primary.gray,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    height: 300,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  qrWrapper: {
    backgroundColor: "white",
    padding: 20, // Padding around the QR code
    borderRadius: 10, // Rounded corners for a smooth feel
    shadowColor: "#000", // Shadow for elevation effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
});
