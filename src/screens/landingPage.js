import React from "react";
import { View, Image, StyleSheet, Button, Text } from "react-native";

const LandingPage = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/landingLogo.jpg")}
      />
      <Text style={styles.balance}>Balance</Text>
      <View style={styles.signupButton}>
        <Button title="Sign Up" color="#FFFFFF" />
      </View>
      <View style={styles.loginButton}>
        <Button title="Login" color="#FFFFFF" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {},
  balance: {
    fontSize: 30,
    fontFamily: "poppins",
    fontWeight: "400",
    marginTop: 15,
    marginBottom: 15,
  },
  signupButton: {
    height: 40,
    width: 254,
    borderRadius: 20,
    backgroundColor: "black",
    marginBottom: 15,
  },
  loginButton: {
    height: 40,
    width: 254,
    borderRadius: 20,
    backgroundColor: "#3238FF",
  }
});

export default LandingPage;
