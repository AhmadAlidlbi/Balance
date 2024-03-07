import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Iconify } from "react-native-iconify";

const Settings = ({ navigation }) => {
  const handleChangePassword = () => {
    navigation.navigate("ChangePassword");
  };

  const handleAbout = () => {
    navigation.navigate("About");
  };

  const handleTerms = () => {
    navigation.navigate("Terms");
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Iconify icon="majesticons:key-line" size={30} color="#3A3FD3" />
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAbout}>
          <Iconify icon="majesticons:info-circle" size={30} color="#3A3FD3" />
          <Text style={styles.buttonText}>About</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleTerms}>
          <Iconify
            icon="majesticons:paper-fold-text"
            size={30}
            color="#3A3FD3"
          />
          <Text style={styles.buttonText}>Terms & Conditions</Text>
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
});

export default Settings;
