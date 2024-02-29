import { React, useState } from "react";
import { TextInput, StyleSheet, View, Pressable } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const InputField = ({ placeholder, value, onChange, type, iconName }) => {
  const [secureText, setSecureText] = useState(true);

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

export default InputField;
