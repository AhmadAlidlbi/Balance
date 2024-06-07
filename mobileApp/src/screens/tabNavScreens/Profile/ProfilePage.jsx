import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Modal,
  StyleSheet,
  Pressable,
} from "react-native";
import { Iconify } from "react-native-iconify";
import { useLogin } from "../../../context/LoginProvider";
import localStorage from "@react-native-async-storage/async-storage";
import { removeToken } from "../../../../utils/storage";
import { BASE_URL } from "../../../../utils/config";
import { CommonActions } from "@react-navigation/native";

const ProfilePage = ({ navigation }) => {
  const { setIsLoggedIn, profile, setProfile, theme, toggleTheme, language  } = useLogin();
  const [modalVisible, setModalVisible] = useState(false);

  const handlePersonal = () => {
    navigation.navigate("PersonalInfo");
  };

  const handleSettings = () => {
    navigation.navigate("Settings");
  };

  const handleLogout = () => {
    Alert.alert(
      language === "English" ? "Logout": "Çıkış Yap",
      language === "English" ? "Are you sure you want to logout?": "Oturumu kapatmak istediğinizden emin misiniz?",
      [
        {
          text: language === "English" ? "Cancel": "Vazgeç",
          style: "cancel",
        },
        {
          text: language === "English" ? "Logout": "Çıkış Yap",
          onPress: () => {
            removeToken();
            setIsLoggedIn(false);
            setProfile({});

            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Login" }],
              })
            );
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme === "dark" ? "#000000" : "#ffffff" }]}>
      <View style={styles.headingContainer}>
        <Text style={[styles.heading, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>{language === "English" ? "My Profile": "Profilim"}</Text>
      </View>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image
          style={styles.profileImage}
          source={
            profile.avatar
              ? { uri: BASE_URL + "/uploads/" + profile.avatar }
              : require("../../../assets/images/profilePlaceholder.png")
          }
        />
      </TouchableOpacity>

      <Text style={[styles.name, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>{profile.fullName}</Text>

      <Text style={[styles.profession, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>{profile.profession}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: theme === "dark" ? "#292929" : "#E9E9E9" }]} onPress={handlePersonal}>
          <Iconify icon="majesticons:user-box-line" size={30} color="#3a3fd3" />
          <Text style={[styles.buttonText, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>{language === "English" ? "Personal Information": "Kişisel bilgi"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: theme === "dark" ? "#292929" : "#E9E9E9" }]} onPress={handleSettings}>
          <Iconify
            icon="majesticons:settings-cog-line"
            size={30}
            color="#3a3fd3"
          />
          <Text style={[styles.buttonText, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>{language === "English" ? "Settings": "Ayarlar"}</Text>
        </TouchableOpacity>
      </View>
    
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: theme === "dark" ? "#292929" : "#E9E9E9" }]} onPress={handleLogout}>
          <Iconify icon="majesticons:logout-line" size={30} color="#9B0000" />
          <Text style={[styles.buttonText, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>{language === "English" ? "Log out": "Çıkış Yap"}</Text>
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalContainer} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <Image
              style={styles.modalImage}
              source={profile.avatar ? { uri: BASE_URL + '/uploads/' + profile.avatar } : require("../../../assets/images/profilePlaceholder.png")}
            />
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  headingContainer: {
    marginTop: 20,
  },
  heading: {
    fontSize: 25,
    marginBottom: 30,
    fontFamily: "poppins-medium",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontFamily: "poppins-medium",
    marginBottom: 10,
  },
  profession: {
    fontSize: 16,
    fontFamily: "poppins",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#E9E9E9",
    height: 55,
    borderRadius: 7,
    marginBottom: 20,
    width: 350,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 10,
  },
  buttonText: {
    color: "#000000",
    fontFamily: "poppins",
    fontSize: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    // backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
};

export default ProfilePage;
