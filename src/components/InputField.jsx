import React from "react";
import { TextInput, StyleSheet, Text, View } from "react-native";

const InputField = ({
  placeholder,
  value,
  onChange,
  type,
  label,
  secureTextEntry,
}) => {
  return (
    <View>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        keyboardType={type}
        secureTextEntry={secureTextEntry ? secureTextEntry : false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 255,
    height: 40,
    borderRadius: 7,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#E9E9E9",
  },
  label:{
    marginBottom: 5,
  }
});

export default InputField;
