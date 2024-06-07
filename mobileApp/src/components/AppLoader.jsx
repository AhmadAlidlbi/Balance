import React from "react";
import { View, StyleSheet, Text, Image} from "react-native";
import LottieView from "lottie-react-native";

const AppLoader = () => {
  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <LottieView
        source={require("../assets/images/Loading.json")}
        style={{width: "40%", height: "10%"}}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
    zIndex: 1,
  },
});

export default AppLoader;
