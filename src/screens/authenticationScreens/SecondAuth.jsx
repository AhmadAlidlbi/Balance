import React, { useState } from "react";
import { View, StyleSheet, Image, Text, Alert } from "react-native";
import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";

const SecondAuth = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailChange = (Email) => {
    setEmail(Email);
  };

  const handlePasswordChange = (Password) => {
    setPassword(Password);
  };

  const handleConfirmPasswordChange = (ConfirmPassword) => {
    setConfirmPassword(ConfirmPassword);
  };

  const handleSignUp = () => {
    // if (email === "" || password === "" || confirmPassword === "") {
    //   Alert.alert("Error", "Please fill all fields");
    //   return;
    // }
    // if (password !== confirmPassword) {
    //   Alert.alert("Error", "Passwords do not match");
    //   return;
    // }
    navigation.navigate("OnboardingTutorial");

    // Perform sign up logic here

    // Reset password fields
    setPassword("");
    setConfirmPassword("");

    // Show success message
    Alert.alert("Success", "Sign up successful");
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.logo}
          source={require("../../assets/images/BalanceLogo.jpg")}
        />
      </View>

      <View>
        <Text style={styles.title}>Create Account</Text>
      </View>

      <View>
        <InputField
          iconName={"user"}
          placeholder={"Email"}
          value={email}
          onChange={handleEmailChange}
          type="email"
          required={true}
        />
      </View>

      <View>
        <InputField
          iconName={"lock"}
          placeholder={"Password"}
          name={"password"}
          value={password}
          onChange={handlePasswordChange}
          type="password"
          secureTextEntry={true}
          required={true}
        />
      </View>

      <View>
        <InputField
          iconName={"lock"}
          placeholder={"Password confirmation"}
          name={"passwordConfirmation"}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          type="password"
          secureTextEntry={true}
          required={true}
        />
      </View>

      <View style={styles.buttonContainer}>
        <PrimaryButton
          onPress={handleSignUp}
          title="Sign Up"
          buttonColor={true}
        />
      </View>
    </View>
  );
};

export default SecondAuth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingBottom: 170,
  },
  logo: {
    width: 86,
    height: 92,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
  },
  forgotPassword: {
    color: "#625F60",
    fontSize: 12,
    margin: 12,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
