import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import InputField from "../components/InputField";
import SecondaryButton from "../components/SecondaryButton";

const Settings = () => {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleEmailChange = (email) => {
    setEmail(email);
  };

  const handleCurrentPasswordChange = (currentPassword) => {
    setCurrentPassword(currentPassword);
  };

  const handlePasswordChange = (newPassword) => {
    setNewPassword(newPassword);
  };

  const handleConfirmPasswordChange = (confirmNewPassword) => {
    setConfirmNewPassword(confirmNewPassword);
  };

  const handleSave = () => {
    // Handle save
  };

  return (
    <View style={styles.container}>

      <View style={styles.fieldsContainer}>
        <Text style={styles.label}>Current Password</Text>
        <InputField
          value={currentPassword}
          onChange={handleCurrentPasswordChange}
          placeholder="Password"
          type="password"
        />
      </View>

      <View style={styles.fieldsContainer}>
        <Text style={styles.label}>New Password</Text>
        <InputField
          value={newPassword}
          onChange={handlePasswordChange}
          placeholder="Password"
          type="password"
        />
      </View>

      <View style={styles.fieldsContainer}>
        <Text style={styles.label}>Confirm New Password</Text>
        <InputField
          value={confirmNewPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="Confirm New Password"
          type="password"
        />
      </View>

      <View style={{ marginTop: 250 }}>
        <SecondaryButton title="Save" onPress={handleSave} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  fieldsContainer: {
    marginBottom: 15,
  },
  label: {
    paddingHorizontal: 13,
  },
});

export default Settings;
