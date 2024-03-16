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
import SmallButton from "../components/SmallButton";

function ListInput(props) {
  const [enteredListText, setEnteredListText] = useState("");

  const [openStartDate, setOpeStartDate] = useState(false);
  const [startDate, setStartDate] = useState("");

  const [openEndDate, setOpenEndDate] = useState(false);
  const [EndDate, setEndDate] = useState("");

  const [descriptionText, setDescriptionText] = useState("");

  function handleAddDescription(descriptionText) {
    setDescriptionText(descriptionText);
    console.log(descriptionText);
  }

  function listInputHandler(enteredText) {
    setEnteredListText(enteredText);
  }

  function addListHandler() {
    props.onAddList(enteredListText);
    setEnteredListText("");
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

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.heading}>Add New Task</Text>
        </View>
        <View>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your task..."
            placeholderTextColor="#BEBEBE"
            onChangeText={listInputHandler}
            value={enteredListText}
          />
        </View>

        <View style={styles.dateButtonContainer}>
          <Text style={styles.label}>Start Date</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={handleOpenStartDate}
          >
            <Iconify icon="majesticons:calendar" size={25} color="#BEBEBE" />
            <Text style={styles.dateButtonText}>
              {startDate}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dateButtonContainer}>
          <Text style={styles.label}>End Date</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={handleOpenEndDate}
          >
            <Iconify icon="majesticons:calendar" size={25} color="#BEBEBE" />
            <Text style={styles.dateButtonText}>{EndDate}</Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.label}>Description</Text>
          <View style={styles.descriptionInputContainer}>
            <TextInput
              placeholder="Enter some details about your task..."
              placeholderTextColor="#a8a8a8"
              onChangeText={handleAddDescription}
              value={descriptionText}
              style={styles.descriptionTextInput}
              multiline={true}
              numberOfLines={4}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <SmallButton
            onPress={props.onCancel}
            title="Cancel"
            buttonColor={false}
          />
          <SmallButton
            onPress={addListHandler}
            title="Add"
            buttonColor={true}
          />
        </View>

        <Modal animationType="slide" transparent={true} visible={openStartDate}>
          <Pressable style={styles.centeredView} onPress={handleOpenStartDate}>
            <View style={styles.modalView}>
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
                  backgroundColor: "#3a3fd3",
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
                <Text style={styles.doneText}>Done</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>

        <Modal animationType="slide" transparent={true} visible={openEndDate}>
          <Pressable style={styles.centeredView} onPress={handleOpenEndDate}>
            <View style={styles.modalView}>
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
                  backgroundColor: "#3a3fd3",
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
                <Text style={styles.doneText}>Done</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>
      </View>
    </Modal>
  );
}

export default ListInput;

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
    marginTop: 20,
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
    bottom: 90,
    fontFamily: "poppins-medium",
  },
});
