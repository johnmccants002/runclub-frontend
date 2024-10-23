import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AnimatedText from "../../../components/animated/AnimatedText";
import { defaultStyles } from "../../../constants/Styles";

import { ResizeMode, Video } from "expo-av";
import { Link } from "expo-router";
import AnimatedSlideText from "../../../components/animated/AnimateSlideText";
import { Colors } from "../../../constants/Colors";
import SplashScreen from "../SplashScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import EventsModal from "@/components/EventsModal";
import axios from "@/middleware/axios";
import { BASE_URL } from "@/constants";

type Props = {};

const LandingScreen = (props: Props) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [eventsModalVisible, setEventsModalVisible] = useState(false);
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    if (videoLoaded) {
      setTimeout(() => {
        setShowVideo(true);

        const fetchEvents = async () => {
          try {
            const response = await axios.get(`${BASE_URL}/events/basic`);
            console.log(response.data.events[0].location);
            setEventsData(response.data.events);
          } catch (err) {
            console.error("Error fetching events:", err);
          }
        };

        fetchEvents(); // Call the function inside the useEffect
      }, 3000);
    }
  }, [videoLoaded]);

  const phrases = ["More Exercise", "More Friends", "More Vibes"];

  return (
    <View style={styles.container}>
      <Video
        resizeMode={ResizeMode.COVER}
        isMuted
        isLooping
        shouldPlay
        source={require("../../../assets/videos/runclub.mp4")}
        style={styles.video}
        onLoad={() => setVideoLoaded(true)} // Set videoLoaded to true when video is loaded
      />

      {videoLoaded && showVideo ? (
        <>
          <View style={styles.textContainer}>
            {phrases.map((phrase, index) => (
              <AnimatedText key={index} text={phrase} index={index} />
            ))}
          </View>

          <AnimatedSlideText text="916 RUN CLUB" />

          <View style={styles.buttons}>
            <Link
              href={"/login"}
              style={[
                defaultStyles.pillButton,
                { flex: 1, backgroundColor: Colors.primary.dark },
              ]}
              asChild
            >
              <TouchableOpacity>
                <Text
                  style={{ color: "white", fontSize: 22, fontWeight: "500" }}
                >
                  Log in
                </Text>
              </TouchableOpacity>
            </Link>
            <Link
              href={"/signup"}
              style={[
                defaultStyles.pillButton,
                { flex: 1, backgroundColor: "#fff" },
              ]}
              asChild
            >
              <TouchableOpacity>
                <Text style={{ fontSize: 22, fontWeight: "500" }}>Sign up</Text>
              </TouchableOpacity>
            </Link>
          </View>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "50%",
              flexDirection: "row",
              marginBottom: 40,
              gap: 12,
              height: 40,

              backgroundColor: "white",
              alignSelf: "center",
              borderRadius: 20,
            }}
            onPress={() => setEventsModalVisible(true)}
          >
            <Text style={{ fontSize: 18, textAlign: "center" }}>
              View Future Events
            </Text>
          </TouchableOpacity>
          <EventsModal
            events={eventsData}
            visible={eventsModalVisible}
            onClose={() => setEventsModalVisible(false)}
          />
        </>
      ) : (
        <SplashScreen />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "black",
  },
  textContainer: {
    marginTop: 80,
    padding: 20,
    zIndex: 2,

    height: Dimensions.get("screen").height - 400,
  },
  video: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  header: {
    fontSize: 36,
    fontWeight: "900",
    textTransform: "uppercase",
    color: "white",
  },
  reportCallHeader: {
    fontSize: 36,
    fontWeight: "900",
    textTransform: "uppercase",
    color: "white",
    padding: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
});

export default LandingScreen;
