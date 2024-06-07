import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

const SmallButton = ({ title, buttonColor, onPress,style }) => {
  return (
    <View style={[styles.buttonContainer,style]}>
      <TouchableOpacity style={[
        styles.button,
        { backgroundColor: buttonColor ? "#3238FF" : "#f31246" },
      ]}
      onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
  },
  button: {
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: "center",
    width: 150,
    backgroundColor: "#3a3fd3",
    marginHorizontal: 8,
    marginVertical: 8,
  },
  buttonText: {
    color: "#ffffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SmallButton;
