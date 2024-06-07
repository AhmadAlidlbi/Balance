import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import InputField from "../../../../components/InputField";
import SecondaryButton from "../../../../components/SecondaryButton";
import { changePassword } from "../../../../../api/user";
import { useLogin } from "../../../../context/LoginProvider";

const ChangePassword = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState(null);
  const { theme, language  } = useLogin();

  const handleCurrentPasswordChange = (currentPassword) => {
    setCurrentPassword(currentPassword);
  };

  const handlePasswordChange = (newPassword) => {
    setNewPassword(newPassword);
  };

  const handleConfirmPasswordChange = (confirmNewPassword) => {
    setConfirmNewPassword(confirmNewPassword);
  };

  const handleResetPassword = () => {
    // Implement your password reset logic here
    // You can use the 'email' state variable to get the user's email
    // Display a success message or show an error if the email is invalid
    Alert.alert(
      language === "English" ? "Password Reset": "Parola sıfırlama",
      language === "English" ? "An email has been sent to your email address with instructions to reset your password.": "E-posta adresinize şifrenizi sıfırlama talimatlarını içeren bir e-posta gönderildi."
  );
    navigation.navigate("Login");
};

  const handleSave =async () => {
    setError(null);
    if (!currentPassword || !newPassword || !confirmNewPassword ) {
      return setError("Please fill all fields");
    }

    if(newPassword !== confirmNewPassword) {
      return setError("Passwords do not match");
    }
    if( newPassword.length < 8 || confirmNewPassword.length < 8){
      return setError("Password must be at least 8 characters")
    }

  try {
   const res=  await  changePassword(currentPassword,newPassword);
   if(!res.success){
      return setError(res.message);
   }
    navigation.navigate("Settings");
  } catch (error) {
    console.log("Error:", error.message);
    setError(error.message);
  }
    
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.container, { backgroundColor: theme === "dark" ? "#000000" : "#ffffff" }]}
      >
        <Text style={[styles.Heading, {color: theme === "dark" ? "#ffffff" : "#625F60"}]}>{language === "English" ? "Change Your Password": "Şifreni değiştir"}</Text>
        {error&& <Text style={{
          color: 'red',
          fontSize: 12,
          margin: 15,
        
        }}>{error}</Text>}
        <View style={styles.fieldsContainer}>
          <InputField
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
            placeholder={language === "English" ? "Current password": "Mevcut Şifre"}
            type="password"
          />
        </View>
        <View style={styles.fieldsContainer}>
          <InputField
            value={newPassword}
            onChange={handlePasswordChange}
            placeholder={language === "English" ? "New password": "Yeni Şifre"}
            type="password"
          />
        </View>
        <View style={styles.fieldsContainer}>
          <InputField
            value={confirmNewPassword}
            onChange={handleConfirmPasswordChange}
            placeholder={language === "English" ? "Confirm new password": "Yeni şifreyi onayla"}
            type="password"
          />
        </View>
        <View>
          <TouchableOpacity onPress={handleResetPassword}>
            <Text style={[styles.forgotPassword, {color: theme === "dark" ? "#ffffff" : "#625F60"}]}>{language === "English" ? "Forgot Password?": "Parolanızı mı unuttunuz?"}</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 0
        }}>
          <SecondaryButton title={language === "English" ? "Save": "Kaydet"} onPress={handleSave} />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
    justifyContent: "center",
    marginBottom: 20,
  },
  label: {
    paddingHorizontal: 13,
  },
  forgotPassword: {
    color: "#625F60",
    fontSize: 12,
    margin: 15,
  },
  Heading: {
    fontFamily: "poppins-medium",
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,
  },
});
