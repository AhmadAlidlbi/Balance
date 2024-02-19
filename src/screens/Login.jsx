import React, { useState } from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import InputField from "../components/InputField";
import { Feather } from "@expo/vector-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  // console.log(email, password);

  const handleLogin = () => {
    // TODO: login() function
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
        <Text style={styles.heading}>Login to your account</Text>
      </View>
      <View>
        <InputField
          iconName={"user"}
          placeholder={"Email"}
          value={email}
          onChange={handleEmailChange}
          type="email"
          // label={"Email"}
        />
      </View>
      <InputField
        iconName={"lock"}
        placeholder={"Password"}
        name={"password"}
        value={password}
        onChange={handlePasswordChange}
        type="password"
        // label={"Password"}
        secureTextEntry={true}
      />
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <PrimaryButton title="Login" buttonColor={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 86,
    height: 92,
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    marginBottom: 20,
  },
  forgotPassword: {
    color: "#625F60",
    fontSize: 12,
    margin: 10,
  },
});

export default Login;
