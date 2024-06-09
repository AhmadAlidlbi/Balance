import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
  Button,
} from "react-native";
import { Iconify } from "react-native-iconify";
import { useEffect, useState, useRef } from "react";
import DatePicker from "react-native-modern-datepicker";
import SmallButton from "./SmallButton";
import { editHabit } from "../../api/habitApi";
import { editTask } from "../../api/task";
import { useLogin } from "../context/LoginProvider";
import { useNavigation } from "@react-navigation/native";
import { Audio } from "expo-av";

function TaskItem(props) {
  const navigation = useNavigation();
  const { theme, language, soundEnabled } = useLogin();
  const task = props.task;

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [timerModalVisible, setTimerModalVisible] = useState(false);
  const [isTimerPressed, setIsTimerPressed] = useState(false);
  const [sound, setSound] = useState();

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/complete.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);


  const handleCheckPress = async () => {
    if (!task.completed && soundEnabled) {
      await playSound();
    }
    props.changeTaskStatusHanker(task._id, !task.completed);
  };

  const [enteredTaskText, setEnteredTaskText] = useState("");

  const [openStartDate, setOpeStartDate] = useState(false);
  const [startDate, setStartDate] = useState("");

  const [openEndDate, setOpenEndDate] = useState(false);
  const [EndDate, setEndDate] = useState("");

  const [descriptionText, setDescriptionText] = useState("");
  useEffect(() => {
    setEnteredTaskText(task.title);
    setStartDate(new Date(task.startDate).toISOString().split("T")[0]);
    setEndDate(new Date(task.endDate).toISOString().split("T")[0]);
    setDescriptionText(task.description);
  }, [task]);

  function handleAddDescription(descriptionText) {
    setDescriptionText(descriptionText);
    console.log(descriptionText);
  }

  function taskInputHandler(enteredText) {
    setEnteredTaskText(enteredText);
  }

  // Start Date
  function handleOpenStartDate() {
    setOpeStartDate(!openStartDate);
  }

  function handleStartDateChange(startDate) {
    setStartDate(startDate);
  }

  // End Date
  function handleOpenEndDate() {
    setOpenEndDate(!openEndDate);
  }

  function handleEndDateChange(EndDate) {
    setEndDate(EndDate);
  }
  const editHandler = async () => {
    try {
      const res = await editTask(
        task._id,
        enteredTaskText,
        descriptionText,
        startDate,
        EndDate
      );

      console.log(res);

      if (res.success) {
        setEditModalVisible(false);
        props.refetch && props.refetch();
      } else {
        alert("Error in editing task");
      }
    } catch (error) {
      console.log(error);
      alert("Error in editing task");
    }
  };

  function handleTimerModal() {
    setTimerModalVisible(true);
  }

  function CloseTimerModal() {
    setTimerModalVisible(false);
  }

  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef();

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
    setIsRunning(true);
    setIsTimerPressed(true);
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTimer(0);
    setIsRunning(false);
    setIsTimerPressed(false);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  return (
    <TouchableOpacity
      style={[
        styles.taskItem,
        { backgroundColor: theme === "dark" ? "#292929" : "#E9E9E9" },
      ]}
      onPress={() => navigation.navigate("TaskDetails", { task })}
      onLongPress={() => setEditModalVisible(true)}
    >
      <View style={styles.buttons}>
        <TouchableOpacity onPress={handleCheckPress} style={styles.checkIcon}>
          <Iconify
            icon="lets-icons:check-fill"
            size={25}
            color={task.completed ? "#2a9c2a" : "grey"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleTimerModal} style={styles.timerIcon}>
          {isTimerPressed ? (
            <Iconify icon="majesticons:clock" size={25} color="#3a3fd3" />
          ) : (
            <Iconify icon="majesticons:clock" size={25} color="grey" />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.taskItemText} android_ripple={{ color: "#210644" }}>
        <Text
          style={[
            styles.taskText,
            task.completed && { textDecorationLine: "line-through" },
            { color: theme === "dark" ? "#ffffff" : "#000000" },
          ]}
        >
          {task?.title}
        </Text>
        <Text
          style={[
            styles.taskDescription,
            { color: theme === "dark" ? "#ffffff" : "#777" },
          ]}
        >
          {task?.description}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          props.onDeleteItem && setDeleteModalVisible(true);
        }}
        style={styles.deleteIcon}
      >
        {props.onDeleteItem && (
          <Iconify icon="majesticons:delete-bin" size={25} color={"#FF3B30"} />
        )}
      </TouchableOpacity>

      {/* Edit Modal */}

      <Modal visible={editModalVisible} animationType="slide">
        <View
          style={[
            styles.inputContainer,
            { backgroundColor: theme === "dark" ? "#292929" : "#ffffff" },
          ]}
        >
          <View>
            <Text
              style={[
                styles.heading,
                { color: theme === "dark" ? "#ffffff" : "#000000" },
              ]}
            >
              {language === "English" ? "Edit Task": "Görevi Düzenle"}
            </Text>
          </View>
          <View>
          <Text style={[styles.label, {color: theme === "dark" ? "#ffffff" : "#000000"}]}>{language === "English" ? "Title": "Başlık"}</Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: theme === "dark" ? "#000000" : "#E9E9E9",
                  color: theme === "dark" ? "#ffffff" : "#000000",
                },
              ]}
              placeholder={language === "English" ? "Enter your task...": "Görevinizi girin..."}
              placeholderTextColor="#BEBEBE"
              onChangeText={taskInputHandler}
              value={enteredTaskText}
            />
          </View>

          <View style={styles.dateButtonContainer}>
          <Text style={[styles.label, {color: theme === "dark" ? "#ffffff" : "#000000"}]}>{language === "English" ? "Start Date": "Başlangıç ​​tarihi"}</Text>
            <TouchableOpacity
              style={[
                styles.dateButton,
                { backgroundColor: theme === "dark" ? "#000000" : "#E9E9E9" },
              ]}
              onPress={handleOpenStartDate}
            >
              <Iconify icon="majesticons:calendar" size={25} color="#BEBEBE" />
              <Text
                style={[
                  styles.dateButtonText,
                  { color: theme === "dark" ? "#ffffff" : "#000000" },
                ]}
              >
                {startDate}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dateButtonContainer}>
          <Text style={[styles.label, {color: theme === "dark" ? "#ffffff" : "#000000"}]}>{language === "English" ? "End Date": "Bitiş tarihi"}</Text>
            <TouchableOpacity
              style={[
                styles.dateButton,
                { backgroundColor: theme === "dark" ? "#000000" : "#E9E9E9" },
              ]}
              onPress={handleOpenEndDate}
            >
              <Iconify icon="majesticons:calendar" size={25} color="#BEBEBE" />
              <Text
                style={[
                  styles.dateButtonText,
                  { color: theme === "dark" ? "#ffffff" : "#000000" },
                ]}
              >
                {EndDate}
              </Text>
            </TouchableOpacity>
          </View>

          <View>
          <Text style={[styles.label, {color: theme === "dark" ? "#ffffff" : "#000000"}]}>{language === "English" ? "Description": "Tanım"}</Text>
            <View
              style={[
                styles.descriptionInputContainer,
                { backgroundColor: theme === "dark" ? "#000000" : "#E9E9E9" },
              ]}
            >
              <TextInput
              placeholder={language === "English" ? "Enter some details about your task...": "Görevinizle ilgili bazı ayrıntıları girin..."}
                placeholderTextColor="#a8a8a8"
                onChangeText={handleAddDescription}
                value={descriptionText}
                style={[
                  styles.descriptionTextInput,
                  { color: theme === "dark" ? "#ffffff" : "#000000" },
                ]}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <SmallButton
              onPress={() => setEditModalVisible(false)}
              title={language === "English" ? "Cancel": "Vazgeç"}
              buttonColor={false}
            />
            <SmallButton
              onPress={editHandler}
              title={language === "English" ? "Save": "Kaydet"}
              buttonColor={true}
            />
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={openStartDate}
          >
            <Pressable
              style={styles.centeredView}
              onPress={handleOpenStartDate}
            >
              <View
                style={[
                  styles.modalView,
                  { backgroundColor: theme === "dark" ? "#292929" : "#ffffff" },
                ]}
              >
                <Pressable
                  style={styles.downIcon}
                  onPress={handleOpenStartDate}
                >
                  <Iconify
                    icon="majesticons:chevron-down-line"
                    size={40}
                    color="#BEBEBE"
                  />
                </Pressable>
                <DatePicker
                  onSelectedChange={handleStartDateChange}
                  options={{
                    backgroundColor: theme === "dark" ? "#000000" : "#3a3fd3",
                    textHeaderColor: "#ffffff",
                    textDefaultColor: "#ffffff",
                    selectedTextColor: "#000000",
                    mainColor: "#ffffff",
                    textSecondaryColor: "#ffffff",
                    borderColor: "rgba(122, 146, 165, 0.1)",
                  }}
                  current="2024-06-9"
                  selected={startDate}
                  mode="calendar"
                  minuteInterval={30}
                  style={{ borderRadius: 20 }}
                />
                <TouchableOpacity
                  style={styles.doneButton}
                  onPress={handleOpenStartDate}
                >
                  <Text style={styles.doneText}>{language === "English" ? "Done": "Tamam"}</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Modal>

          <Modal animationType="slide" transparent={true} visible={openEndDate}>
            <Pressable style={styles.centeredView} onPress={handleOpenEndDate}>
              <View
                style={[
                  styles.modalView,
                  { backgroundColor: theme === "dark" ? "#292929" : "#ffffff" },
                ]}
              >
                <Pressable style={styles.downIcon} onPress={handleOpenEndDate}>
                  <Iconify
                    icon="majesticons:chevron-down-line"
                    size={40}
                    color="#BEBEBE"
                  />
                </Pressable>
                <DatePicker
                  onSelectedChange={handleEndDateChange}
                  options={{
                    backgroundColor: theme === "dark" ? "#000000" : "#3a3fd3",
                    textHeaderColor: "#ffffff",
                    textDefaultColor: "#ffffff",
                    selectedTextColor: "#000000",
                    mainColor: "#ffffff",
                    textSecondaryColor: "#ffffff",
                    borderColor: "rgba(122, 146, 165, 0.1)",
                  }}
                  current="2024-06-9"
                  selected={startDate}
                  mode="calendar"
                  minuteInterval={30}
                  style={{ borderRadius: 20 }}
                />
                <TouchableOpacity
                  style={styles.doneButton}
                  onPress={handleOpenEndDate}
                >
                  <Text style={styles.doneText}>{language === "English" ? "Done": "Tamam"}</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Modal>
        </View>
      </Modal>

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
              onPress={() => props.onDeleteItem(task._id)}
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

      <Modal visible={timerModalVisible} animationType="slide">
        <View
          style={[
            styles.timerModalContainer,
            { backgroundColor: theme === "dark" ? "#000000" : "#3a3fd3cc" },
          ]}
        >
          {task && (
            <Text
              style={[
                styles.taskName,
                { color: theme === "dark" ? "#ffffff" : "#ffffff" },
              ]}
            >
              {task.title}
            </Text>
          )}
          <Text
            style={[
              styles.timerText,
              { color: theme === "dark" ? "#ffffff" : "#ffffff" },
            ]}
          >
            {formatTime(timer)}
          </Text>
          <View style={styles.timerButtonContainer}>
            <TouchableOpacity onPress={resetTimer} style={styles.timerButton}>
              <Iconify icon="carbon:reset" size={30} color="#000000" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={isRunning ? pauseTimer : startTimer}
              style={styles.timerButton}
            >
              {isRunning ? (
                <Iconify icon="carbon:pause-filled" size={30} color="#000000" />
              ) : (
                <Iconify icon="ph:play-fill" size={30} color="#000000" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={CloseTimerModal}
              style={styles.timerButton}
            >
              <Iconify
                icon="majesticons:close-line"
                size={30}
                color="#000000"
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
}

export default TaskItem;

const styles = StyleSheet.create({
  taskItem: {
    margin: 7,
    borderRadius: 7,
    width: 350,
    backgroundColor: "#E9E9E9",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    // gap: 10,
    justifyContent: "space-between",
  },
  taskText: {
    color: "#000000",
  },
  checkIcon: {
    // padding: 5,
    // marginLeft: 10,
  },
  timerIcon: {
    // padding: 5,
    // marginRight: 10,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    gap: 10,
  },
  deleteIcon: {
    padding: 5,
    marginRight: 10,
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
    height: "20.6%",
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
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff",
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  label: {
    paddingHorizontal: 2,
    marginBottom: 5,
  },
  textInput: {
    backgroundColor: "#E9E9E9",
    height: 55,
    borderRadius: 7,
    marginBottom: 5,
    width: 350,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 10,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    width: 100,
    marginHorizontal: 8,
  },
  dateButtonContainer: {
    marginTop: 10,
  },
  dateButton: {
    backgroundColor: "#E9E9E9",
    height: 55,
    borderRadius: 7,
    marginBottom: 15,
    width: 350,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 10,
  },
  dateButtonText: {
    color: "#000000",
    fontSize: 16,
    fontFamily: "poppins",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "100%",
    height: "65%",
    padding: 35,
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
  downIcon: {
    bottom: 25,
    width: "100%",
    alignItems: "center",
  },
  doneButton: {
    marginTop: 25,
    backgroundColor: "#3a3fd3",
    height: 50,
    borderRadius: 10,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  doneText: {
    color: "#ffffffff",
    fontSize: 16,
    fontFamily: "poppins-medium",
  },
  descriptionInputContainer: {
    backgroundColor: "#E9E9E9",
    height: 150,
    borderRadius: 7,
    marginBottom: 15,
    width: 350,
    paddingVertical: 10,
  },
  descriptionTextInput: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 10,
    bottom: 50,
  },
  caButton: {
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: "center",
    width: 180,
    backgroundColor: "#3a3fd3",
    marginHorizontal: 8,
  },
  caButtonText: {
    color: "#ffffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  heading: {
    fontSize: 22,
    fontFamily: "poppins-medium",
  },
  taskDescription: {
    color: "#777",
    fontSize: 10,
    marginTop: 5,
  },
  taskItemText: {
    alignItems: "center",
  },
  timerModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3a3fd3b7",
  },
  taskName: {
    fontSize: 20,
    fontFamily: "poppins-medium",
  },
  timerText: {
    fontSize: 35,
    fontFamily: "poppins",
    marginTop: 20,
  },
  timerButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,

    gap: 10,
  },
  timerButton: {
    backgroundColor: "#E9E9E9",
    padding: 15,
    borderRadius: 50,
  },
});
