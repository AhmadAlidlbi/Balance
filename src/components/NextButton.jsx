import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';

const NextButton = () => {
    return (
        <View
      style={
        styles.buttonOuterContainer
      }
    >
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
      >
        <Text style={styles.text}></Text>
      </Pressable>
    </View>
    );
};


const styles = StyleSheet.create({
    buttonOuterContainer: {
        backgroundColor: "#3238FF",
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

export default NextButton;
