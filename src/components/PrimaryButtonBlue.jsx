import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PrimaryButtonBlue = () => {
  return (
    <View style={styles.button}>
      <Text style={styles.login}>Login</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    height: 42,
    width: 251,
    backgroundColor: "#3238FF",
  },
  login: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
    color: "#fff",
    textAlign: "left",
  },
});

export default PrimaryButtonBlue;
