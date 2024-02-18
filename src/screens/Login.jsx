import React, { useState } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import InputField from "../components/InputField";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };
  console.log(email, password);
  const handleLogin = () => {
    // TODO: login() function
  };

  const handleSignup = () => {
    // Implement your signup logic here
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
      <InputField
        placeholder={"Email"}
        value={email}
        onChange={handleEmailChange}
        type="email"
        // label={"Email"}
      />
      <InputField
        placeholder={"Password"}
        name={"password"}
        value={password}
        onChange={handlePasswordChange}
        type="password"
        // label={"Password"}
        secureTextEntry={true}
      />
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
});

export default Login;
