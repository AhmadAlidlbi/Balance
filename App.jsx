import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import PrimaryButtonBlue from "./src/components/PrimaryButtonBlue";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <PrimaryButtonBlue />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
