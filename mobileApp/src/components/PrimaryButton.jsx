import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useLogin } from "../context/LoginProvider";

const PrimaryButton = ({ title, buttonColor, onPress, submitting }) => {

  const { theme } = useLogin();
  // Returns the primary button component
  // The button color is determined by the buttonColor prop
  // The onPress prop is a function that is called when the button is pressed
  // The title prop is the text displayed on the button
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: buttonColor ? "#3a3fd3" : "#000000" },
        { backgroundColor: theme === "dark" ? buttonColor ? "#292929" : "#292929" : buttonColor ? "#3a3fd3" : "#000000"},
        { opacity: submitting ? 0.5 : 1 },
        // If the buttonColor prop is true, the button color is set to #3a3fd3 otherwise it is set to #000000
      ]}
      onPress={!submitting ? onPress : null}
      // Calls the onPress function when the button is pressed
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

// Styles
const styles = StyleSheet.create({
  button: {
    paddingVertical: 13,
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
