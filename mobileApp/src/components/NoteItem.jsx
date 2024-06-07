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
import { useEffect, useState } from "react";
import DatePicker from "react-native-modern-datepicker";
import SmallButton from "./SmallButton";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useLogin } from "../context/LoginProvider";

function NoteItem(props) {
  const isFocused = useIsFocused();
  const [isPressed, setIsPressed] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const { note } = props;
  const { theme, language  } = useLogin();
  const navigation=useNavigation();


  const [enteredNoteText, setEnteredNoteText] = useState(note.title);
 
  useEffect(() => {
    setEnteredNoteText(note.title);
    setDescriptionText(note.description);
  }, [isFocused]);

  const [descriptionText, setDescriptionText] = useState(note.description);

  function handleAddDescription(descriptionText) {
    setDescriptionText(descriptionText);
  }

  function noteInputHandler(enteredText) {
    setEnteredNoteText(enteredText);
  }

  function editNoteHandler() {
    props.onEditItem(note._id, enteredNoteText, descriptionText);
   
    setEditModalVisible(false);

  }
  

  return (
    <TouchableOpacity
      style={[styles.noteItem, { backgroundColor: theme === "dark" ? "#292929" : "#E9E9E9" }]}
      onLongPress={() => setEditModalVisible(true)}
      onPress={() => {
        navigation.navigate("NoteDetails", { note });
      }}
    >
      <View android_ripple={{ color: "#210644" }}>
        <Text
          style={[
            styles.noteText,
            // isPressed && { textDecorationLine: "line-through" },
            { color: theme === "dark" ? "#ffffff" : "#000000" },
          ]}
        >
          {note.title}
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
        <View style={[styles.inputContainer, {backgroundColor: theme === "dark" ? "#292929" : "#ffffff" }]}>
          <View>
            <Text style={[styles.heading, {color: theme === "dark" ? "#ffffff" : "#000000"}]}>{language === "English" ? "Edit Note": "Notu Düzenle"}</Text>
          </View>
          <View>
            <Text style={[styles.label, {color: theme === "dark" ? "#ffffff" : "#000000"}]}>{language === "English" ? "Title": "Başlık"}</Text>
            <TextInput
              style={[styles.textInput, {backgroundColor: theme === "dark" ? "#000000" : "#E9E9E9", color: theme === "dark" ? "#ffffff" : "#000000" }]}
              placeholder={language === "English" ? "Edit your note...": "Notunuzu düzenleyin..."}
              placeholderTextColor="#BEBEBE"
              onChangeText={noteInputHandler}
              value={enteredNoteText}
            />
          </View>

          <View>
          <Text style={[styles.label, {color: theme === "dark" ? "#ffffff" : "#000000"}]}>{language === "English" ? "Description": "Tanım"}</Text>
          <View style={[styles.descriptionInputContainer, {backgroundColor: theme === "dark" ? "#000000" : "#E9E9E9"}]}>
            <TextInput
              placeholder={language === "English" ? "Enter some details about your note...": "Notunuzla ilgili bazı ayrıntıları girin..."}
              placeholderTextColor="#a8a8a8"
              onChangeText={handleAddDescription}
              value={descriptionText}
              style={[styles.descriptionTextInput, {color: theme === "dark" ? "#ffffff" : "#000000"}]}
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
              onPress={() => {
                editNoteHandler();
                setEditModalVisible(false);
              }}
              title={language === "English" ? "Save": "Kaydet"}
              buttonColor={true}
            />
          </View>

          
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
              onPress={() => props.onDeleteItem(note._id)}
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
    fontSize: 16,
    fontFamily: "poppins",
    padding: 10,
    width: 200,
    textTransform: "capitalize",
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
    // bottom: 90,
    fontFamily: "poppins-medium",
  },
});
