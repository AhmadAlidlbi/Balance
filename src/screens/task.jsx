import { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  Text,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import TaskItem from "../components/TaskItem";
import TaskInput from "../components/TaskInput";

const task = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [tasks, setTasks] = useState([]);

  function startAddTaskHandler() {
    setModalIsVisible(true);
  }

  function endAddTaskHandler() {
    setModalIsVisible(false);
  }

  function addTaskHandler(enteredTaskText) {
    setTasks((currentTasks) => [
      ...currentTasks,
      { text: enteredTaskText, id: Math.random().toString() },
    ]);
    endAddTaskHandler();
  }

  function deleteTaskHandler(id) {
    setTasks((currentTasks) => {
      return currentTasks.filter((task) => task.id !== id);
    });
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New List"
          color="#000000"
          onPress={startAddTaskHandler}
        />
        <TaskInput
          visible={modalIsVisible}
          onAddTask={addTaskHandler}
          onCancel={endAddTaskHandler}
        />
        <View style={styles.tasksContainer}>
          <FlatList
            data={tasks}
            renderItem={(itemData) => {
              itemData.index;
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
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  tasksContainer: {
    flex: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "45",
    height: 60,
    backgroundColor: "#3238FF",
    borderRadius: "50",
    width: "350px",
    paddingVertical: 10,
    paddingHorizontal: 55,
  },
  navItem: {
    color: "#ffffff",
    fontSize: 18,
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default task;
