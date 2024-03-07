import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import InputField from "../../../../components/InputField";
import SecondaryButton from "../../../../components/SecondaryButton";

const ChangePassword = () => {
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
    // Handle save
  };

  return (
    <View style={styles.container}>
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

      <View style={{ marginTop: 440 }}>
        <SecondaryButton title="Save" onPress={handleSave} />
      </View>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingTop: 30,
  },
  fieldsContainer: {},
  label: {
    paddingHorizontal: 13,
  },
  forgotPassword: {
    color: "#625F60",
    fontSize: 12,
    margin: 15,
  },
});
