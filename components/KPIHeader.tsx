import { palette } from "@/constants/Colors";
import {
  useAcceptedThisMonthQuery,
  useAcceptedThisWeekQuery,
} from "@/services/members";
import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import { useAssets } from "expo-asset";
import { ResizeMode, Video } from "expo-av";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

type Props = {};

const KPIHeader = (props: Props) => {
  const [assets] = useAssets([require("../assets/videos/Park.mp4")]);
  const [videoLoaded, setVideoLoaded] = useState(false);
  // Use the hooks to fetch the number of accepted members
  const { data: acceptedThisWeek, isLoading: loadingWeek } =
    useAcceptedThisWeekQuery();
  const { data: acceptedThisMonth, isLoading: loadingMonth } =
    useAcceptedThisMonthQuery();

  return (
    <>
      <Video
        resizeMode={ResizeMode.COVER}
        isMuted
        isLooping
        shouldPlay
        source={require("../assets/videos/Park.mp4")}
        style={styles.video}
        onLoad={() => setVideoLoaded(true)} // Set videoLoaded to true when video is loaded
      />

      <View style={styles.kpisContainer}>
        <View style={{ flexDirection: "row", gap: 20 }}>
          <View style={styles.kpi}>
            <FontAwesome6 name="users-rectangle" size={24} color="black" />
            <Text style={styles.text}>New Members This Week</Text>
            {loadingWeek ? (
              <ActivityIndicator color="black" />
            ) : (
              <Text style={styles.metricText}>+{acceptedThisWeek}</Text>
            )}
          </View>
          <View style={styles.kpi}>
            <FontAwesome6 name="users-rectangle" size={24} color="black" />
            <Text style={styles.text}>New Members This Month</Text>
            {loadingMonth ? (
              <ActivityIndicator color="black" />
            ) : (
              <Text style={styles.metricText}>+{acceptedThisMonth}</Text>
            )}
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 20 }}>
          <View style={styles.kpi}>
            <Entypo name="instagram" size={24} color="black" />
            <Text style={styles.text}>New Instagram Followers This Week</Text>
            <Text style={styles.metricText}>+15</Text>
          </View>
          <View style={styles.kpi}>
            <Entypo name="instagram" size={24} color="black" />
            <Text style={styles.text}>New Instagram Followers This Month</Text>
            <Text style={styles.metricText}>+15</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  kpi: {
    alignItems: "center",
    flex: 1, // Ensure even distribution of space
    gap: 8,
  },
  kpisContainer: {
    flexDirection: "column",
    justifyContent: "space-between", // Ensure even spacing
    padding: 40,
    backgroundColor: "#FFFFFF", // White background for KPI cards
    borderRadius: 8, // Rounded corners
    shadowColor: "#000", // Shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Elevation for Android
    marginBottom: 20,
    gap: 20,
    height: 300,
    marginTop: 80,
    marginHorizontal: 40,
  },
  text: {
    textAlign: "center",
  },
  metricText: {
    textAlign: "center",
    fontStyle: "italic",
    color: palette.mainBlue,
  },
  video: {
    width: 600,
    height: 620,
    position: "absolute",
    top: -100,
  },
});

export default KPIHeader;
