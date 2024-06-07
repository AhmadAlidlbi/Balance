import { React, useState } from "react";
import { TextInput, StyleSheet, View, Pressable, Text } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLogin } from "../context/LoginProvider";
import { Iconify } from "react-native-iconify";

// The InputField component is a reusable component that renders an input field
const InputField = ({
  placeholder,
  value,
  onChange,
  type,
  iconName,
  label,
  error,
}) => {
  const [secureText, setSecureText] = useState(true);
  const { theme } = useLogin();
  // The secureText state variable is used to determine if the input field is a password field

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            fontWeight: "600",
            fontSize: 12,
            color: theme === "dark" ? "#ffffff" : "#000000",
          }}
        >
          {label}
        </Text>
        {error ? (
          <Text style={{ color: "red", fontSize: 12 }}>{error}</Text>
        ) : null}
      </View>
      <View
        style={[
          styles.container,
          { backgroundColor: theme === "dark" ? "#292929" : "#E9E9E9" },
        ]}
      >
        {iconName === "user" ? (
          <Iconify icon="majesticons:user" size={20} color={theme === "dark" ? "#E9E9E9" : "#c2c2c2"} />
        ) : (
          <Iconify icon="majesticons:lock" size={20} color={theme === "dark" ? "#E9E9E9" : "#c2c2c2"} />
        )}
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={theme === "dark" ? "#BEBEBE" : "#BEBEBE"}
          secureTextEntry={type === "password" ? secureText : false}
          style={[
            styles.input,
            { color: theme === "dark" ? "#ffffff" : "#000000" },
          ]}
          autoCapitalize="none"
        />
        {type === "password" && (
          // The eye icon is only displayed if the input field is a password field
          <Pressable onPress={() => setSecureText((prev) => !prev)}>
            {/* <MaterialCommunityIcons
              style={styles.eyeIcon}
              name={secureText ? "eye-off" : "eye"}
              size={20}
              color="#292929"
            /> */} 
          {secureText? (<Iconify style={styles.eyeIcon} icon="mdi:eye" size={20}  color={theme === "dark" ? "#E9E9E9" : "#c2c2c2"} />) : (<Iconify style={styles.eyeIcon} icon="mdi:eye-off" size={20} color={theme === "dark" ? "#E9E9E9" : "#c2c2c2"} />)} 
  
          </Pressable>
        )}
      </View>
    </>
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
    marginBottom: 10,
  },
  input: {
    width: "81%",
    height: 50,
  },
  eyeIcon: {
    padding: 10,
  },
});
