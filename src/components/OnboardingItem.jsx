import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";

const OnboardingItem = ({ item }) => {
  const { width } = useWindowDimensions();

  // The item prop is an object that contains the image, title, and description of the onboarding item
  // The width of the onboarding item is determined by the useWindowDimensions hook

  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.image}
        style={[styles.image, { width: 300, resizeMode: "contain" }]}
      />
      <View >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
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

