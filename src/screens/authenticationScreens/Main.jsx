import React from "react"; 
import { View, Text, Image, StyleSheet } from "react-native";
import PrimaryButton from "../../components/PrimaryButton";

// Main screen component for the authentication screens

const Main = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logo}>
        <Image source={require("../../assets/images/BalanceLogo.jpg")} />
      </View>

      {/* Title */}
      <View>
        <Text style={styles.title}>Balance</Text>
      </View>

      {/* Primary button component */}
      <View style={{ marginBottom: 10 }}>
        <PrimaryButton
        // Navigates to the Auth screen
          onPress={() => {
            navigation.navigate("Auth");
          }}
          title="Sign Up"
          buttonColor={false}
        />
      </View>

      {/* Primary button component */}
      <View>
        <PrimaryButton
        // Navigates to the Login screen
          onPress={() => navigation.navigate("Login")} 
          title="Login" 
          buttonColor={true}
        />
      </View>
    </View>
  );
};

export default Main;

// Styles

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
  },
  title: {
    fontFamily: "poppins-medium",
    fontSize: 30,
    marginBottom: 20,
  },
});

