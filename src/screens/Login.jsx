import React, { useState } from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import InputField from "../components/InputField";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (Email) => {
    setEmail(Email);
  };

  const handlePasswordChange = (Password) => {
    setPassword(Password);
  };

  const handleForgotPassword = () => {
    // TODO: forget password logic here
  };

  const handleLogin = () => {
    if (email === "" || password === "") {
      alert("Please fill all fields");
      return;
    }
    navigation.navigate("InAppStack");
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.logo}
          source={require("../assets/images/BalanceLogo.jpg")}
        />
      </View>
      <View>
        <Text style={styles.title}>Login to your account</Text>
      </View>
      <View>
        <InputField
          iconName={"user"}
          placeholder={"Email"}
          value={email}
          onChange={handleEmailChange}
          type="email"
        />
      </View>
      <InputField
        iconName={"lock"}
        placeholder={"Password"}
        name={"password"}
        value={password}
        onChange={handlePasswordChange}
        type="password"
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <PrimaryButton title="Login" buttonColor={true} onPress={handleLogin} />
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
    width: 86,
    height: 92,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    marginTop: 10,
  },
  forgotPassword: {
    color: "#625F60",
    fontSize: 12,
    margin: 15,
  },
});

export default Login;
