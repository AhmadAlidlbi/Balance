import { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Text,
} from "react-native";
import { Iconify } from "react-native-iconify";

function NoteInput(props) {
  const [enteredNoteText, setEnteredNoteText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");

  function handleAddDescription(descriptionText) {
    setDescriptionText(descriptionText);
  }

  function noteInputHandler(enteredText) {
    setEnteredNoteText(enteredText);
  }

  function addNoteHandler() {
    s;
    props.onAddNote(enteredNoteText);
    setEnteredNoteText("");
    setDescriptionText("");
  }

  return (
    <Modal visible={props.visible} animationType="none">
      <View style={styles.inputContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={props.onCancel}>
            <Iconify
              icon="fluent:ios-arrow-left-24-filled"
              size={20}
              color={"#000000"}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={addNoteHandler}>
            <Text style={styles.done}>Done</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Title"
            placeholderTextColor="#BEBEBE"
            onChangeText={noteInputHandler}
            value={enteredNoteText}
          />
        </View>

        <View>
          <View style={styles.descriptionInputContainer}>
            <TextInput
              placeholder="Enter Your Note..."
              placeholderTextColor="#a8a8a8"
              onChangeText={handleAddDescription}
              value={descriptionText}
              style={styles.descriptionTextInput}
              multiline={true}
              numberOfLines={4}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default NoteInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  textInput: {
    height: 55,
    marginBottom: 5,
    width: 400,
    paddingHorizontal: 10,
    borderBottomColor: "#484848",
    borderBottomWidth: 0.5,
  },
  descriptionInputContainer: {
    height: "80%",
    width: 400,
    paddingVertical: 10,
  },
  descriptionTextInput: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  done: {
    fontFamily: "poppins-medium",
    fontSize: 14,
    color: "#000000",
  },
});
