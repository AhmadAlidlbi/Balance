import { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  Image,
} from 'react-native';

function ListItem(props) {
  const [enteredListText, setEnteredListText] = useState('');

  function listInputHandler(enteredText) {
    setEnteredListText(enteredText);
  }

  function addListHandler() {
    props.onAddGoal(enteredListText);
    setEnteredListText('');
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        {/* <Image
          style={styles.image}
          source={require('../assets/images/goal.png')}
        /> */}
        <TextInput
          style={styles.textInput}
          placeholder="new list name"
          placeholderTextColor="#BEBEBE"
          onChangeText={listInputHandler}
          value={enteredListText}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Cancel" onPress={props.onCancel} color="#f31282" />
          </View>
          <View style={styles.button}>
            <Button title="Add Goal" onPress={addListHandler} color="#b180f0" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default ListItem;

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