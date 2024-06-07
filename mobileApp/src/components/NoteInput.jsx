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
import { useLogin } from "../context/LoginProvider";

function NoteInput(props) {
  const [enteredNoteText, setEnteredNoteText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [error, setError] = useState(false);
  const { theme, language } = useLogin();

  function handleAddDescription(descriptionText) {
    setDescriptionText(descriptionText);
  }

  function noteInputHandler(enteredText) {
    setEnteredNoteText(enteredText);
  }

  function addNoteHandler() {
    if(!enteredNoteText || !descriptionText) {
      setError(true);
      return;
    }
    setError(false);
    props.onAddNote(enteredNoteText, descriptionText);
    setEnteredNoteText("");
    setDescriptionText("");
  }

  return (
    <Modal visible={props.visible} animationType="none">
      <View style={[styles.inputContainer, { backgroundColor: theme === "dark" ? "#292929" : "#ffffff" }]}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={props.onCancel}>
            <Iconify
              icon="fluent:ios-arrow-left-24-filled"
              size={20}
              color={theme === "dark" ? "#ffffff" : "#000000"}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={addNoteHandler}>
            <Text style={[styles.done, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>{language === "English" ? "Done": "Tamam"}</Text>
          </TouchableOpacity>
        </View>
        {error && <Text style={{ color: "red" }}>{language === "English" ? "lease fill all fields": "Lütfen tüm alanları doldurun"}</Text>}
        <View>
          <TextInput
            style={[styles.textInput, { color: theme === "dark" ? "#ffffff" : "#000000" }]}
            placeholder={language === "English" ? "Title": "Başlık"}
            placeholderTextColor="#BEBEBE"
            onChangeText={noteInputHandler}
            value={enteredNoteText}
          />
        </View>

        <View>
          <View style={styles.descriptionInputContainer}>
            <TextInput
              placeholder={language === "English" ? "Enter Your Note...": "Notunuzu Girin..."}
              placeholderTextColor="#a8a8a8"
              onChangeText={handleAddDescription}
              value={descriptionText}
              style={[styles.descriptionTextInput, { color: theme === "dark" ? "#ffffff" : "#000000" }]}
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
    minWidth: 400,
    maxWidth: 400,
    borderBottomColor: "#484848",
    borderBottomWidth: 0.5,
    paddingHorizontal: 20,
    fontSize: 16,
    paddingVertical: 10,
  },
  descriptionInputContainer: {
    height: "80%",
    width: 400,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  descriptionTextInput: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlignVertical: "top",
    fontSize: 16,
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
