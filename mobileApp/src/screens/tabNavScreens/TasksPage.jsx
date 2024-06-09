import { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, SafeAreaView, Text } from "react-native";
import SecondaryButton from "../../components/SecondaryButton";

import TaskItem from "../../components/TaskItem";
import TaskInput from "../../components/TaskInput";
import {
  deleteTaskItem,
  getTaskListById,
  getTaskListsByUserId,
} from "../../../api/taskList";
import { useLogin } from "../../context/LoginProvider";
import { changeTaskStatus, createTask, deleteTask } from "../../../api/task";

const TasksPage = (props) => {
  const { id, title } = props.route.params;
  const { profile, theme , language } = useLogin();
  console.log("Profile:", {
    id,
    title,
  });

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskListLength, setTaskListLength] = useState(0);
  const fetchTasks = async () => {
    try {
      if (id) {
        const res = await getTaskListById(id);
        console.log("Tasks:", res.taskList.tasks?.length);
        setTasks(res.taskList.tasks || []);
        setTaskListLength(res.taskList.tasks?.length || 0)
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, [title]);

  function startAddTaskHandler() {
    setModalIsVisible(true);
  }

  function endAddTaskHandler() {
    setModalIsVisible(false);
  }

  async function addTaskHandler(payload) {
    try {
      const updatedPayload = {
        ...payload,
        taskListId: id,
        userId: profile?.id,
      };
      const res = await createTask(updatedPayload);
      await fetchTasks();
      endAddTaskHandler();
    } catch (error) {
      console.log("Error:", error.message);
    }
  }

  async function deleteTaskHandler(taskId) {
    try {
      const res = await deleteTask(taskId);
      await fetchTasks();
    } catch (error) {
      console.log(error);
    }
  }

  const changeTaskStatusHanker = async (id, completed) => {
    try {
      await changeTaskStatus(id, completed);
      await fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "#000000" : "#ffffff" },
      ]}
    >
      <TaskInput
        visible={modalIsVisible}
        onAddTask={addTaskHandler}
        onCancel={endAddTaskHandler}
      />
      {tasks.length === 0 ? (
        <Text style={styles.emptyText}>
        {language === "English" ? "No tasks to show": "Gösterilecek görev yok"}</Text>
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            data={tasks || []}
            renderItem={({ item }) => {
              return (
                <TaskItem
                  refetch={fetchTasks}
                  task={item}
                  onDeleteItem={deleteTaskHandler}
                  changeTaskStatusHanker={changeTaskStatusHanker}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false}
          />
        </View>
      )}
      <View style={styles.addButtonContainer}>
        <SecondaryButton title={language === "English" ? "New Task": "Yeni görev"} onPress={startAddTaskHandler} />
      </View>
    </SafeAreaView>
  );
};

export default TasksPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fffffffc",
  },
  listContainer: {
    height: "83%",
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
