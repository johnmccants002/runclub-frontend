import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAddEventMutation } from "@/services/events";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const CreateEventScreen: React.FC = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [photo, setPhoto] = useState(null);
  const userId = "66cea48dded84be71dcb04de"; // Admin ID or user ID

  // States for handling the date and time picker
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const addEventMutation = useAddEventMutation();

  // Function to handle event creation
  const handleCreateEvent = () => {
    if (!title || !details || !startTime || !endTime) {
      Alert.alert("Error", "All fields except photo are required.");
      return;
    }

    console.log(startTime, "THIS IS THE START TIME");

    addEventMutation.mutate(
      {
        title,
        details,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        photo: imageUri ? imageUri : "",
        adminId: userId,
      },
      {
        onSuccess: () => {
          Alert.alert("Success", "Event created successfully!");
          setTitle("");
          setDetails("");
          setStartTime(new Date());
          setEndTime(new Date());
          setImageUri(null);
        },
        onError: () => {
          Alert.alert("Error", "Failed to create event.");
        },
      }
    );
  };

  // Function to select an image
  const handleSelectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      let uri = result.assets[0].uri;
      let file = {
        name: uri.split("/").pop(),
        uri,
        type: "image/jpeg",
      };
      setImageUri(result.assets[0].uri || null);
      setPhoto(file);
    }
  };

  // DateTime Picker Handlers
  const onChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate || startTime;
    setShowStartPicker(Platform.OS === "ios");
    setStartTime(currentDate);
  };

  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || endTime;
    setShowEndPicker(Platform.OS === "ios");
    setEndTime(currentDate);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Ionicons name="calendar-outline" size={50} color="#3b5998" />
        <Text style={styles.headerText}>Create Event</Text>
      </View>

      <View style={{ flex: 1 }}>
        <TextInput
          style={styles.input}
          placeholder="Event Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Event Details"
          value={details}
          onChangeText={setDetails}
          multiline
        />

        {/* DateTime Picker for Start Time */}
        <View style={styles.dateTimePicker}>
          <TouchableOpacity onPress={() => setShowStartPicker(true)}>
            <Text style={styles.dateTimeText}>
              Start Time: {startTime.toLocaleString()}
            </Text>
          </TouchableOpacity>
          {showStartPicker && (
            <DateTimePicker
              value={startTime}
              mode="datetime"
              display="default"
              onChange={onChangeStart}
            />
          )}
        </View>

        {/* DateTime Picker for End Time */}
        <View style={styles.dateTimePicker}>
          <TouchableOpacity onPress={() => setShowEndPicker(true)}>
            <Text style={styles.dateTimeText}>
              End Time: {endTime.toLocaleString()}
            </Text>
          </TouchableOpacity>
          {showEndPicker && (
            <DateTimePicker
              value={endTime}
              mode="datetime"
              display="default"
              onChange={onChangeEnd}
            />
          )}
        </View>

        <TouchableOpacity
          style={styles.imagePickerButton}
          onPress={handleSelectImage}
        >
          <Ionicons name="image" size={24} color="#3b5998" />
          <Text style={styles.imagePickerText}>Add Photo</Text>
        </TouchableOpacity>

        {imageUri && (
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        )}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleCreateEvent}>
        <Text style={styles.submitButtonText}>Create Event</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    flex: 1,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#3b5998",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
    maxHeight: 300,
    textAlignVertical: "top",
  },
  dateTimePicker: {
    marginVertical: 10,
  },
  dateTimeText: {
    fontSize: 16,
    color: "#333",
  },
  imagePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 15,
  },
  imagePickerText: {
    marginLeft: 10,
    color: "#3b5998",
    fontSize: 16,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 15,
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: "#3b5998",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CreateEventScreen;
