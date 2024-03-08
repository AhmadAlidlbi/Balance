import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigator from "./src/navigation/MainStackNavigator";
import { useFonts } from "expo-font";

/**
 * The main component of the application.
 * Renders the navigation container and the main stack navigator.
 *
 * @returns {JSX.Element} The rendered component.
 */

export default function App() {
  
  /**
   * Loads the required fonts using the useFonts hook.
   * @returns {Array} An array containing the status of font loading.
   */

  const [fontsLoaded] = useFonts({
    poppins: require("./src/assets/fonts/Poppins-Regular.ttf"),
    "poppins-semibold": require("./src/assets/fonts/Poppins-SemiBold.ttf"),
    "poppins-bold": require("./src/assets/fonts/Poppins-Bold.ttf"),
    "poppins-extrabold": require("./src/assets/fonts/Poppins-ExtraBold.ttf"),
    "poppins-light": require("./src/assets/fonts/Poppins-Light.ttf"),
    "poppins-extralight": require("./src/assets/fonts/Poppins-ExtraLight.ttf"),
    "poppins-thin": require("./src/assets/fonts/Poppins-Thin.ttf"),
    "poppins-medium": require("./src/assets/fonts/Poppins-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </>
  );
}
