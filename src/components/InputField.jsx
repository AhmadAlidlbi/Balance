import { React, useState } from "react";
import { TextInput, StyleSheet, View, Pressable } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

// The InputField component is a reusable component that renders an input field
const InputField = ({ placeholder, value, onChange, type, iconName }) => {
  const [secureText, setSecureText] = useState(true);
  // The secureText state variable is used to determine if the input field is a password field

  return (
    <View style={styles.container}>
      <Feather name={iconName} size={20} color="#BEBEBE" />
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        secureTextEntry={type === "password" ? secureText : false}
        style={styles.input}
      />
      {type === "password" && (
        // The eye icon is only displayed if the input field is a password field
        <Pressable onPress={() => setSecureText((prev) => !prev)}>
          <MaterialCommunityIcons
            style={styles.eyeIcon}
            name={secureText ? "eye-off" : "eye"}
            size={20}
            color="#BEBEBE"
          />
        </Pressable>
      )}
    </View>
  );
};

export default InputField;

// Styles

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#E9E9E9",
    borderRadius: 7,
    alignItems: "center",
    paddingHorizontal: 10,
    width: 350,
    gap: 5,
    margin: 10,
  },
  input: {
    width: "81%",
    height: 50,
  },
  eyeIcon: {
    padding: 10,
  },
});

