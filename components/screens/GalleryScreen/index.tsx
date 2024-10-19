import { BASE_URL } from "@/constants";
import useAuthStore from "@/stores/auth";
import { AntDesign, Feather } from "@expo/vector-icons";
import { CameraRoll } from "@react-native-camera-roll/camera-roll"; // Import CameraRoll
import axios from "axios";
import * as FileSystem from "expo-file-system"; // Import FileSystem
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import ImageViewing from "react-native-image-viewing";
import GalleryScreenSkeleton from "./skeleton";

// Get the screen width
const screenWidth = Dimensions.get("window").width;

const GalleryScreen = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0); // Index of selected image
  const [isViewerVisible, setIsViewerVisible] = useState(false); // Toggle for image viewing modal
  const { id } = useLocalSearchParams();
  const token = useAuthStore.getState().token; // Get the token from the auth store

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/events/list/${id}/images`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const imageUrls = response.data.images;
        const newArray = imageUrls.map((url) => {
          return { uri: url };
        });
        console.log(imageUrls);
        // This logs this  ["https://storage.googleapis.com/runclub-b067c.appspot.com/gallery/2024-10-20-darling-aviary-run-sunday-morning/IMG_6040.jpg"]
        setImages(newArray); // Store the image URLs formatted for the gallery
        setTimeout(() => setLoading(false), 1500);
      } catch (error) {
        console.error("Error fetching images:", error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Function to handle image press and open image viewer
  const handleImagePress = (index) => {
    setSelectedIndex(index); // Set the index of the selected image
    setIsViewerVisible(true); // Show the image viewer modal
  };

  // Function to download the image and save it to the Camera Roll
  // Function to download the image and save it to the Camera Roll
  const downloadImage = async (url) => {
    try {
      // Step 1: Download the image to a local file
      const fileUri = `${FileSystem.documentDirectory}${url.split("/").pop()}`; // Create a local file path
      const downloadResult = await FileSystem.downloadAsync(url, fileUri);

      if (downloadResult.status === 200) {
        // Step 2: Save the local file to the Camera Roll
        const savedUri = await CameraRoll.save(downloadResult.uri, {
          type: "photo",
          album: "YourAlbumName",
        });
        Alert.alert(
          "Download Complete",
          "Image has been saved to your gallery!"
        );
        console.log("Image saved at: ", savedUri);
      } else {
        Alert.alert(
          "Download Failed",
          "There was an error downloading the image."
        );
        console.error("Download error:", downloadResult.status);
      }
    } catch (error) {
      Alert.alert("Save error", "There was an error saving the image.");
      console.error("Save error:", error);
    }
  };

  // Custom Header with Close and Download buttons
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={{
          height: 42,
          width: 42,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 21,
          backgroundColor: "lightgray",
        }}
        onPress={() => setIsViewerVisible(false)}
      >
        <AntDesign name="close" size={24} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => downloadImage(images[selectedIndex])}
        style={{
          height: 42,
          width: 42,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 21,
          backgroundColor: "lightgray",
        }}
      >
        <Feather name={"download"} size={24} />
      </TouchableOpacity>
    </View>
  );

  const renderEmpty = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          padding: 30,
          gap: 20,
        }}
      >
        <Image
          source={require("@/assets/images/left.png")}
          resizeMode="contain"
          style={{ width: 300, height: 300 }}
        />
        <View
          style={{ gap: 20, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 24, fontFamily: "helvetica" }}>
            No Events Photos Uploaded
          </Text>
          <Text
            style={{
              fontSize: 24,
              fontFamily: "helvetica",
              textAlign: "center",
            }}
          >
            We'll notify you when they do get uploaded.
          </Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return <GalleryScreenSkeleton />;
  }

  // Calculate the image size for 3 images per row, with margin
  const imageSize = (screenWidth - 40) / 3; // 40 is total margin space (adjust as needed)

  return (
    <View style={styles.container}>
      {/* FlatList for 3x3 Grid Layout */}
      <FlatList
        data={images}
        keyExtractor={(item) => item.uri}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleImagePress(index)}>
            <Image
              source={{ uri: item.uri }}
              style={[styles.image, { width: imageSize, height: imageSize }]}
            />
          </TouchableOpacity>
        )}
        style={{ backgroundColor: "white" }}
        contentContainerStyle={{ backgroundColor: "white" }}
        numColumns={3} // 3 columns for 3x3 grid
        ListEmptyComponent={renderEmpty}
      />

      {/* Image Viewer Modal */}
      <ImageViewing
        images={images}
        imageIndex={selectedIndex}
        visible={isViewerVisible}
        onRequestClose={() => setIsViewerVisible(false)} // Close viewer
        HeaderComponent={renderHeader} // Custom header with close and download buttons
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  image: {
    margin: 5, // Adds margin around each image
    borderRadius: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 32,
    marginTop: 20,
  },
  closeButton: {
    fontSize: 18,
    color: "#fff",
  },
  downloadButton: {
    fontSize: 18,
    color: "#fff",
  },
});

export default GalleryScreen;
