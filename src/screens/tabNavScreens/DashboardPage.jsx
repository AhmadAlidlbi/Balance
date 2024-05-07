import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Button,
  AppState,
} from "react-native";

import HabitItem from "../../components/HabitItem";
import HabitInput from "../../components/HabitInput";
import { useLogin } from "../../context/LoginProvider";

const DashboardPage = () => {
  const [screenTime, setScreenTime] = useState('0h 0m 0s');
  const [seconds, setSeconds] = useState(0);
  const [appState, setAppState] = useState(AppState.currentState);
  const [focusScore, setFocusScore] = useState(0);
  const {  profile } = useLogin();

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      clearInterval(interval);
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = (nextAppState) => {
    setAppState(nextAppState);
  };

  useEffect(() => {
    // Update screenTime format
    const calculateScreenTime = () => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      setScreenTime(`${hours}h ${minutes}m ${secs}s`);
    };

    calculateScreenTime();
  }, [seconds]);

  useEffect(() => {
    const calculateFocusScore = () => {
      setFocusScore(calculateFocusScoreHelper(seconds, appState));
    };

    calculateFocusScore(); // Calculate initially
  }, [appState, seconds]);

  const calculateFocusScoreHelper = (screenTime, appState) => {
    // Define weights for different app states
    const foreground_weight = 0.8;
    const background_weight = 0.2;
    const inactive_weight = 0.1;

    const normalized_time = screenTime / 3600; // Normalize to hours

    let focusScore = 1.0; // Start at 100%

    if (appState === "foreground") {
      focusScore -= foreground_weight * normalized_time;
    } else if (appState === "background") {
      focusScore -= background_weight * normalized_time;
    } else {
      focusScore -= inactive_weight * normalized_time;
    }

    // Ensure focus score stays between 0 and 1
    return Math.max(0, Math.min(1, focusScore)); 
  }

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [habit, setNewHabit] = useState([]);

  function startAddHabitHandler() {
    setModalIsVisible(true);
  }

  function endAddHabitHandler() {
    setModalIsVisible(false);
  }

  function addHabitHandler(enteredHabitText) {
    setNewHabit((currentHabit) => [
      ...currentHabit,
      { text: enteredHabitText, id: Math.random().toString() },
    ]);
    endAddHabitHandler();
  }

  function deleteHabitHandler(id) {
    setNewHabit((currentHabit) => {
      return currentHabit.filter((habit) => habit.id !== id);
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        {/* User's profile picture */}
        <Image
        source={profile.avatar ? { uri: profile.avatar } : require("../../assets/images/profilePlaceholder.png")}
          style={styles.profileImage}
        />

        {/* User's name */}
        <Text style={styles.profileName}>Hey, {profile.fullName}</Text>
      </View>

      {/* Screen time calculation widget */}
      <View style={styles.screenTimeWidgetContainer}>
        <Text style={styles.time}>{screenTime}</Text>
        <Text style={styles.screenTimeText}>Screen time today</Text>
        <Text style={styles.focusScore}>Focus Score: {(focusScore * 100).toFixed(0)}%</Text>
      </View>

      {/* List of tasks */}
      <View style={styles.tasksContainer}>
        <View style={styles.listHeader}>
          <Text style={styles.listName}>Daily Habit / {habit.length}</Text>
          <View style={styles.listButton}>
            <Button title="Add" onPress={startAddHabitHandler} color="white" />
          </View>
        </View>

        <HabitInput
          visible={modalIsVisible}
          onAddHabit={addHabitHandler}
          onCancel={endAddHabitHandler}
        />
        <View style={styles.listContainer}>
          <FlatList
            data={habit}
            renderItem={(itemData) => {
              return (
                <HabitItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={deleteHabitHandler}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  profileImage: {
    width: 51,
    height: 50,
    borderRadius: 40,
    marginRight: 10,
    marginLeft: 15,
    marginTop: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  screenTimeWidgetContainer: {
    backgroundColor: "#3a3fd3", //3a3fd3
    borderRadius: 15,
    height: 170,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
  },
  time: {
    fontSize: 45,
    color: "#ffffff",
    marginBottom: 5,
  },
  screenTimeText: {
    fontSize: 20,
    color: "#ffffff",
    marginBottom: 10,
  },
  focusScore: {
    fontSize: 15,
    color: "#ffffff",
  },
  // tasksContainer: {
  //   marginTop: 25,
  //   height: 420,
  //   marginHorizontal: 20,
  //   backgroundColor: "#e9e9e9",
  //   borderRadius: 15,
  // },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginHorizontal: 20,
    marginTop: 20,
  },
  listName: {
    fontSize: 18,
  },
  listButton: {
    fontSize: 18,
    borderRadius: 10,
    backgroundColor: "#3a3fd3",
    width: 60,
  },
  tasksContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fffffffc",
    marginTop: 10,
  },
  listContainer: {
    height: "70%",
  },
});

export default DashboardPage;
