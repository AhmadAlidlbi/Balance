// import { useState } from "react";
// import { StyleSheet, View, FlatList, SafeAreaView } from "react-native";
// import SecondaryButton from "../../components/SecondaryButton";

// import TaskItem from "../../components/TaskItem";
// import TaskInput from "../../components/TaskInput";

// const  TasksPage = () => {
//   const [modalIsVisible, setModalIsVisible] = useState(false);
//   const [task, setNewTask] = useState([]);

//   function startAddTaskHandler() {
//     setModalIsVisible(true);
//   }

//   function endAddTaskHandler() {
//     setModalIsVisible(false);
//   }

//   function addTaskHandler(enteredTaskText) {
//     setNewTask((currentTask) => [
//       ...currentTask,
//       { text: enteredTaskText, id: Math.random().toString() },
//     ]);
//     endAddTaskHandler();
//   }

//   function deleteTaskHandler(id) {
//     setNewTask((currentTask) => {
//       return currentTask.filter((task) => task.id !== id);
//     });
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <TaskInput
//         visible={modalIsVisible}
//         onAddTask={addTaskHandler}
//         onCancel={endAddTaskHandler}
//       />
//       <View style={styles.listContainer}>
//         <FlatList
//           data={task}
//           renderItem={(itemData) => {
//             return (
//               <TaskItem
//                 text={itemData.item.text}
//                 id={itemData.item.id}
//                 onDeleteItem={deleteTaskHandler}
//               />
//             );
//           }}
//           keyExtractor={(item, index) => {
//             return item.id;
//           }}
//           alwaysBounceVertical={false}
//         />
//       </View>
//       <View style={{ marginTop: 20 }}>
//         <SecondaryButton title="New Task" onPress={startAddTaskHandler} />
//       </View>
//     </SafeAreaView>
//   );
// }

// export default TasksPage;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     backgroundColor: "#fffffffc",
//   },
//   listContainer: {
//     height: "81%",
//   },
// });


import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import client from '../../../api/client';

const TasksPage = ({ token }) => { // assuming you pass the token as a prop
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  const handleTaskCreation = async () => {
    try {
      const response = await client.post(
        '/tasks',
        {
          title,
          description,
          endDate,
          userId: '6639e023fd984af46005595f', // Pass the user ID here
        },
        {
          headers: {
            Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjM5ZTAyM2ZkOTg0YWY0NjAwNTU5NWYiLCJpYXQiOjE3MTUwNjkyMjgsImV4cCI6MTcxNTE1NTYyOH0.ySQsdU1dCi5MLSLis-JSyYK_a_xwBOc3N5N07nmRyHk'}`, // Include the token in the Authorization header
          },
        }
      );
      // Handle successful task creation
      console.log('Task created:', response.data);
    } catch (error) {
      setError('Error creating task: ' + error.message);
    }
  };

  return (
    <View>
      <Text>Add Task</Text>
      {error ? <Text>{error}</Text> : null}
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        placeholder="End Date"
        value={endDate}
        onChangeText={setEndDate}
      />
      <Button title="Add Task" onPress={handleTaskCreation} />
    </View>
  );
};

export default TasksPage;
