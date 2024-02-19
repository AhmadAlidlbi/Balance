import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PrimaryButton = ({ title, buttonColor, textColor }) => {
  return (
    <View
      style={[
        styles.button,
        { backgroundColor: buttonColor ? "#3238FF" : "#000000" },
      ]}
    >
      <Text style={styles.text}>{title}</Text>
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
    margin: 5,
  },
  text: {
    fontSize: 16,
    color: "#fff",
  },
});

export default PrimaryButton;
