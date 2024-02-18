import React, { useState } from "react";
import { View, TextInput } from "react-native";

const TestScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  return (
    <View>
      <TextInput
        value={email}
        onChangeText={handleEmailChange}
        placeholder="Enter email"
      />
      <TextInput
        value={password}
        onChangeText={handlePasswordChange}
        placeholder="Enter password"
        secureTextEntry
        keyboardType="email-address"
      />
      <TextInput
        value={password}
        onChangeText={handlePasswordChange}
        placeholder="Enter password"
        secureTextEntry
      />
    </View>
  );
};

export default TestScreen;
