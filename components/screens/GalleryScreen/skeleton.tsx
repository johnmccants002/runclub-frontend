import { Skeleton } from "moti/skeleton";
import React from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";

// Get the screen width
const screenWidth = Dimensions.get("window").width;

const GalleryScreenSkeleton = () => {
  const images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  // Calculate the image size for 3 images per row, with margin
  const imageSize = (screenWidth - 40) / 3; // 40 is total margin space (adjust as needed)

  return (
    <View style={styles.container}>
      {/* FlatList for 3x3 Grid Layout */}
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={[styles.image, { width: imageSize, height: imageSize }]}>
            <Skeleton width={imageSize} height={imageSize} colorMode="light" />
          </View>
        )}
        style={{ backgroundColor: "white" }}
        contentContainerStyle={{ backgroundColor: "white" }}
        numColumns={3} // 3 columns for 3x3 grid
        scrollEnabled={false}
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

export default GalleryScreenSkeleton;
