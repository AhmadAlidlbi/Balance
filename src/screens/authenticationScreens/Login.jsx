import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import PrimaryButton from "../../components/PrimaryButton";
import InputField from "../../components/InputField";

const Login = ({ navigation }) => {
  // State variables to store the username and password
  // The setUsername and setPassword functions are used to update the state variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (Username) => {
    setUsername(Username);
  };

  const handlePasswordChange = (Password) => {
    setPassword(Password);
  };
  // The handlePasswordChange function updates the password state variable with the value of the input field

  const handleForgotPassword = () => {
    // TODO: forget password logic here
  };

  const handleLogin = () => {
    // if (username === "" || password === "") {
    //   alert("Please fill all fields");
    //   return;
    // }
    navigation.navigate("InAppStack");
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
        <Text style={styles.title}>Login to your account</Text>
      </View>

      {/* Input field component */}
      <View>
        <InputField
          iconName={"user"}
          placeholder={"Username"}
          value={username}
          onChange={handleUsernameChange}
          type="username"
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
        />
      </View>

      {/* Forgot password */}
      <View>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      {/* Primary button component */}
      <View>
        <PrimaryButton title="Login" buttonColor={true} onPress={handleLogin} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

// Styles

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
    marginBottom: 20,
    marginTop: 10,
  },
  forgotPassword: {
    fontFamily: "poppins",
    color: "#625F60",
    fontSize: 12,
    margin: 15,
  },
});

