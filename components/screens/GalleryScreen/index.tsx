import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  Text,
} from "react-native";
import axios from "axios";
import ImageViewing from "react-native-image-viewing";
import RNBlobUtil from "react-native-blob-util"; // Import react-native-blob-util
import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

// Get the screen width
const screenWidth = Dimensions.get("window").width;

const GalleryScreen = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0); // Index of selected image
  const [isViewerVisible, setIsViewerVisible] = useState(false); // Toggle for image viewing modal

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5050/events/gallery"
        );
        const imageUrls = response.data.imageUrls.map((url) => ({
          uri: url,
        }));
        setImages(imageUrls); // Store the image URLs formatted for the gallery
        setLoading(false);
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

  // Function to download the image
  const downloadImage = async (url) => {
    const { config, fs } = RNBlobUtil;
    const PictureDir = fs.dirs.PictureDir; // Picture directory path

    const filename = `${new Date().toISOString()}.jpg`; // Create a unique filename
    const filePath = `${PictureDir}/${filename}`;

    // Configure the download
    config({
      fileCache: true,
      appendExt: "jpg", // Adjust the extension based on your image format
      path: filePath,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: filePath, // Path where the image will be saved
        description: "Downloading image",
        mime: "image/jpeg",
        mediaScannable: true, // To make the file visible in the gallery
      },
    })
      .fetch("GET", url)
      .then((res) => {
        Alert.alert(
          "Download Complete",
          `Image has been saved to your gallery!`
        );
        console.log("The file saved to ", res.path());
      })
      .catch((error) => {
        Alert.alert(
          "Download Failed",
          "There was an error downloading the image."
        );
        console.error("Download error:", error);
      });
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
        onPress={() => downloadImage(images[selectedIndex].uri)}
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

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Calculate the image size for 3 images per row, with margin
  const imageSize = (screenWidth - 40) / 3; // 40 is total margin space (adjust as needed)

  return (
    <View style={styles.container}>
      {/* FlatList for 3x3 Grid Layout */}
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleImagePress(index)}>
            <Image
              source={{ uri: item.uri }}
              style={[styles.image, { width: imageSize, height: imageSize }]}
            />
          </TouchableOpacity>
        )}
        numColumns={3} // 3 columns for 3x3 grid
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
