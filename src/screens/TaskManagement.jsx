import { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  ScrollView,
} from "react-native";
import SecondaryButton from "../components/SecondaryButton";

import ListItem from "../components/ListItem";
import ListInput from "../components/ListInput";

export default function TaskManagement() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    endAddGoalHandler();
  }

  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <SafeAreaView style={styles.appContainer}>
      <ListInput
        visible={modalIsVisible}
        onAddGoal={addGoalHandler}
        onCancel={endAddGoalHandler}
      />
      {/* <ScrollView> */}
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <ListItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={deleteGoalHandler}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false}
          />
        </View>
      {/* </ScrollView> */}
      <View style={{ bottom: 90 }}>
        <SecondaryButton title="Add New Goal" onPress={startAddGoalHandler} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fffffffc",
  },
  goalsContainer: {
    borderColor: "#000000",
    borderWidth: 1,
    flex: 5,
  },
});
