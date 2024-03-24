import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

  // Returns the next button component

const NextButton = ({ buttonColor, title ,scrollTo }) => {
  // The button color is determined by the buttonColor prop
  // The scrollTo prop is a function that is called when the button is pressed
  // The title prop is the text displayed on the button
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

export default NextButton;

// Styles

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
    fontFamily: "poppins-medium",
  },
});
