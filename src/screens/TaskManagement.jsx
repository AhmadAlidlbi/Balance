import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);

  const renderTaskItem = ({ item }) => {
    return (
      <View style={styles.taskItem}>
        <Text>{item.title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Management</Text>
      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 100,
    alignContent: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    alignContent: 'center',
    justifyContent: 'center',
  },
  taskItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default TaskManagement;
