import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Iconify } from "react-native-iconify";
import { useLogin } from "../../../../context/LoginProvider";

const SettingsPage = ({ navigation }) => {
  const { theme, toggleTheme, language, soundEnabled, toggleSound } =
    useLogin();

  const handleChangePassword = () => {
    navigation.navigate("ChangePassword");
  };

  const handleAbout = () => {
    navigation.navigate("About");
  };

  const handleTerms = () => {
    navigation.navigate("Terms & Conditions");
  };

  const handleToggleDarkMode = () => {
    toggleTheme();
  };

  const handleToggleSounds = () => {
    toggleSound();
  };

  const handleLanguage = () => {
    navigation.navigate("Language");
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "#000000" : "#ffffff" },
      ]}
    >
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: theme === "dark" ? "#292929" : "#E9E9E9" },
          ]}
          onPress={handleChangePassword}
        >
          <Iconify icon="majesticons:key-line" size={30} color="#3A3FD3" />
          <Text
            style={[
              styles.buttonText,
              { color: theme === "dark" ? "#ffffff" : "#000000" },
            ]}
          >
            {language === "English" ? "Change Password" : "Şifre değiştir"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: theme === "dark" ? "#292929" : "#E9E9E9" },
          ]}
          onPress={handleAbout}
        >
          <Iconify icon="majesticons:info-circle" size={30} color="#3A3FD3" />
          <Text
            style={[
              styles.buttonText,
              { color: theme === "dark" ? "#ffffff" : "#000000" },
            ]}
          >
            {language === "English" ? "About" : "Uygulama hakkında"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: theme === "dark" ? "#292929" : "#E9E9E9" },
          ]}
          onPress={handleTerms}
        >
          <Iconify
            icon="majesticons:paper-fold-text"
            size={30}
            color="#3A3FD3"
          />
          <Text
            style={[
              styles.buttonText,
              { color: theme === "dark" ? "#ffffff" : "#000000" },
            ]}
          >
            {language === "English"
              ? "Terms & Conditions"
              : "Şartlar ve Koşullar"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: theme === "dark" ? "#292929" : "#E9E9E9" },
          ]}
          onPress={handleLanguage}
        >
          <Iconify icon="material-symbols:language" size={30} color="#3A3FD3" />
          <Text
            style={[
              styles.buttonText,
              { color: theme === "dark" ? "#ffffff" : "#000000" },
            ]}
          >
            {language === "English" ? "Language" : "Dil"}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.switchContainer,
          { backgroundColor: theme === "dark" ? "#292929" : "#E9E9E9" },
        ]}
      >
        {theme === "dark" ? (
          <Iconify icon="ph:sun-fill" size={30} color="#3A3FD3" />
        ) : (
          <Iconify icon="majesticons:moon" size={30} color="#3A3FD3" />
        )}
        <Text
          style={[
            styles.switchLabel,
            { color: theme === "dark" ? "#ffffff" : "#000000" },
          ]}
        >
          {language === "English"
            ? theme === "dark"
              ? "Light Mode"
              : "Dark Mode"
            : theme === "dark"
            ? "Işık Modu"
            : "Karanlık Modu"}
        </Text>
        <TouchableOpacity
          style={[
            styles.switch,
            { backgroundColor: theme === "dark" ? "#3a3fd3" : "#797979" },
          ]}
          onPress={handleToggleDarkMode}
        >
          <View
            style={[
              styles.switchButton,
              { marginLeft: theme === "dark" ? 25 : 5 },
            ]}
          />
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.switchContainer,
          { backgroundColor: theme === "dark" ? "#292929" : "#E9E9E9" },
        ]}
      >
        {soundEnabled ? (
          <Iconify icon="fa6-solid:volume-low" size={30} color="#3A3FD3" />
        ) : (
          <Iconify icon="fa6-solid:volume-xmark" size={30} color="#3A3FD3" />
        )}
        <Text
          style={[
            styles.switchLabel,
            { color: theme === "dark" ? "#ffffff" : "#000000" },
          ]}
        >
          {language === "English" ? "Sounds" : "Sesler"}
        </Text>
        <TouchableOpacity
          style={[
            styles.switch,
            { backgroundColor: soundEnabled ? "#2a9c2a" : "#ff0000" },
          ]}
          onPress={handleToggleSounds}
        >
          <View
            style={[styles.switchButton, { marginLeft: soundEnabled ? 25 : 5 }]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingTop: 30,
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
    fontSize: 16,
  },
  switchContainer: {
    backgroundColor: "#E9E9E9",
    height: 55,
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    width: 350,
    paddingHorizontal: 12,
    marginBottom: 20,
    gap: 10,
  },
  switchLabel: {
    flex: 1,
    color: "#000000",
    fontFamily: "poppins",
    fontSize: 16,
  },
  switch: {
    width: 50,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
  },
  switchButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
});

export default SettingsPage;
