import { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Modal,
} from 'react-native';

function HabitInput(props) {
  const [enteredHabitText, setEnteredHabitText] = useState('');

  function HabitInputHandler(enteredHabitText) {
    setEnteredHabitText(enteredHabitText);
  }

  function addHabitHandler() {
    props.onAddHabit(enteredHabitText);
    setEnteredHabitText('');
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="New habit"
          placeholderTextColor="#BEBEBE"
          onChangeText={HabitInputHandler}
          value={enteredHabitText}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Cancel" onPress={props.onCancel} color="#f31282" />
          </View>
          <View style={styles.button}>
            <Button title="Add" onPress={addHabitHandler} color="#3238FF" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default HabitInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  textInput: {
    backgroundColor: '#E9E9E9',
    borderRadius: 6,
    width: '100%',
    padding: 16,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: 'row',
  },
  button: {
    width: 100,
    marginHorizontal: 8,
  },
});