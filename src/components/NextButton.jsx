import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const NextButton = ({ buttonColor, title ,scrollTo }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: buttonColor ? "#3a3fd3" : "#000000" },
      ]}
      onPress={scrollTo}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 13,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: "center",
    width: 350,
  },
  buttonText: {
    color: "#ffffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NextButton;