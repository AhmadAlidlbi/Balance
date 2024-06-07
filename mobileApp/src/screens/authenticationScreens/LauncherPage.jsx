import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import PrimaryButton from "../../components/PrimaryButton";
import { useLogin } from "../../context/LoginProvider";

const LauncherPage = ({ navigation }) => {
  const { theme } = useLogin();

  return (
    <View style={[styles.container, {backgroundColor: theme === "dark" ? "#000000" : "#ffffff"}]}>
      {/* Logo */}
      <View style={styles.logo}>
        <Image source={
                theme === "dark"
                  ? require("../../assets/images/darkModeLogo.png")
                  : require("../../assets/images/logo.png")
              } />
      </View>

      {/* Title */}
      <View>
        <Text style={[styles.title, {color: theme === "dark" ? "#ffffff" : "#000000" }]}>Balance</Text>
      </View>
      
      {/* Primary button component */}
      <View style={{ marginBottom: 10 }}>
        <PrimaryButton
          // Navigates to the Auth screen
          onPress={() => {
            navigation.navigate("Register");
          }}
          title="Sign Up"
          buttonColor={false}
        />
      </View>

      {/* Primary button component */}
      <View>
        <PrimaryButton
          // Navigates to the Login screen
          onPress={() => navigation.navigate("Login")}
          title="Login"
          buttonColor={true}
        />
      </View>
    </View>
  );
};

export default LauncherPage;

// Styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingBottom: 100,
  },
  logo: {
    marginBottom: 20,
  },
  title: {
    fontFamily: "poppins-medium",
    fontSize: 30,
    marginBottom: 20,
  },
});
