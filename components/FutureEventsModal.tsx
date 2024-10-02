import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Event } from "../types/types";
import useEventsStore from "@/stores/events";

interface FutureEventsModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectEvent: (event: Event) => void;
}

const FutureEventsModal: React.FC<FutureEventsModalProps> = ({
  visible,
  onClose,
  onSelectEvent,
}) => {
  const { events } = useEventsStore(); // Access events from Zustand store

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose} // Handle the Android back button
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Future Events</Text>

          <FlatList
            data={events}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onSelectEvent(item)}>
                <View style={styles.eventItem}>
                  <Text style={styles.eventTitle}>{item.title}</Text>
                  <Text style={styles.eventDate}>{item.startTime}</Text>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text>No future events available.</Text>}
          />

          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  eventItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  eventDate: {
    fontSize: 14,
    color: "#888",
  },
  closeButton: {
    fontSize: 18,
    color: "blue",
    textAlign: "center",
    marginTop: 20,
  },
});

export default FutureEventsModal;
