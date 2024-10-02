import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import { CameraView, Camera, BarcodeScanningResult } from "expo-camera";
import useEventsStore from "@/stores/events";
import FutureEventsModal from "./FutureEventsModal"; // This is the modal for event selection
import useAuthStore from "@/stores/auth";
import axios from "axios";
import { BASE_URL } from "@/constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  setToggleModal: Dispatch<SetStateAction<boolean>>;
}

export default function QRCodeScanner({ setToggleModal }: Props) {
  const [hasPermission, setHasPermission] = useState(true);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // For controlling the modal visibility

  const { events, selectedEvent, setSelectedEvent } = useEventsStore();
  const user = useAuthStore((state) => state.user);
  const [scannedIds, setScannedIds] = useState<String[]>([]);
  const [alreadyAlert, setAlreadyAlert] = useState<boolean>(false);
  const [failedAlert, setFailedAlert] = useState<boolean>(false);
  const token = useAuthStore.getState().token; // Get the token from the auth store

  useEffect(() => {
    console.log(user, "This is the user");
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  // Automatically select the nearest future event when the component mounts
  useEffect(() => {
    if (events && events.length > 0) {
      const nearestEvent = events.reduce((prev, curr) =>
        new Date(curr.startTime) < new Date(prev.startTime) ? curr : prev
      );
      setSelectedEvent(nearestEvent); // Set the nearest event as selected
    }
  }, [events, setSelectedEvent]);

  const handleBarcodeScanned = async ({ data }: BarcodeScanningResult) => {
    console.log("SCANNING");

    if (scannedIds.includes(data) && !alreadyAlert) {
      Alert.alert(
        "Already Checked In",
        "This user has already been checked in."
      );
      setAlreadyAlert(true);

      return;
    }
    setScanned(true);

    try {
      console.log(data, selectedEvent, user, "THIS IS THE DATA TO SEND");
      // Prepare the check-in data
      if (data && selectedEvent && user) {
        console.log(data, "THIS IS THE DATA");
        const checkInData = {
          userId: data, // Assuming `data` from QR code is the userId
          eventId: selectedEvent._id, // The currently selected event's ID
          adminId: user.userId, // Admin ID (fixed or from state if needed)
        };

        // Make the POST request to check in the user
        const response = await axios.post(
          `${BASE_URL}/admin/checkin`,
          checkInData,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Handle successful check-in
        Alert.alert("Success", "User checked in successfully!");
        console.log("Check-in data:", response.data);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 409 && !failedAlert) {
        // Handle the "User already checked in" error
        Alert.alert(
          "Already Checked In",
          "This user has already been checked into this event."
        );
        setFailedAlert(true);
      } else if (!failedAlert) {
        // Handle other errors
        Alert.alert("Error", "Failed to check in the user.");
        console.error("Check-in error:", error);
        setFailedAlert(true);
      }
    }

    setScannedIds((prevScannedIds) => [...prevScannedIds, data]);

    // Reset scanning state
    setTimeout(() => {
      setScanned(false);
    }, 3000);
  };

  const handleEventChange = () => {
    setModalVisible(true); // Open the modal to select a new event
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event); // Update the selected event
    setModalVisible(false); // Close the modal
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Top 2/3rds for the Camera */}
      <View style={{ height: 120, width: "100%", backgroundColor: "white" }}>
        <Pressable
          style={{
            position: "relative",
            left: 20,
            top: 60,
            width: 50,
            height: 50,
          }}
          onPress={() => setToggleModal(false)}
        >
          <View
            style={{
              backgroundColor: "gray",
              alignSelf: "center",
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              zIndex: 1,
            }}
          >
            <MaterialCommunityIcons name="close" color={"white"} size={30} />
          </View>
        </Pressable>
      </View>
      <View style={styles.cameraContainer}>
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417"],
          }}
          style={[StyleSheet.absoluteFillObject, { zIndex: 2 }]}
        />
        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        )}
      </View>

      {/* Bottom 1/3rd for the selected event */}
      <View style={styles.eventContainer}>
        {selectedEvent ? (
          <>
            <TouchableOpacity
              onPress={handleEventChange}
              style={{ alignItems: "center", justifyContent: "center", gap: 4 }}
            >
              <Text style={styles.eventTitle}>{selectedEvent.title}</Text>
              <Text style={styles.eventDate}>{selectedEvent.startTime}</Text>
            </TouchableOpacity>

            {/* Button to open the modal and change the event */}
            <Button title="Change Event" onPress={handleEventChange} />
          </>
        ) : (
          <Text>No future events available</Text>
        )}
      </View>

      {/* Modal for selecting future events */}
      <FutureEventsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectEvent={handleSelectEvent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  cameraContainer: {
    flex: 2, // Takes 2/3rd of the screen
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  eventContainer: {
    flex: 1, // Takes 1/3rd of the screen
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  eventDate: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
});
