import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import PrimaryButtonBlue from "../components/PrimaryButtonBlue";

const Main = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={require("../assets/images/BalanceLogo.jpg")} />
      </View>
      <View>
        <Text style={styles.heading}>Balance</Text>
      </View>
      <View>
        <PrimaryButtonBlue title="Sign Up" buttonColor={false}/>
        <PrimaryButtonBlue title="Login" buttonColor={true}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo:{
    marginBottom: 20,
  },
  heading:{
    fontSize: 30,
  }
});

export default Main;
