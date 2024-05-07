import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { Iconify } from "react-native-iconify";
import { useLogin } from "../../../context/LoginProvider";

const ProfilePage = ({ navigation }) => {
  const { setIsLoggedIn, profile } = useLogin();

  const handlePersonal = () => {
    navigation.navigate("PersonalInfo");
  };

  const handleSettings = () => {
    navigation.navigate("Settings");
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: () => {
            setIsLoggedIn(false);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>My Profile</Text>
      </View>

      <Image
        style={styles.profileImage}
        source={profile.avatar ? { uri: profile.avatar } : require("../../../assets/images/profilePlaceholder.png")}
      />

      <Text style={styles.name}>{profile.fullName}</Text>

      <Text style={styles.profession}>Software Engineering Student</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePersonal}>
          <Iconify icon="majesticons:user-box-line" size={30} color="#3a3fd3" />
          <Text style={styles.buttonText}>Personal Information</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSettings}>
          <Iconify
            icon="majesticons:settings-cog-line"
            size={30}
            color="#3a3fd3"
          />
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Iconify icon="majesticons:logout-line" size={30} color="#9B0000" />
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
      </View>
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
  buttonContainer: {},
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
};

export default ProfilePage;
