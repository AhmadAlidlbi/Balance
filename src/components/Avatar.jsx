import React, { useState } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { Iconify } from "react-native-iconify";
import * as ImagePicker from "expo-image-picker";

const Avatar = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [imageModalVisible, setImageModalVisible] = useState(false);

  const uploadImage = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        await saveImage(result.assets[0].uri);
      }
    } catch (error) {
      alert("Error uploading image" + error.message);
      setModalVisible(false);
    }
  };

  const saveImage = async (image) => {
    try {
      setImage(image);
      setModalVisible(false);
    } catch (error) {
      throw error;
    }
  };

  const handleRemovePress = () => {
    try {
      setImage(null);
      setModalVisible(false);
    } catch (error) {
      alert("Error removing image" + error.message);
      setModalVisible(false);
    }
  };

  const handleCancelPress = () => {
    setModalVisible(false);
  };

  const HandlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setModalVisible(false);
    }
  };

  const handleOpenImage = () => {
    if (image) {
      setImageModalVisible(true);
    }
  };

  const handleImageModalClose = () => {
    setImageModalVisible(false);
  };

  return (
    <View>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={handleOpenImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <Image
              source={require("../assets/images/profilePlaceholder.png")}
              style={styles.profileImage}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: "#ffffff",
            padding: 5,
            borderRadius: 20,
          }}
        >
          <Iconify icon="majesticons:edit-pen-2" color="#555555" size={24} />
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setImageModalVisible(false)}
        transparent={true} // Set modal to transparent
      >
        <Pressable onPress={handleCancelPress} style={styles.background}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={uploadImage} style={styles.icons}>
              <Iconify icon="majesticons:camera" color="#000000" size={30} />
              <Text>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={HandlePickImage} style={styles.icons}>
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

      <Modal
        visible={imageModalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
        transparent={true}
      >
        <Pressable onPress={handleImageModalClose} style={styles.background}>
          <Image source={{ uri: image }} style={styles.fullProfileImage} />
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
  container: {
    marginBottom: 180,
    alignItems: "center",
    position: "relative",
  },
  imageIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#ffffff",
    padding: 5,
    borderRadius: 20,
  },
  imageContainer: {
    marginBottom: 20,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  fullProfileImage: {
    width: "90%",
    height: 400,
    borderRadius: 10,
  },
});

export default Avatar;