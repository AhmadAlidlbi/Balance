import { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  ScrollView,
} from "react-native";
import SecondaryButton from "../../components/SecondaryButton";

import NoteItem from "../../components/NoteItem";
import NoteInput from "../../components/NoteInput";

export default function NoteManagement() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [note, setNewNote] = useState([]);

  function startAddNoteHandler() {
    setModalIsVisible(true);
  }

  function endAddNoteHandler() {
    setModalIsVisible(false);
  }

  function addNoteHandler(enteredNoteText) {
    setNewNote((currentNote) => [
      ...currentNote,
      { text: enteredNoteText, id: Math.random().toString() },
    ]);
    endAddNoteHandler();
  }

  function deleteNoteHandler(id) {
    setNewNote((currentNote) => {
      return currentNote.filter((note) => note.id !== id);
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <NoteInput
        visible={modalIsVisible}
        onAddNote={addNoteHandler}
        onCancel={endAddNoteHandler}
      />
      <View style={styles.listContainer}>
        <FlatList
          data={note}
          renderItem={(itemData) => {
            return (
              <NoteItem
                text={itemData.item.text}
                id={itemData.item.id}
                onDeleteItem={deleteNoteHandler}
              />
            );
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          alwaysBounceVertical={false}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <SecondaryButton title="New Note" onPress={startAddNoteHandler} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fffffffc",
  },
  listContainer: {
    height: "81%",
  },
});
