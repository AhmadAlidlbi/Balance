import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";
import AppLoader from "../../components/AppLoader";
import { Formik } from "formik";
import * as Yup from "yup";
import client from "../../../api/client";
import { StackActions } from "@react-navigation/native";
import { useLogin } from "../../context/LoginProvider";

const validationSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name must be at most 20 characters")
    .required("Name is required"),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .equals([Yup.ref("password")], "Passwords do not match")
    .required("Password is required"),
});

const RegisterPage = ({ navigation }) => {
  const { loadingPending, setLoadingPending } = useLogin();

  const userInfo = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [error, setError] = useState("");

  const { fullName, email, password, confirmPassword } = userInfo;

  // const handleOnchangeText = (value, filedName) => {
  //   setUserInfo({ ...userInfo, [filedName]: value });
  // };

  // const isValidForm = () => {
  //   if (!isValidObjField(userInfo))
  //     return updateError("All fields are required", setError);
  //   if (!fullName.trim() || fullName.length < 3)
  //     return updateError("Full name must be at least 3 characters", setError);
  //   if (!isValidEmail(email)) return updateError("Email is invalid", setError);
  //   if (!password.trim() || password.length < 8)
  //     return updateError("Password must be at least 8 characters", setError);
  //   if (password !== confirmPassword)
  //     return updateError("Passwords do not match", setError);

  //   return true;
  // };

  // const handleSignUp = () => {
  //   if (isValidForm()) {
  //     console.log(userInfo);
  //   }
  // };

  // const handleFullNameChange = (fullname) => {
  //   setFullName(fullname);
  // };

  // const handleEmailChange = (email) => {
  //   setEmail(email);
  // };

  // const handlePasswordChange = (password) => {
  //   setPassword(password);
  // };

  // const handleConfirmPasswordChange = (confirmPassword) => {
  //   setConfirmPassword(confirmPassword);
  // };

  // const handleSignUp = async () => {
  //   if (fullname === "" || email === "" || password === "" || confirmPassword === "") {
  //     Alert.alert("Error", "Please fill all fields");
  //     return;
  //   }
  //   if (password !== confirmPassword) {
  //     Alert.alert("Error", "Passwords do not match");
  //     return;
  //   }

  //   try {
  //     await register({ fullname, email, password });
  //     Alert.alert("Sign up successful");
  //     navigation.navigate("Login");
  //   } catch (error) {
  //     console.log("Error:", error); // Log the error object to see its structure and properties
  //     if (error.response && error.response.data) {
  //       Alert.alert("Error", error.response.data.message); // Assuming your API returns an error message in the response data
  //     } else {
  //       Alert.alert("Error", "Registration failed. Please try again.");
  //     }
  //   }
  // };

  const signUp = async (values, formikActions) => {
    setLoadingPending(true);
    const res = await client.post("/register", {
      ...values,
    });
    navigation.navigate("Login");

    // if (res.data.success) {
    //   const signInRes = await client.post("/login", {
    //     email: values.email,
    //     password: values.password,
    //   });
    //   if (signInRes.data.success) {
    //     navigation.navigate("Login", {
    //       token: signInRes.data.token,
    //     });
    //   }else {
    //     console.log("Sign-in unsuccessful:", signInRes.data.error);
    //   }
    // }
    console.log(res.data);
    formikActions.resetForm();
    formikActions.setSubmitting(false);
    setLoadingPending(false);
  };

  return loadingPending ? (
    <AppLoader />
  ) : (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={signUp}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          isSubmitting,
          handleBlur,
          touched,
        }) => {
          const { fullName, email, password, confirmPassword } = values;
          return (
            <>
              <View>
                <Image
                  style={styles.logo}
                  source={require("../../assets/images/BalanceLogo.jpg")}
                />
              </View>
              <View>
                <Text style={styles.title}>Create account</Text>
              </View>
              <View>
                <InputField
                  label={"Full name"}
                  error={errors.fullName && errors.fullName}
                  iconName={"user"}
                  placeholder={"Jhon Doe"}
                  value={fullName}
                  onChange={handleChange("fullName")}
                  onBlur={handleBlur("fullName")}
                  type="name"
                  required={true}
                />
              </View>

              <View>
                <InputField
                  label={"Email"}
                  error={errors.email && errors.email}
                  iconName={"user"}
                  placeholder={"example@email.com"}
                  value={email}
                  onChange={handleChange("email")}
                  onBlur={handleBlur("email")}
                  type="email"
                  required={true}
                />
              </View>

              <View>
                <InputField
                  label={"Password"}
                  error={errors.password && errors.password}
                  iconName={"lock"}
                  placeholder={"********"}
                  name={"password"}
                  value={password}
                  onChange={handleChange("password")}
                  onBlur={handleBlur("password")}
                  type="password"
                  secureTextEntry={true}
                  required={true}
                />
              </View>

              <View>
                <InputField
                  label={"Password confirmation"}
                  error={errors.confirmPassword && errors.confirmPassword}
                  iconName={"lock"}
                  placeholder={"********"}
                  name={"passwordConfirmation"}
                  value={confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  type="password"
                  secureTextEntry={true}
                  required={true}
                />
              </View>

              <View style={styles.buttonContainer}>
                <PrimaryButton
                  submitting={isSubmitting}
                  onPress={handleSubmit}
                  title="Sign up"
                  buttonColor={true}
                />
              </View>
            </>
          );
        }}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default RegisterPage;

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
