import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const PrimaryButton = ({ title, buttonColor, onPress }) => {
  return (
    <View
      style={[
        styles.buttonOuterContainer,
        { backgroundColor: buttonColor ? "#3238FF" : "#000000" },
      ]}
    >
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
      >
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 25,
    alignItems: "center",
    margin: 5,
    overflow: "hidden",
    width: 251,
  },
  buttonInnerContainer: {
    elevation: 2,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    width: 251,
  },
  text: {
    fontSize: 16,
    color: "#fff",
  },
  pressed: {
    opacity: 0.25,
  },
});

export default PrimaryButton;
