import { useState } from "react";
import { View, TextInput, Button, StyleSheet, Modal } from "react-native";
import SmallButton from "./SmallButton";

function HabitInput(props) {
  const [enteredHabitText, setEnteredHabitText] = useState("");

  function HabitInputHandler(enteredHabitText) {
    setEnteredHabitText(enteredHabitText);
  }

  function addHabitHandler() {
    props.onAddHabit(enteredHabitText);
    setEnteredHabitText("");
  }

  return (
    <Modal visible={props.visible} animationType="fade" transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextInput
            style={styles.textInput}
            placeholder="New Habit"
            placeholderTextColor="#BEBEBE"
            onChangeText={HabitInputHandler}
            value={enteredHabitText}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <SmallButton
                title="Cancel"
                onPress={props.onCancel}
                buttonColor={false}
              />
            </View>
            <View style={styles.button}>
              <SmallButton
                title="Add"
                onPress={addHabitHandler}
                buttonColor={true}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default HabitInput;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "100%",
    height: "20%",
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
    gap: 70,
    flexDirection: "row",
  },
  button: {
    width: 100,
  },
});
