import { useState } from "react";
import { View, TextInput, Button, StyleSheet, Modal } from "react-native";
import SmallButton from "./SmallButton";
import { useLogin } from "../context/LoginProvider";

function TaskListInput(props) {
  const { theme, language  } = useLogin();
  const [title, setTitle] = useState("");

  function TaskListInputHandler(enteredTasksListText) {
    setTitle(enteredTasksListText);
  }

  function addTasksListHandler() {
    props.onAddTasksList(title);
    setTitle("");
  }

  function resetFormFields() {
    setTitle("");
  }

  return (
    <Modal visible={props.visible} animationType="fade"  transparent={true}>
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { backgroundColor: theme === "dark" ? "#292929" : "#ffffff" }]}>
          <TextInput
            style={[styles.textInput, { backgroundColor: theme === "dark" ? "#000000" : "#E9E9E9", color: theme === "dark" ? "#ffffff" : "#000000" }]}
            placeholder={language === "English" ? "Add New Tasks List...": "Yeni Görevler Listesi Ekle..."}
            placeholderTextColor="#BEBEBE"
            onChangeText={TaskListInputHandler}
            value={title}
          />
          <View style={styles.buttonContainer}>
              <SmallButton
                title={language === "English" ? "Cancel": "Vazgeç"}
                onPress={() => {
                  props.onCancel();
                  resetFormFields();
                }}
                buttonColor={false}
              />
              <SmallButton
                title={language === "English" ? "Add": "Ekle"}
                onPress={addTasksListHandler}
                buttonColor={true}
              />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default TaskListInput;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  
  },
  modalView: {
    backgroundColor: "#ffffff",
    elevation: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 2,
      height: 5,
    },
    borderRadius: 20,
    width: "95%",
    height: 190,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  textInput: {
    backgroundColor: "#E9E9E9",
    borderRadius: 6,
    width: "100%",
    padding: 16,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
    marginVertical: 5,
    justifyContent: "center",
    
  },
  button: {
    width: "40%",
  },
});
