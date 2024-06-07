import { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, SafeAreaView, Text } from "react-native";
import SecondaryButton from "../../components/SecondaryButton";

import TaskItem from "../../components/TaskItem";
import TaskInput from "../../components/TaskInput";
import TaskListInput from "../../components/TaskListInput";
import TasksListItem from "../../components/TasksListItem";
import { useLogin } from "../../context/LoginProvider";
import {
  createTaskList,
  deleteTaskList,
  getTaskListsByUserId,
} from "../../../api/taskList";

const TasksListPage = () => {
  const { profile, theme, language } = useLogin();

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [tasksLists, setTasksLists] = useState([]);
  const taskItem = {
    __v: 0,
    _id: "6642f5ea6b72245dacf24d65",
    createdAt: "2024-05-14T05:26:02.626Z",
    tasks: [Array],
    title: "masyerf",
    updatedAt: "2024-05-14T05:26:02.626Z",
    userId: "663a3f0b3edfd8f2204765e7",
  };
  const fetchTasks = async () => {
    try {
      if (profile.id) {
        const res = await getTaskListsByUserId(profile.id);
        // console.log("TasksLists:", res.taskLists);
        setTasksLists(res.taskLists);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [profile.id]);

  function startAddTaskHandler() {
    setModalIsVisible(true);
  }

  function endAddTaskHandler() {
    setModalIsVisible(false);
  }

  async function addTasksListHandler(enteredTaskText) {
    try {
      await createTaskList(enteredTaskText, profile.id);
      await fetchTasks();
      endAddTaskHandler();
    } catch (error) {
      console.log("Error:", error.message);
    }
  }

  async function deleteTaskHandler(id) {
    await deleteTaskList(id);
    await fetchTasks();
    setTasksLists(res.taskLists);
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "#000000" : "#ffffff" },
      ]}
    >
      <TaskListInput
        visible={modalIsVisible}
        onAddTasksList={addTasksListHandler}
        onCancel={endAddTaskHandler}
      />
      {tasksLists.length === 0 ? (
        <Text style={[styles.emptyText, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>{language === "English" ? "No task lists to show": "Gösterilecek görev listesi yok"}</Text>
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            data={tasksLists}
            style={{
              width: "100%",
              minWidth: "90%",
            }}
            renderItem={({ item }) => {
              return (
                <TasksListItem task={item} onDeleteItem={deleteTaskHandler} />
              );
            }}
            keyExtractor={(item, index) => {
              return item._id;
            }}
            alwaysBounceVertical={false}
          />
        </View>
      )}
      <View style={styles.addButtonContainer}>
        <SecondaryButton title={language === "English" ? "New List": "Yeni liste"} onPress={startAddTaskHandler} />
      </View>
    </SafeAreaView>
  );
};

export default TasksListPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fffffffc",
  },
  listContainer: {
    height: "83%",
    width: "100%",
  },
  addButtonContainer: {
    position: "absolute",
    top: "84%",
    alignSelf: "center",
  },
  emptyText: {
    marginTop: 20,
    fontSize: 18,
    color: "gray",
  },
});
