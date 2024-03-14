import { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  Touchable,
  TouchableOpacity,
  Text,
  Pressable,
} from "react-native";
import { Iconify } from "react-native-iconify";
import DatePicker from "react-native-modern-datepicker";

function ListInput(props) {
  const [enteredListText, setEnteredListText] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState("");

  function listInputHandler(enteredText) {
    setEnteredListText(enteredText);
  }

  function addListHandler() {
    props.onAddList(enteredListText);
    setEnteredListText("");
  }

  function handleOpenDate() {
    setOpenDate(!openDate);
  }

  function handleDateChange(date) {
    setDate(date);
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="new list name"
          placeholderTextColor="#BEBEBE"
          onChangeText={listInputHandler}
          value={enteredListText}
        />

        <View style={styles.dateButtonContainer}>
          <TouchableOpacity style={styles.dateButton} onPress={handleOpenDate}>
            <Iconify icon="majesticons:calendar" size={25} color="#BEBEBE" />
            <Text style={styles.dateButtonText}>{date || "Start Date"}</Text>
          </TouchableOpacity>
        </View>

        <Modal animationType="slide" transparent={true} visible={openDate}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable style={styles.downIcon} onPress={handleOpenDate}>
                <Iconify
                  icon="majesticons:chevron-down-line"
                  size={40}
                  color="#BEBEBE"
                />
              </Pressable>
              <DatePicker
                onSelectedChange={handleDateChange}
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
                selected={date}
                mode="calendar"
                minuteInterval={30}
                style={{ borderRadius: 20 }}
              />
              <TouchableOpacity style={styles.doneButton} onPress={handleOpenDate}>
                <Text style={styles.doneText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Cancel" onPress={props.onCancel} color="#f31282" />
          </View>
          <View style={styles.button}>
            <Button title="Add List" onPress={addListHandler} color="#3238FF" />
          </View>
        </View>
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
  textInput: {
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
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
  },
  button: {
    width: 100,
    marginHorizontal: 8,
  },
  dateButtonContainer: {
    marginTop: 16,
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
    // borderColor: "#ff0000",
    // borderWidth: 1,
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
});
