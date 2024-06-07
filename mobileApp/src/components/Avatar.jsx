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
import { useLogin } from "../context/LoginProvider";
import { BASE_URL } from "../../utils/config";
import { deleteProfileImage } from "../../api/user";

const Avatar = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState("");
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const { profile, theme, language  } = useLogin();

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

  const saveImage = async (imageUri) => {
    try {
      setImage(imageUri);
      props.uploadImage(imageUri);
      setModalVisible(false);
    } catch (error) {
      throw error;
    }
  };

  const deleteImageHandler = async () => {
    try {
      const res = await deleteProfileImage();
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleRemovePress = async () => {
    try {
      // Remove the image from the frontend
      setImage(null);
      props.uploadImage(null);

      // Remove the image from the backend
      await deleteProfileImage();

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
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        props.uploadImage(result.assets[0].uri);
        setModalVisible(false);
      }
    }
  };

  const handleOpenImage = () => {
    if (profile.avatar || image) {
      setImageModalVisible(true);
    }
  };

  const handleImageModalClose = () => {
    setImageModalVisible(false);
  };

  return (
    <>
      <View>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={handleOpenImage}>
            <Image
              source={
                image
                  ? { uri: image }
                  : profile.avatar
                  ? { uri: BASE_URL + "/uploads/" + profile.avatar }
                  : require("../assets/images/profilePlaceholder.png")
              }
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={[styles.imageIcon, { backgroundColor: theme === "dark" ? "#555555" : "#ffffff" }]}
          >
            <Iconify icon="majesticons:edit-pen-2" color={theme === "dark" ? "#ffffff" : "#555555"} size={24} />
          </TouchableOpacity>
        </View>
        <Modal
          visible={modalVisible}
          animationType="fade"
          onRequestClose={handleCancelPress}
          transparent={true}
        >
          <Pressable onPress={handleCancelPress} style={styles.background}>
            <View style={[styles.modalContainer, { backgroundColor: theme === "dark" ? "#292929" : "#ffffff" }]}>
              <TouchableOpacity onPress={uploadImage} style={styles.icons}>
                <Iconify icon="majesticons:camera" color={theme === "dark" ? "#ffffff" : "#000000"} size={30} />
                <Text style={{ color: theme === "dark" ? "#ffffff" : "#000000", marginTop: 5 }}>{language === "English" ? "Camera": "Kamera"}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={HandlePickImage} style={styles.icons}>
                <Iconify
                  icon="majesticons:image-plus"
                  color={theme === "dark" ? "#ffffff" : "#000000"}
                  size={30}
                />
                <Text style={{ color: theme === "dark" ? "#ffffff" : "#000000", marginTop: 5 }}>{language === "English" ? "Gallery": "Galeri"}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleRemovePress} style={styles.icons}>
                <Iconify
                  icon="majesticons:delete-bin"
                  color={theme === "dark" ? "#ffffff" : "#000000"}
                  size={30}
                />
                <Text style={{ color: theme === "dark" ? "#ffffff" : "#000000", marginTop: 5 }}>{language === "English" ? "Remove": "Sil"}</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>

        <Modal
          visible={imageModalVisible}
          animationType="fade"
          onRequestClose={handleImageModalClose}
          transparent={true}
        >
          <Pressable onPress={handleImageModalClose} style={styles.background}>
            <Image
              source={
                image
                  ? { uri: image }
                  : profile.avatar
                  ? { uri: BASE_URL + "/uploads/" + profile.avatar }
                  : require("../assets/images/profilePlaceholder.png")
              }
              style={styles.fullProfileImage}
            />
          </Pressable>
        </Modal>
      </View>
    </>
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
