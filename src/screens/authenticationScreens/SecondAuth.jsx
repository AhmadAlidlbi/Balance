import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";

const SecondAuth = ({ navigation }) => {
  // State variables to store the username, password, and confirm password
  // The setUsername, setPassword, and setConfirmPassword functions are used to update the state variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUsernameChange = (Username) => {
    setUsername(Username);
  };
  // The handleUsernameChange function updates the username state variable with the value of the input field

  const handlePasswordChange = (Password) => {
    setPassword(Password);
  };
  // The handlePasswordChange function updates the password state variable with the value of the input field

  const handleConfirmPasswordChange = (ConfirmPassword) => {
    setConfirmPassword(ConfirmPassword);
  };
  // The handleConfirmPasswordChange function updates the confirmPassword state variable with the value of the input field

  const handleSignUp = () => {
    // if (username === "" || password === "" || confirmPassword === "") {
    //   Alert.alert("Error", "Please fill all fields");
    //   return;
    // }
    // if (password !== confirmPassword) {
    //   Alert.alert("Error", "Passwords do not match");
    //   return;
    // }
    navigation.navigate("OnboardingTutorial");

    // Reset password fields
    setPassword("");
    setConfirmPassword("");

    // Show success message
    Alert.alert("Sign up successful");
  };

  return (
    // The KeyboardAvoidingView component is used to ensure that the input fields are not hidden by the keyboard
    // The behavior prop is set to "padding" for iOS and "height" for Android
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {/* Logo */}
      <View>
        <Image
          style={styles.logo}
          source={require("../../assets/images/BalanceLogo.jpg")}
        />
      </View>

      {/* Title */}
      <View>
        <Text style={styles.title}>Create account</Text>
      </View>

      {/* Input field component */}
      <View>
        <InputField
          iconName={"user"}
          placeholder={"Username"}
          value={username}
          onChange={handleUsernameChange}
          type="username"
          required={true}
        />
      </View>

      {/* Input field component */}
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

      {/* Input field component */}
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

      {/* Primary button component */}
      <View style={styles.buttonContainer}>
        <PrimaryButton
          onPress={handleSignUp}
          title="Sign up"
          buttonColor={true}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default SecondAuth;

//styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginBottom: 100,
  },
  logo: {
    width: 86,
    height: 92,
    marginBottom: 20,
  },
  title: {
    fontFamily: "poppins-medium",
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
