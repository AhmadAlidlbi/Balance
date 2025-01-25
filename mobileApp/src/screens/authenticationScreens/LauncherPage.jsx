import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import PrimaryButton from "../../components/PrimaryButton";
import { useLogin } from "../../context/LoginProvider";

const LauncherPage = ({ navigation }) => {
  const { theme, language } = useLogin();

  return (
    <View style={[styles.container, {backgroundColor: theme === "dark" ? "#000000" : "#ffffff"}]}>
      <View style={styles.logo}>
        <Image source={
                theme === "dark"
                  ? require("../../assets/images/darkModeLogo.png")
                  : require("../../assets/images/logo.png")
              } />
      </View>

      <View>
        <Text style={[styles.title, {color: theme === "dark" ? "#ffffff" : "#000000" }]}>Balance</Text>
      </View>
      
      <View style={{ marginBottom: 10 }}>
        <PrimaryButton
          onPress={() => {
            navigation.navigate("Register");
          }}
          title={language === "English" ? "Sign up": "Üye ol"}
          buttonColor={false}
        />
      </View>

      <View>
        <PrimaryButton
          onPress={() => navigation.navigate("Login")}
          title={language === "English" ? "Login": "Giriş Yap"}
          buttonColor={true}
        />
      </View>
    </View>
  );
};

export default LauncherPage;

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
