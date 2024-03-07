import { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  ScrollView,
} from "react-native";
import SecondaryButton from "../../components/SecondaryButton";

import ListItem from "../../components/ListItem";
import ListInput from "../../components/ListInput";

export default function TaskManagement() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [list, setNewList] = useState([]);

  function startAddListHandler() {
    setModalIsVisible(true);
  }

  function endAddListHandler() {
    setModalIsVisible(false);
  }

  function addListHandler(enteredListText) {
    setNewList((currentList) => [
      ...currentList,
      { text: enteredListText, id: Math.random().toString() },
    ]);
    endAddListHandler();
  }

  function deleteListHandler(id) {
    setNewList((currentList) => {
      return currentList.filter((list) => list.id !== id);
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ListInput
        visible={modalIsVisible}
        onAddList={addListHandler}
        onCancel={endAddListHandler}
      />
      <View style={styles.listContainer}>
        <FlatList
          data={list}
          renderItem={(itemData) => {
            return (
              <ListItem
                text={itemData.item.text}
                id={itemData.item.id}
                onDeleteItem={deleteListHandler}
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
        <SecondaryButton title="New List" onPress={startAddListHandler} />
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
