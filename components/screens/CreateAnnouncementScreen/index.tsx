import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker"; // Importing expo-image-picker
import { useAddAnnouncementMutation } from "@/services/announcements"; // Adjust the path according to your project structure
import { Ionicons } from "@expo/vector-icons"; // For icons

const CreateAnnouncementScreen: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [photo, setPhoto] = useState(null);
  const userId = "66cea48dded84be71dcb04de";

  async function uploadPhoto(file) {
    const { name, uri, type } = file;
    console.log(name);
    console.log(uri);
    console.log(type);

    // Fetch the file from its URI and convert it to Blob
    const response = await fetch(uri);
    const blob = await response.blob();

    // Create form data and append the Blob with a name
    const formData = new FormData();
    formData.append("photo", blob, name); // Blob is the second parameter, and 'name' is the filename

    console.log("ABOUT TO CALL FUNCTION", name);

    // Upload to the server
    const uploadResponse = await fetch(`${BASE_URL}/users/upload-image`, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data", // You may or may not need this depending on how the server parses form data
      },
    });

    if (uploadResponse.status === 200) return uploadResponse;
  }

  const addAnnouncementMutation = useAddAnnouncementMutation();

  const handleCreateAnnouncement = () => {
    if (!title || !content) {
      Alert.alert("Error", "Title and content are required.");
      return;
    }

    addAnnouncementMutation.mutate(
      {
        title,
        content,
        imageUrl: imageUri, // Using the selected image URI
        userId,
      },
      {
        onSuccess: () => {
          Alert.alert("Success", "Announcement created successfully!");
          setTitle("");
          setContent("");
          setImageUri(null);
        },
        onError: () => {
          Alert.alert("Error", "Failed to create announcement.");
        },
      }
    );
  };

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

    console.log("FJDSKLFSDJlk");

    if (!result.canceled) {
      console.log("RESULT NOT CANCELLED");
      let uri = result.assets[0].uri;

      console.log("THIS IS THE URI", uri);

      let file = {
        name: uri.split("/").pop(),
        uri,
        type: "image/jpeg",
      };
      setImageUri(result.assets[0].uri || null);
      setPhoto(file);
      console.log("WE ARE HERE", uri);
      await uploadPhoto(file);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Ionicons name="megaphone-outline" size={50} color="#3b5998" />
        <Text style={styles.headerText}>Create Announcement</Text>
      </View>

      <View style={{ flex: 1 }}>
        <TextInput
          style={styles.input}
          placeholder="What's the title?"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="What's on your mind?"
          value={content}
          onChangeText={setContent}
          multiline
        />

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

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleCreateAnnouncement}
      >
        <Text style={styles.submitButtonText}>Post</Text>
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

export default CreateAnnouncementScreen;
