import React, { useState } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import LoginProvider from "./src/context/LoginProvider";
import { LogBox } from "react-native";

export default function App() {
  const scheme = useColorScheme();
  const [theme, setTheme] = useState(scheme === "dark" ? "dark" : "light");

  const [fontsLoaded, error] = useFonts({
    poppins: require("./src/assets/fonts/Poppins-Regular.ttf"),
    "poppins-semibold": require("./src/assets/fonts/Poppins-SemiBold.ttf"),
    "poppins-bold": require("./src/assets/fonts/Poppins-Bold.ttf"),
    "poppins-extrabold": require("./src/assets/fonts/Poppins-ExtraBold.ttf"),
    "poppins-light": require("./src/assets/fonts/Poppins-Light.ttf"),
    "poppins-extralight": require("./src/assets/fonts/Poppins-ExtraLight.ttf"),
    "poppins-thin": require("./src/assets/fonts/Poppins-Thin.ttf"),
    "poppins-medium": require("./src/assets/fonts/Poppins-Medium.ttf"),
  });
  console.log("Fonts Loaded:", fontsLoaded);
  LogBox.ignoreLogs([
    "Warning: componentWillReceiveProps has been renamed",
    /GraphQL error: .*/,
  ]);

  // Ignore all log notifications
  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <LoginProvider>
        {/* {fontsLoaded ? <AppNavigator /> : null} */}
        <AppNavigator theme={theme} setTheme={setTheme} />
      </LoginProvider>
    </NavigationContainer>
  );
}
