import React, { useState } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { Iconify } from "react-native-iconify";

const UploadImageModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleCameraPress = () => {
    // Handle camera button press
  };

  const handleGalleryPress = () => {
    // Handle gallery button press
  };

  const handleRemovePress = () => {
    // Handle remove button press
  };

  const handleCancelPress = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <Modal
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
        transparent={true} // Set modal to transparent
      >
        <Pressable onPress={handleCancelPress} style={styles.background}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={handleCameraPress} style={styles.icons}>
              <Iconify icon="majesticons:camera" color="#000000" size={30} />
              <Text>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleGalleryPress} style={styles.icons}>
              <Iconify
                icon="majesticons:image-plus"
                color="#000000"
                size={30}
              />
              <Text>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRemovePress} style={styles.icons}>
              <Iconify
                icon="majesticons:delete-bin"
                color="#000000"
                size={30}
              />
              <Text>Remove</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 1)",
    justifyContent: "center",
    gap: 40,
    alignItems: "center",
    width: 350,
    height: 150,
    borderRadius: 10,
  },
  icons: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});

export default UploadImageModal;
