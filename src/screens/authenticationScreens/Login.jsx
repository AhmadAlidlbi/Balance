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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (Username) => {
    setUsername(Username);
  };

  const handlePasswordChange = (Password) => {
    setPassword(Password);
  };

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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View>
        <Image
          style={styles.logo}
          source={require("../../assets/images/BalanceLogo.jpg")}
        />
      </View>
      <View>
        <Text style={styles.title}>Login to your account</Text>
      </View>
      <View>
        <InputField
          iconName={"user"}
          placeholder={"Username"}
          value={username}
          onChange={handleUsernameChange}
          type="username"
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
        />
      </View>
      <View>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
      <View>
        <PrimaryButton title="Login" buttonColor={true} onPress={handleLogin} />
      </View>
    </KeyboardAvoidingView>
  );
};

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
    resizeMode: "contain",
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

export default Login;
