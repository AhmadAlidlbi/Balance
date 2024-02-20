import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const NextButton = ({scrollTo}) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={scrollTo} style={styles.buttonInnerContainer}>
          <Text style={styles.text}>Continue</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 42,
    width: 364,
    borderRadius: 25,
    elevation: 2,
    marginBottom: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3238FF",
    overflow: "hidden",
  },
  buttonInnerContainer: {
    elevation: 2,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    width: 364,
  },
  text: {
    fontSize: 16,
    color: "#ffffff",
  },
});

export default NextButton;
