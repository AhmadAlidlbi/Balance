import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import PrimaryButton from "../../components/PrimaryButton";
import InputField from "../../components/InputField";
import {
  isValidEmail,
  isValidObjField,
  updateError,
} from "../../../utils/methods";
import client from "../../../api/client";
import { useLogin } from "../../context/LoginProvider";
import AppLoader from "../../components/AppLoader";

const LoginPage = ({ navigation }) => {
  const { loadingPending, setLoadingPending } = useLogin();
  // State variables to store the username and password
  // The setUsername and setPassword functions are used to update the state variables
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  // const handleUsernameChange = (Username) => {
  //   setUsername(Username);
  // };

  // const handlePasswordChange = (Password) => {
  //   setPassword(Password);
  // };
  // // The handlePasswordChange function updates the password state variable with the value of the input field

  const handleForgotPassword = () => {
    // TODO: forget password logic here
  };

  // const handleLogin = () => {
  //   // if (username === "" || password === "") {
  //   //   alert("Please fill all fields");
  //   //   return;
  //   // }
  //   navigation.navigate("InAppStack");
  // };

  const { setIsLoggedIn, setProfile } = useLogin();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const { email, password } = userInfo;

  const handleOnchangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    if (!isValidObjField(userInfo))
      return updateError("All fields are required", setError);
    if (!isValidEmail(email)) return updateError("Email is invalid", setError);
    if (!password.trim() || password.length < 8)
      return updateError("Password must be at least 8 characters", setError);
    return true;
  };

  const handleLogin = async () => {
    setLoadingPending(true);
    if (isValidForm()) {
      try {
        const res = await client.post("/login", { ...userInfo });

        if (res.data.success) {
          setUserInfo({ email: "", password: "" });
          setProfile(res.data.user);
          setIsLoggedIn(true);
        }

        console.log(res.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    setLoadingPending(false);
  };

  return loadingPending ? (
    <AppLoader />
  ) : (
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
          label={"Email"}
          placeholder={"example@email.com"}
          onChange={(value) => handleOnchangeText(value, "email")}
          value={email}
          type="email"
        />
      </View>

      {/* Input field component */}
      <View>
        <InputField
          iconName={"lock"}
          label={"Password"}
          placeholder={"********"}
          name={"password"}
          value={password}
          onChange={(value) => handleOnchangeText(value, "password")}
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

      <View style={{ marginTop: 20, height: 50, width: 350 }}>
        {error ? (
          <Text style={{ color: "red", fontSize: 18, textAlign: "center" }}>
            {error}
          </Text>
        ) : null}
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginPage;

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
