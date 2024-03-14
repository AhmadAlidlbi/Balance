import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import InputField from "../../../../components/InputField";
import SecondaryButton from "../../../../components/SecondaryButton";

const ChangePassword = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleCurrentPasswordChange = (currentPassword) => {
    setCurrentPassword(currentPassword);
  };

  const handlePasswordChange = (newPassword) => {
    setNewPassword(newPassword);
  };

  const handleConfirmPasswordChange = (confirmNewPassword) => {
    setConfirmNewPassword(confirmNewPassword);
  };

  const handleForgotPassword = () => {
    // TODO: forget password logic here
  };

  const handleSave = () => {
    // Save all the fields
    const data = {
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmNewPassword: confirmNewPassword
    };
  
    console.log("Saved Data:", data);
    // Or you can send it to your backend or perform any other action here

    navigation.navigate("Settings");
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.fieldsContainer}>
          <InputField
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
            placeholder="Current password"
            type="password"
          />
        </View>
        <View style={styles.fieldsContainer}>
          <InputField
            value={newPassword}
            onChange={handlePasswordChange}
            placeholder="New password"
            type="password"
          />
        </View>
        <View style={styles.fieldsContainer}>
          <InputField
            value={confirmNewPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm new password"
            type="password"
          />
        </View>
        <View>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 450
        }}>
          <SecondaryButton title="Save" onPress={handleSave} />
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
});
