import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const SecondaryButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 13,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
    width: 360,
    backgroundColor: "#3a3fd3",
  },
  buttonText: {
    color: "#ffffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SecondaryButton;
