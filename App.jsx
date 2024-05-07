import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import axios from "axios";
import { Cloudinary } from "@cloudinary/url-gen";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import LoginProvider from "./src/context/LoginProvider";

export default function App() {
  const fetchApi = async () => {
    try {
      const res = await axios.get("http://192.168.1.34:3000/");
      console.log(res.data);
    } catch (error) {
      console.log("Axios Error:", error.message);
      console.log("Status Code:", error.response.status);
      console.log("Response Data:", error.response.data);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const cld = new Cloudinary({ cloud: { cloudName: "dwwvw37yy" } });

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
    <NavigationContainer>
      <StatusBar style="auto" />
      <LoginProvider>
        <AppNavigator />
      </LoginProvider>
    </NavigationContainer>
  );
}