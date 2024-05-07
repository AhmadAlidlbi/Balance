import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import PrimaryButton from "../../components/PrimaryButton";

// Main screen component for the authentication screens

const LauncherPage = ({ navigation }) => {
  // console.log("Main screen");
  // const test = async () => {
  //   console.log("Test function called");
  //   const response1 = await axios
  //     .post("http://10.0.2.2:3000/api/register", {
  //       fullName: "Ahma111d123123",
  //       email: "ahmedidlbi1a1111sda4444sd1@hotmail.com",
  //       password: "1234567812312312",
  //       confirmPassword: "1234567812312312",
  //     })
  //     .then((response) => {
  //       console.log("Response:", response.data);
  //     })
  //     .catch((error) => {
  //       console.log("Error:", error);
  //     });
  //   console.log(response1);
  // };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logo}>
        <Image source={require("../../assets/images/BalanceLogo.jpg")} />
      </View>

      {/* Title */}
      <View>
        <Text style={styles.title}>Balance</Text>
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
