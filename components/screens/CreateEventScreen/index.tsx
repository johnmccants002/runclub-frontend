import { useAddEventMutation } from "@/services/events";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import axios from "axios"; // Add axios to make API calls
import React, { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import useAuthStore from "@/stores/auth"; // Import the auth store for the token

const CreateEventScreen: React.FC = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState<any>(null); // Store the full location object
  const [locationInput, setLocationInput] = useState<string>(""); // Store the input value separately
  const [predictions, setPredictions] = useState<any[]>([]); // For storing autocomplete results
  const userId = "66cea48dded84be71dcb04de"; // Admin ID or user ID
  const token = useAuthStore.getState().token;

  // States for handling the date and time picker
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const addEventMutation = useAddEventMutation();

  // Function to handle event creation
  const handleCreateEvent = async () => {
    if (!title || !details || !startTime || !endTime || !location) {
      Alert.alert("Error", "All fields except photo are required.");
      return;
    }

    if (startTime < new Date()) {
      Alert.alert("Invalid Start Time", "Start time must be in the future.");
      return;
    }

    if (endTime <= startTime) {
      Alert.alert("Invalid End Time", "End time must be after the start time.");
      return;
    }

    console.log(startTime, endTime);

    let imageUrl = "";

    if (imageUri) {
      const formData = new FormData();

      formData.append("image", {
        uri: imageUri,
        type: "image/jpeg", // Assuming the image is JPEG
        name: imageUri.split("/").pop(), // Extract the file name from the URI
      } as any); // Cast as 'any' to bypass TypeScript's type checking

      try {
        const response = await axios.post(
          "http://localhost:5050/events/upload",
          formData, // FormData object containing the file and other fields
          {
            headers: {
              "Content-Type": "multipart/form-data", // Required for file uploads
            },
          }
        );
        const data = await response.data;
        imageUrl = data.event.imageUrl; // Store the image URL returned by the backend
      } catch (error) {
        Alert.alert("Error", "Failed to upload image.");
        return;
      }
    }
    console.log("REACHED THIS POINT");
    // Once the image is uploaded (if applicable), call the mutation
    addEventMutation.mutate(
      {
        title,
        details,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        photo: imageUrl || "", // Send the uploaded image URL or an empty string if no image
        adminId: userId,
        location, // Include the full location object in the event details
      },
      {
        onSuccess: () => {
          Alert.alert("Success", "Event created successfully!");
          // Reset form fields
          setTitle("");
          setDetails("");
          setStartTime(new Date());
          setEndTime(new Date());
          setImageUri(null);
          setLocation(null); // Reset location
          setLocationInput(""); // Reset the input field
          setPredictions([]);
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
  const onChangeStart = (event: any, selectedDate?: Date) => {
    const dateSelected = selectedDate || startTime;
    setShowStartPicker(Platform.OS === "ios");
    if (dateSelected < new Date()) {
      Alert.alert("Invalid Start Time", "Start time must be in the future.");
    } else {
      setStartTime(dateSelected);
    }
  };

  const onChangeEnd = (event: any, selectedDate?: Date) => {
    const dateSelected = selectedDate || endTime;
    setShowEndPicker(Platform.OS === "ios");
    if (dateSelected <= startTime) {
      Alert.alert("Invalid End Time", "End time must be after the start time.");
    } else {
      setEndTime(dateSelected);
    }
  };

  // Handle Autocomplete input change and fetch suggestions from backend
  const handleLocationInputChange = async (value: string) => {
    setLocationInput(value); // Update the input value

    if (!value) return;

    try {
      const result = await axios.get(
        `http://localhost:5050/locations/autocomplete`,
        {
          params: { input: value },
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
          },
        }
      );
      setPredictions(result.data); // Store predictions
    } catch (error) {
      console.error("Error fetching autocomplete predictions:", error);
    }
  };

  const fetchPlaceDetails = async (place_id: string) => {
    console.log(place_id, "PLACE ID");
    const response = await axios.get(
      `http://localhost:5050/locations/place-details`,
      {
        params: { place_id },
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
      }
    );
    return response;
  };

  // Handle Location selection and fetch place details
  const handleSelectLocation = async (prediction: any) => {
    try {
      // Fetch detailed place information using the place_id
      const result = await fetchPlaceDetails(prediction.place_id);

      // Log the entire response for debugging purposes
      console.log("Full Response from Backend:", result.data);

      // Ensure the expected structure is present
      if (
        result.data &&
        result.data.geometry &&
        result.data.geometry.location
      ) {
        const placeDetails = result.data;

        console.log("WE GOT THE PLACE DETAILS");

        // Set the full location object
        setLocation({
          place_id: prediction.place_id,
          name: prediction.structured_formatting.main_text,
          formatted_address: prediction.description,
          lat: placeDetails.geometry.location.lat, // Use the latitude from place details
          lng: placeDetails.geometry.location.lng, // Use the longitude from place details
        });

        setLocationInput(prediction.description); // Set input to selected location
        setPredictions([]); // Clear predictions after selection
      } else {
        console.error("Geometry data is missing from the response.");
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
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

        {/* Location Input with Autocomplete */}
        <TextInput
          style={styles.input}
          placeholder="Event Location"
          value={locationInput} // Bind to locationInput for independent typing
          onChangeText={handleLocationInputChange} // Call the autocomplete function on input change
        />

        {/* Show autocomplete suggestions */}
        {predictions.length > 0 && (
          <FlatList
            data={predictions}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback
                onPress={() => handleSelectLocation(item)}
              >
                <View style={styles.suggestionItem}>
                  <Text style={styles.suggestionText}>{item.description}</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          />
        )}

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
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  suggestionText: {
    fontSize: 16,
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
