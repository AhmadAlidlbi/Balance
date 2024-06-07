import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  TextInput,
} from "react-native";
import { updateTaskList } from "../../api/taskList";
import { Iconify } from "react-native-iconify";
import SmallButton from "./SmallButton";
import TaskListInput from "./TaskListInput";
import TaskListEdit from "../components/TaskListEdit";
import { useLogin } from "../context/LoginProvider";

const TasksListItem = (props) => {
  const { theme, language  } = useLogin();
  const { task, onDeleteItem } = props;
  const { width } = useWindowDimensions();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const navigation = useNavigation();

  const editTasksListHandler = async (title) => {
    try {
      await updateTaskList(task._id, title);
      setNewTitle(title); // Update the state with the new title
      setEditModalVisible(false);
    } catch (error) {
      console.error("Error updating task list title:", error);
    }
  };

  const endEditTasksListHandler = () => {
    setEditModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("TasksListDetails", {
            id: task._id,
            title: task.title,
          });
        }}
        onLongPress={() => {
          setEditModalVisible(true);
        }}
        style={[
          styles.taskItem,
          { width: width },
          { backgroundColor: theme === "dark" ? "#292929" : "#E9E9E9" },
        ]}
      >
        <Text
          style={[
            styles.text,
            { color: theme === "dark" ? "#ffffff" : "#000000" },
          ]}
        >
          {newTitle}
        </Text>
        <TouchableOpacity
          onPress={() => setDeleteModalVisible(true)}
          style={styles.deleteIcon}
        >
          <Iconify icon="majesticons:delete-bin" size={25} color={"#FF3B30"} />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Edit Modal */}
      <TaskListEdit
        text={newTitle}
        visible={editModalVisible}
        onAddTasksList={editTasksListHandler}
        onCancel={endEditTasksListHandler}
      />

      {/* Delete Modal */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.deleteModalInnerContainer}>
          <View style={styles.deleteModalContent}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => onDeleteItem(task._id)}
            >
              <Text style={styles.deleteButtonText}>{language === "English" ? "Delete": "Sil"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cancelButton, { backgroundColor: theme === "dark" ? "#292929" : "#E9E9E9" }]}
              onPress={() => setDeleteModalVisible(false)}
            >
              <Text style={[styles.cancelButtonText, {color: theme === "dark" ? "#ff0000" : "#9B0000"}]}>{language === "English" ? "Cancel": "Vazgeç"}</Text>
              </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default TasksListItem;

const styles = StyleSheet.create({
  taskItem: {
    flex: 1,
    maxWidth: "90%",
    alignSelf: "center",
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#f2f2f2",
    // borderColor: "#ccc",
    // borderWidth: 0.5,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#000000",
    textTransform: "capitalize",
    textAlign: "center",
    padding: 3,
  },
  checkIcon: {
    padding: 5,
    marginLeft: 10,
  },
  deleteIcon: {
    // padding: 5,
    // marginRight: 10,
  },
  deleteModalInnerContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  deleteModalContent: {
    backgroundColor: "#ffffff00",
    padding: 20,
    borderRadius: 10,
    height: "20.5%",
  },
  deleteButton: {
    backgroundColor: "#BE0000",
    borderRadius: 5,
    marginBottom: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 4,
    elevation: 5,
  },
  cancelButton: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    marginBottom: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 4,
    elevation: 5,
  },
  deleteButtonText: {
    color: "#ffffff",
    fontSize: 18,
    textAlign: "center",
  },
  cancelButtonText: {
    color: "#BE0000",
    fontSize: 18,
    textAlign: "center",
  },
});
