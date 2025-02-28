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
    profession: Yup.string().required("Profession is required"),


});

const RegisterPage = ({ navigation }) => {
  const { loadingPending, setLoadingPending, theme, language } = useLogin();

  const userInfo = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [error, setError] = useState("");

  const { fullName, email, password, confirmPassword } = userInfo;

  const signUp = async (values, formikActions) => {
    setLoadingPending(true);
    try {
      const res = await client.post("/register", {
        ...values,
      });
      navigation.navigate("Login");

      
    } catch (error) {
      setError(error.message);
    }

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
      style={[styles.container, { backgroundColor: theme === "dark" ? "#000000" : "#ffffff" }]}
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
                  source={
                    theme === "dark"
                      ? require("../../assets/images/darkModeLogo.png")
                      : require("../../assets/images/logo.png")
                  }
                />
              </View>
              <View>
                <Text style={[styles.title, {color: theme === "dark" ? "#ffffff" : "#000000" }]}>{language === "English" ? "Create account": "Hesap Oluştur"}</Text>
              </View>
              <View>
                <InputField
                  label={language === "English" ? "Full name": "Ad Soyad"}
                  error={errors.fullName && errors.fullName}
                  iconName={"user"}
                  placeholder={language === "English" ? "Ahmad Alidlbi": "Mert Yılmaz"}
                  value={fullName}
                  onChange={handleChange("fullName")}
                  onBlur={handleBlur("fullName")}
                  type="name"
                  required={true}
                />
              </View>

              <View>
                <InputField
                  label={language === "English" ? "Email": "E-posta"}
                  error={errors.email && errors.email}
                  iconName={"user"}
                  placeholder={language === "English" ? "example@email.com": "örnek@e-posta.com"}
                  value={email}
                  onChange={handleChange("email")}
                  onBlur={handleBlur("email")}
                  type="email"
                  required={true}
                />
              </View>

              <View>
                <InputField
                  label={language === "English" ? "Password": "Şifre"}
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
                  label={language === "English" ? "Password confirmation": "Şifre onayla"}
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
              <View>
                <InputField
                  label={language === "English" ? "Profession": "Meslek"}
                  error={errors.profession && errors.profession}
                  iconName={"user"}
                  placeholder={language === "English" ? "Developer": "Geliştirici"}
                  value={values.profession}
                  onChange={handleChange("profession")}
                  onBlur={handleBlur("profession")}
                  type="profession"
                  required={true}
                />
              </View>

              <View style={styles.buttonContainer}>
                <PrimaryButton
                  submitting={isSubmitting}
                  onPress={handleSubmit}
                  title={language === "English" ? "Sign up": "Üye ol"}
                  buttonColor={true}
                />
              </View>
            </>
          );
        }}
      </Formik>
      <View>
        <Text style={styles.forgotPassword}>{error}</Text>
      </View>
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
    color: "red",
    fontSize: 12,
    margin: 12,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
