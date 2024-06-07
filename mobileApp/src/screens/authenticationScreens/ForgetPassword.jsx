import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useLogin } from "../../context/LoginProvider";

const ForgetPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const { theme, language } = useLogin();

  const handleResetPassword = () => {
    // Implement your password reset logic here
    // You can use the 'email' state variable to get the user's email
    // Display a success message or show an error if the email is invalid
    Alert.alert(
        language === "English" ? "Password Reset": "Parola sıfırlama",
        language === "English" ? "An email has been sent to your email address with instructions to reset your password.": "E-posta adresinize şifrenizi sıfırlama talimatlarını içeren bir e-posta gönderildi."
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "#000000" : "#ffffff" },
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: theme === "dark" ? "#ffffff" : "#000000" },
        ]}
      >
        {language === "English"
          ? "Forgot Password"
          : "Parolanızı mı unuttunuz?"}
      </Text>
      <Text
        style={[
          styles.subTitle,
          { color: theme === "dark" ? "#ffffff" : "#000000" },
        ]}
      >
        {language === "English"
          ? "Enter your email below to reset your password"
          : "Şifrenizi sıfırlamak için e-posta adresinizi aşağıya girin"}
      </Text>
      <TextInput
        style={[
          styles.input,
          { color: theme === "dark" ? "#ffffff" : "#000000" },
        ]}
        placeholder={language === "English" ? "Email": "E-posta"}
        placeholderTextColor={theme === "dark" ? "#BEBEBE" : "#BEBEBE"}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: theme === "dark" ? "#292929" : "#3a3fd3" },
        ]}
        onPress={handleResetPassword}
      >
        <Text style={styles.buttonText}>{language === "English" ? "Reset Password": "Şifreyi yenile"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subTitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#3a3fd3",
    paddingVertical: 12,
    paddingHorizontal: 120,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
};

export default ForgetPassword;
