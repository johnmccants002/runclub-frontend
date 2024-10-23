import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import BasicEventCard from "./BasicEventCard";

interface Event {
  _id: string;
  createdAt: string;
  createdBy: string;
  details: string;
  endDate: string;
  endTime: string;
  photo: string;
  location: Location;
  startDate: string;
  startTime: string;
  title: string;
}

interface Location {
  formatted_address: string;
  lat: number;
  lng: number;
  name: string;
  place_id: string;
}

interface EventsModalProps {
  events: Event[]; // Array of event objects
  visible: boolean; // To control modal visibility
  onClose: () => void; // Function to close the modal
}

const EventsModal: React.FC<EventsModalProps> = ({
  events,
  visible,
  onClose,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Upcoming Events</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>

          {/* Render events in FlatList */}
          <FlatList
            data={events}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <BasicEventCard
                title={item.title}
                description={item.details}
                imageUrl={item.photo}
                location={item.location.name}
                lat={item.location.lat}
                lng={item.location.lng}
                startTime={item.startTime}
                endTime={item.endTime}
                eventId={item._id}
              />
            )}
            contentContainerStyle={styles.flatListContent}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
  },
  flatListContent: {
    paddingBottom: 20,
  },
});

export default EventsModal;
