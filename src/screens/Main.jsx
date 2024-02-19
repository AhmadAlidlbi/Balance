import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import PrimaryButton from "../components/PrimaryButton";

const Main = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={require("../assets/images/BalanceLogo.jpg")} />
      </View>
      <View>
        <Text style={styles.heading}>Balance</Text>
      </View>
      <View>
        <PrimaryButton title="Sign Up" buttonColor={false} />
        <PrimaryButton title="Login" buttonColor={true} />
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
  logo: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 30,
    marginBottom: 20,
  },
});

export default Main;
