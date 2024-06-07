import { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Text,
  Pressable,
} from "react-native";
import { Iconify } from "react-native-iconify";
import DatePicker from "react-native-modern-datepicker";
import SmallButton from "./SmallButton";
import { useLogin } from "../context/LoginProvider";

function TaskInput(props) {
  const [enteredTaskText, setEnteredTaskText] = useState("");
  const { profile, theme, language } = useLogin();

  const [openStartDate, setOpeStartDate] = useState(false);
  const [startDate, setStartDate] = useState("");

  const [openEndDate, setOpenEndDate] = useState(false);
  const [EndDate, setEndDate] = useState("");

  const [descriptionText, setDescriptionText] = useState("");
  const [error, setError] = useState(false);

  function handleAddDescription(descriptionText) {
    setDescriptionText(descriptionText);
  }

  function taskInputHandler(enteredText) {
    setEnteredTaskText(enteredText);
  }

  function addTaskHandler() {
    // validate all fields
    if (!enteredTaskText || !startDate || !EndDate) {
      setError(true);
      return;
    }
    setError(false);

    const payload = {
      title: enteredTaskText,
      description: descriptionText,
      startDate: startDate,
      endDate: EndDate,
    };
    props.onAddTask(payload);
    setEnteredTaskText("");
    setDescriptionText("");
    setStartDate("");
    setEndDate("");
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

  function resetFormFields() {
    setEnteredTaskText("");
    setDescriptionText("");
    setStartDate("");
    setEndDate("");
    setError(false);
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={[styles.inputContainer, { backgroundColor: theme === "dark" ? "#292929" : "#ffffff" }]}>
        <View>
          <Text style={[styles.heading, {color: theme === "dark" ? "#ffffff" : "#000000"}]}>{language === "English" ? "Add New Task": "Yeni Görev Ekle"}</Text>
        </View>
        {error && <Text style={{ color: "red" }}>{language === "English" ? "Please fill all fields": "Lütfen tüm alanları doldurun"}</Text>}
        <View>
          <Text style={[styles.label, {color: theme === "dark" ? "#ffffff" : "#000000"}]}>{language === "English" ? "Title": "Başlık"}</Text>
          <TextInput
            style={[styles.textInput, { backgroundColor: theme === "dark" ? "#000000" : "#E9E9E9", color: theme === "dark" ? "#ffffff" : "#000000" }]}
            placeholder={language === "English" ? "Enter your task...": "Görevinizi girin..."}
            placeholderTextColor="#BEBEBE"
            onChangeText={taskInputHandler}
            value={enteredTaskText}
          />
        </View>

        <View style={styles.dateButtonContainer}>
          <Text style={[styles.label, {color: theme === "dark" ? "#ffffff" : "#000000"}]}>{language === "English" ? "Start Date": "Başlangıç ​​tarihi"}</Text>
          <TouchableOpacity
            style={[styles.dateButton, { backgroundColor: theme === "dark" ? "#000000" : "#E9E9E9" }]}
            onPress={handleOpenStartDate}
          >
            <Iconify icon="majesticons:calendar" size={25} color="#BEBEBE" />
            <Text style={[styles.dateButtonText, {color: theme === "dark" ? "#ffffff" : "#000000"}]}>{startDate}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dateButtonContainer}>
          <Text style={[styles.label, {color: theme === "dark" ? "#ffffff" : "#000000"}]}>{language === "English" ? "End Date": "Bitiş tarihi"}</Text>
          <TouchableOpacity
            style={[styles.dateButton, { backgroundColor: theme === "dark" ? "#000000" : "#E9E9E9" }]}
            onPress={handleOpenEndDate}
          >
            <Iconify icon="majesticons:calendar" size={25} color="#BEBEBE" />
            <Text style={[styles.dateButtonText, {color: theme === "dark" ? "#ffffff" : "#000000"}]}>{EndDate}</Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={[styles.label, {color: theme === "dark" ? "#ffffff" : "#000000"}]}>{language === "English" ? "Description": "Tanım"}</Text>
          <View style={[styles.descriptionInputContainer, {backgroundColor: theme === "dark" ? "#000000" : "#E9E9E9"}]}>
            <TextInput
              placeholder={language === "English" ? "Enter some details about your task...": "Görevinizle ilgili bazı ayrıntıları girin..."}
              placeholderTextColor="#a8a8a8"
              onChangeText={handleAddDescription}
              value={descriptionText}
              style={[styles.descriptionTextInput, {color: theme === "dark" ? "#ffffff" : "#000000"}]}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <SmallButton
            onPress={() => {
              props.onCancel();
              resetFormFields();
            }}
            title={language === "English" ? "Cancel": "Vazgeç"}
            buttonColor={false}
          />
          <SmallButton
            onPress={addTaskHandler}
            title={language === "English" ? "Add": "Ekle"}
            buttonColor={true}
          />
        </View>

        <Modal animationType="slide" transparent={true} visible={openStartDate}>
          <Pressable style={styles.centeredView} onPress={handleOpenStartDate}>
            <View style={[styles.modalView, { backgroundColor: theme === "dark" ? "#292929" : "#ffffff" }]}>
              <Pressable style={styles.downIcon} onPress={handleOpenStartDate}>
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
            <View style={[styles.modalView, { backgroundColor: theme === "dark" ? "#292929" : "#ffffff" }]}>
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
  );
}

export default TaskInput;

const styles = StyleSheet.create({
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
    backgroundColor: "#ffffff",
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
    color: "#ffffff",
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
});
