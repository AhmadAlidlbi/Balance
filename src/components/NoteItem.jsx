import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
} from "react-native";
import { Iconify } from "react-native-iconify";
import { useState } from "react";
import DatePicker from "react-native-modern-datepicker";
import SmallButton from "./SmallButton";

function NoteItem(props) {
  const [isPressed, setIsPressed] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const handleCheckPress = () => {
    // Toggle the state when the icon is pressed
    setIsPressed(!isPressed);
  };

  const [enteredNoteText, setEnteredNoteText] = useState("");

  const [openStartDate, setOpeStartDate] = useState(false);
  const [startDate, setStartDate] = useState("");

  const [openEndDate, setOpenEndDate] = useState(false);
  const [EndDate, setEndDate] = useState("");

  const [descriptionText, setDescriptionText] = useState("");

  function handleAddDescription(descriptionText) {
    setDescriptionText(descriptionText);
    console.log(descriptionText);
  }

  function noteInputHandler(enteredText) {
    setEnteredNoteText(enteredText);
  }

  function addNoteHandler() {
    props.onAddNote(enteredNoteText);
    setEnteredNoteText("");
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
    <TouchableOpacity
      style={styles.noteItem}
      onPress={() => setEditModalVisible(true)}
    >
      <View android_ripple={{ color: "#210644" }}>
        <Text
          style={[
            styles.noteText,
            isPressed && { textDecorationLine: "line-through" },
          ]}
        >
          {props.text}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => setDeleteModalVisible(true)}
        style={styles.deleteIcon}
      >
        <Iconify icon="majesticons:delete-bin" size={25} color={"#FF3B30"} />
      </TouchableOpacity>

      {/* Edit Modal */}

      <Modal visible={editModalVisible} animationType="slide">
        <View style={styles.inputContainer}>
          <View>
            <Text style={styles.heading}>Edit Note</Text>
          </View>
          <View>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your note..."
              placeholderTextColor="#BEBEBE"
              onChangeText={noteInputHandler}
              value={enteredNoteText}
            />
          </View>

          <View style={styles.dateButtonContainer}>
            <Text style={styles.label}>Start Date</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={handleOpenStartDate}
            >
              <Iconify icon="majesticons:calendar" size={25} color="#BEBEBE" />
              <Text style={styles.dateButtonText}>{startDate}</Text>
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
                placeholder="Enter some details about your note..."
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
              onPress={() => setEditModalVisible(false)}
              title="Cancel"
              buttonColor={false}
            />
            <SmallButton
              onPress={() => setEditModalVisible(false)}
              title="Save"
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
              <View style={styles.modalView}>
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
              onPress={props.onDeleteItem.bind(this, props.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setDeleteModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
}

export default NoteItem;

const styles = StyleSheet.create({
  noteItem: {
    margin: 7,
    borderRadius: 7,
    width: 350,
    backgroundColor: "#E9E9E9",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "space-between",
  },
  noteText: {
    color: "#000000",
  },
  checkIcon: {
    padding: 5,
    marginLeft: 10,
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
