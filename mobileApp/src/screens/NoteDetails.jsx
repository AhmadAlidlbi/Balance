import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useLogin } from "../context/LoginProvider";

const NoteDetails = () => {
  const { theme } = useLogin();
  const route = useRoute();
  const { note } = route.params;
  return (
    <View style={[styles.container, { backgroundColor: theme === "dark" ? "#000000" : "#ffffff" }]}>
      <Text style={[styles.title, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>{note.title}</Text>
      <Text style={[styles.description, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>{note.description}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
  },
});
export default NoteDetails;
