import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import PrimaryButton from "../components/PrimaryButton";

const Main = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <View style={styles.logo}>
        <Image source={require("../assets/images/BalanceLogo.jpg")} />
      </View>

      <View>
        <Text style={styles.title}>Balance</Text>
      </View>

      <View style={{ marginBottom: 10 }}>
        <PrimaryButton
          onPress={() => {
            navigation.navigate("Auth");
          }}
          title="Sign Up"
          buttonColor={false}
        />
      </View>

      <View>
        <PrimaryButton
          onPress={() => navigation.navigate("Login")}
          title="Login"
          buttonColor={true}
        />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingBottom: 100,
  },
  logo: {
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
});

export default Main;
