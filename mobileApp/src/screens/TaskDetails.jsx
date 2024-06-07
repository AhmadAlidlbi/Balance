import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLogin } from "../context/LoginProvider";

const TaskDetails = ({ route }) => {
    const { theme } = useLogin();
  const { task } = route.params;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme === "dark" ? "#000000" : "#ffffff" }]}>
      <Text style={[styles.title, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>{task.title}</Text>
      <Text style={[styles.description, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>{task.description}</Text>
      <Text style={[styles.date, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>Start Date: {formatDate(task.startDate)}</Text>
      <Text style={[styles.date, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>End Date: {formatDate(task.endDate)}</Text>
    </View>
  );
};

export default TaskDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
    marginTop: 10,
  },
  date: {
    fontSize: 16,
    marginTop: 5,
  },
});
