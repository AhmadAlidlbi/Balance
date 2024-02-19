import React from "react";
import { TextInput, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

const InputField = ({
  placeholder,
  value,
  onChange,
  type,
  label,
  secureTextEntry,
  iconName,
}) => {
  return (
    <View style={styles.container}>
      {/* <Feather name="user" size={20} color="black" style={styles.icon} /> */}
      <Feather name={iconName} size={20} color="#BEBEBE" style={styles.icon} />
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        keyboardType={type}
        secureTextEntry={secureTextEntry}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#E9E9E9",
    borderRadius: 7,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: 255,
    gap: 10,
    margin: 10,
  },
  input: {
    width: "100%",
  },
  icon: {
    marginRight: 8,
  },
  label: {
    marginBottom: 5,
  },
});

export default InputField;
