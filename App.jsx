import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import LandingPage from "./src/navigation/main";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <LandingPage />
    </>
  );
}
