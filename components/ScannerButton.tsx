import QRCodeScanner from "@/components/QRCodeScanner";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { View } from "react-native";

// interface Props { }
const SIZE = 38;

const ScannerButton = () => {
  const [toggleModal, setToggleModal] = useState(false);
  const { width } = useWindowDimensions();

  const left = width / 2 - SIZE * 0.9;

  const handleSubmit = () => {
    setToggleModal(false);
  };

  const handleCancel = () => {
    setToggleModal(false);
  };

  return (
    <View
      style={{
        position: "absolute",
        left: left,
        bottom: SIZE * 0.2,
        margin: 0,
        zIndex: 2,
        borderRadius: 24,
        width: SIZE * 1.7,
        height: SIZE * 1.7,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3b5998",
      }}
    >
      <Pressable
        onPress={() => {
          setToggleModal(true);
          // dispatch(createJob(props.jobId));
        }}
        style={{
          width: SIZE * 1.7,
          height: SIZE * 1.7,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MaterialCommunityIcons name="camera" size={SIZE} color={"white"} />
      </Pressable>
      <View
        style={[
          // styles.backdrop,
          // eslint-disable-next-line react-native/no-inline-styles
          { display: toggleModal ? "flex" : "none" },
        ]}
      >
        <Modal
          transparent={true}
          animationType="slide"
          visible={toggleModal}
          onDismiss={() => setToggleModal(false)}
          //   style={styles.modalContainer}
        >
          <Pressable
            onPress={() => setToggleModal(false)}
            // style={styles.backdrop}
          >
            <></>
          </Pressable>

          <QRCodeScanner setToggleModal={setToggleModal} />
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  backdrop: {
    backgroundColor: "rgba(0,0,0,.7)",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalContent: {
    // borderColor: "red",
    // borderWidth: 1,
    flex: 1,
    marginHorizontal: "5%",
    marginVertical: "15%",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
  },
});

export default ScannerButton;
