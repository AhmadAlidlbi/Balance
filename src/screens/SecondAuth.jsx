import React, { useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";

const SecondAuth = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handlePasswordConfirmationChange = (text) => {
    setPasswordConfirmation(text);
  };

  // console.log(email, password, passwordConfirmation);

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.logo}
          source={require("../assets/images/BalanceLogo.jpg")}
        />
      </View>
      <View>
        <Text style={styles.heading}>Create Account</Text>
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
        <InputField
          iconName={"lock"}
          placeholder={"Password Confirmation"}
          name={"passwordConfirmation"}
          value={passwordConfirmation}
          onChange={handlePasswordConfirmationChange}
          type="password"
          secureTextEntry={true}
        />
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton onPress={() => navigation.navigate("Login")} title="Sign Up" buttonColor={true} />
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
    paddingBottom: 100,
  },
  logo: {
    width: 86,
    height: 92,
    marginBottom: 20,
  },
  heading: {
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
