import { useState } from "react";
import { StyleSheet, View, FlatList, SafeAreaView } from "react-native";
import SecondaryButton from "../../components/SecondaryButton";

import TaskItem from "../../components/TaskItem";
import TaskInput from "../../components/TaskInput";

export default function TaskManagement() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [task, setNewTask] = useState([]);

  function startAddTaskHandler() {
    setModalIsVisible(true);
  }

  function endAddTaskHandler() {
    setModalIsVisible(false);
  }

  function addTaskHandler(enteredTaskText) {
    setNewTask((currentTask) => [
      ...currentTask,
      { text: enteredTaskText, id: Math.random().toString() },
    ]);
    endAddTaskHandler();
  }

  function deleteTaskHandler(id) {
    setNewTask((currentTask) => {
      return currentTask.filter((task) => task.id !== id);
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <TaskInput
        visible={modalIsVisible}
        onAddTask={addTaskHandler}
        onCancel={endAddTaskHandler}
      />
      <View style={styles.listContainer}>
        <FlatList
          data={task}
          renderItem={(itemData) => {
            return (
              <TaskItem
                text={itemData.item.text}
                id={itemData.item.id}
                onDeleteItem={deleteTaskHandler}
              />
            );
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          alwaysBounceVertical={false}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <SecondaryButton title="New Task" onPress={startAddTaskHandler} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fffffffc",
  },
  listContainer: {
    height: "81%",
  },
});
