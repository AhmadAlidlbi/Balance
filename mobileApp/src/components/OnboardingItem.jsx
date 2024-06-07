import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import { useLogin } from "../context/LoginProvider";

const OnboardingItem = ({ item }) => {
  const { width } = useWindowDimensions();
  const { theme } = useLogin();


  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.image}
        style={[styles.image, { width: 410, resizeMode: "contain" }]}
      />
      <View >
        <Text style={[styles.title, {color: theme === "dark" ? "#ffffff" : "#3a3fd3"}]}>{item.title}</Text>
        <Text style={[styles.description, {color: theme === "dark" ? "#ffffff" : "#62656b"}]}>{item.description}</Text>
      </View>
    </View>
  );
};

export default OnboardingItem;

//Styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  image: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
    width: 400,
    height: 400,
  },
  title: {
    fontFamily: "poppins-bold",
    fontSize: 30,
    marginBottom: 10,
    color: "#3a3fd3",
    textAlign: "center",
  },
  description: {
    fontFamily: "poppins",
    color: "#62656b",
    textAlign: "center",
    paddingHorizontal: 64,
  },
});

