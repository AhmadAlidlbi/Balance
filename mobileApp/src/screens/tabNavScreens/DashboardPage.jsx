import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";

import HabitItem from "../../components/HabitItem";
import HabitInput from "../../components/HabitInput";
import { useLogin } from "../../context/LoginProvider";
import { Iconify } from "react-native-iconify";
import {
  createHabit,
  deleteHabit,
  getHabitsByUserId,
  updateHabit,
} from "../../../api/habitApi";
import { BASE_URL } from "../../../utils/config";
import { useIsFocused } from "@react-navigation/native";
import { getProfile } from "../../../api/user";
import * as Progress from "react-native-progress";
import { Font } from "expo-font";
import { Audio } from "expo-av";
import { PieChart } from "react-native-gifted-charts";
const successSound = require("../../assets/sounds/success.mp3");
import { getCompletedTasks } from "../../../api/task";

const EnglishMotivationalSentences = [
  "Have a productive day! 🌟",
  "Stay focused and motivated! 💪",
  "You've got this! 👍",
  "Make today amazing! ✨",
  "Keep pushing forward! 🚀",
  "Believe in yourself! 💫",
  "Today is your day! 🎉",
];

const TurkishMotivationalSentences = [
  "Verimli bir gün geçir! 🌟",
  "Odaklanmış ve motive olmuş kal! 💪",
  "Bunu başarabilirsin! 👍",
  "Bugün harika yap! ✨",
  "Devam et! 🚀",
  "Kendine inan! 💫",
  "Bugün senin günün! 🎉",
];

const DashboardPage = ({ navigation }) => {
  const { profile, setProfile, theme, language, soundEnabled } = useLogin();
  const isFocused = useIsFocused();
  const [progress, setProgress] = useState(0);
  const [completedHabits, setCompletedHabits] = useState(0);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [allHabits, setAllHabits] = useState([]);
  const [playSuccessSound, setPlaySuccessSound] = useState(false);
  const [showGoodJob, setShowGoodJob] = useState(false);
  const [englishMotivationalSentence, setEnglishMotivationalSentence] =
    useState("");
  const [turkishMotivationalSentence, setTurkishMotivationalSentence] =
    useState("");
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const fetchCompletedTasks = async (userId) => {
      try {
        const response = await getCompletedTasks(userId);
        if (response.success) {
          setCompletedTasks(response.tasks);
        } else {
          console.error("Error fetching completed tasks:", response.message);
        }
      } catch (error) {
        console.error("Error fetching completed tasks:", error);
      }
    };

    if (profile.id) {
      fetchCompletedTasks(profile.id);
    }
  }, [profile.id]);

  const completedHabitsCount = completedHabits;
  const pendingHabitsCount = allHabits.length - completedHabitsCount;
  const completedTasksCount = completedTasks.length;
  const pendingTasksCount = completedTasksCount;

  const pieChartData = [
    { value: completedHabitsCount, color: "green", text: "Completed Habits" },
    { value: pendingHabitsCount, color: "#ff9100", text: "Pending Habits" },
    { value: completedTasksCount, color: "blue", text: "Completed Tasks" },
    { value: pendingTasksCount, color: "red", text: "Pending Tasks" },
  ];

  const fetchHabits = useCallback(async () => {
    try {
      if (profile.id) {
        const { habits } = await getHabitsByUserId(profile.id);
        setAllHabits(habits);
        const completedHabits = habits.filter((habit) => habit.completed);
        setProgress(
          completedHabits.length ? completedHabits.length / habits.length : 0
        );
        setCompletedHabits(completedHabits.length);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  }, [profile.id]);

  useEffect(() => {
    if (isFocused) {
      getProfileHandler();
      fetchHabits();
    }
  }, [isFocused, fetchHabits]);

  useEffect(() => {
    if (progress === 1) {
      setPlaySuccessSound(true);
      setShowGoodJob(true);

      setTimeout(() => {
        setShowGoodJob(false);
      }, 3000);
    }
  }, [progress]);

  useEffect(() => {
    const playSound = async () => {
      try {
        if (soundEnabled && playSuccessSound) {
          const { sound } = await Audio.Sound.createAsync(successSound);
          await sound.playAsync();
        }
      } catch (error) {
        console.log("Error playing sound:", error);
      }
    };

    playSound();
    setPlaySuccessSound(false);
  }, [soundEnabled, playSuccessSound]);

  useEffect(() => {
    const randomIndex = Math.floor(
      Math.random() * EnglishMotivationalSentences.length
    );
    setEnglishMotivationalSentence(EnglishMotivationalSentences[randomIndex]);
  }, []);

  useEffect(() => {
    const randomIndex = Math.floor(
      Math.random() * TurkishMotivationalSentences.length
    );
    setTurkishMotivationalSentence(TurkishMotivationalSentences[randomIndex]);
  }, []);

  const getProfileHandler = async () => {
    try {
      const res = await getProfile();
      if (res.success && res.user) {
        setProfile(res.user);
      }
    } catch (error) {
      console.log("Profile Error:", error);
    }
  };

  function startAddHabitHandler() {
    setModalIsVisible(true);
  }

  function endAddHabitHandler() {
    setModalIsVisible(false);
  }

  async function addHabitHandler(enteredHabitText) {
    try {
      await createHabit(enteredHabitText, profile.id);
      fetchHabits();
    } catch (error) {
      console.log("Error:", error.message);
    }
    endAddHabitHandler();
  }

  async function deleteHabitHandler(id) {
    try {
      await deleteHabit(id);
      fetchHabits();
    } catch (error) {
      console.log("Error:", error.message);
    }
  }

  async function updateHabitHandler(id, completed) {
    try {
      await updateHabit(id, !completed);
      fetchHabits();
    } catch (error) {
      console.log("Error:", error.message);
    }
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "#000000" : "#ffffff" },
      ]}
    >
      <View style={styles.headerContainer}>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Image
              source={
                profile.avatar
                  ? { uri: BASE_URL + "/uploads/" + profile.avatar }
                  : require("../../assets/images/profilePlaceholder.png")
              }
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Text
              style={[
                styles.profileName,
                { color: theme === "dark" ? "#ffffff" : "#000000" },
              ]}
            >
              {language === "English" ? "Hey, " : "Merhaba, "}
              {profile?.fullName}            </Text>
          </TouchableOpacity>
          <Text
            style={[
              styles.quote,
              { color: theme === "dark" ? "#ffffff" : "#777" },
            ]}
          >
            {language === "English"
              ? englishMotivationalSentence
              : turkishMotivationalSentence}
          </Text>
        </View>

        {/* majesticons:moon */}

        <View style={styles.rightHeader}>
          <TouchableOpacity
            onPress={() => navigation.navigate("OnboardingTutorialModal")}
          >
            <Image
              style={styles.logo}
              source={
                theme === "dark"
                  ? require("../../assets/images/darkModeLogo.png")
                  : require("../../assets/images/logo.png")
              }
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.widgets}>
        <TouchableOpacity
          style={[
            styles.screenTimeWidgetContainer,
            { backgroundColor: theme === "dark" ? "#292929" : "#3a3fd3" },
          ]}
        >
          <Progress.Circle
            color="white"
            textStyle={{
              fontSize: 16,
            }}
            showsText
            progress={progress}
            size={70}
          />
            <Text style={styles.time}>
              {showGoodJob
                ? language === "English"
                  ? "Good Job 🎉!"
                  : "Harika İş Çıkardınız 🎉!"
                : language === "English"
                ? "Completed Habits " + completedHabits + "/" + allHabits?.length
                : "Tamamlanan Alışkanlıklar " +
                  completedHabits +
                  "/" +
                  allHabits?.length}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.screenTimeWidgetContainer,
            { backgroundColor: theme === "dark" ? "#292929" : "#3a3fd3" },
          ]}
        >
          <PieChart
            data={pieChartData}
            radius={50}
            valueAccessor={({ item }) => item.value} 
            innerRadius={30} 
            padAngle={0.02} 
            cornerRadius={5} 
          />
          <Text style={styles.screenTimeText}>
            {language === "English" ? "Analytics" : "Analitik"}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.tasksContainer,
          { backgroundColor: theme === "dark" ? "#000000" : "#ffffff" },
        ]}
      >
        <View style={styles.listHeader}>
          <Text
            style={[
              styles.listName,
              { color: theme === "dark" ? "#ffffff" : "#000000" },
            ]}
          >
            {language === "English" ? " Daily Habit" : "Günlük Alışkanlık"} /{" "}
            {allHabits.length}
          </Text>

          <View
            style={[
              styles.listButton,
              { backgroundColor: theme === "dark" ? "#292929" : "#3a3fd3" },
            ]}
          >
            <TouchableOpacity onPress={startAddHabitHandler}>
              {theme === "dark" ? (
                <Iconify icon="ep:circle-plus" size={26} color="white" />
              ) : (
                <Iconify icon="ep:circle-plus-filled" size={26} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <HabitInput
          visible={modalIsVisible}
          onAddHabit={addHabitHandler}
          onCancel={endAddHabitHandler}
        />
        <View style={styles.listContainer}>
          <FlatList
            data={allHabits}
            renderItem={({ item }) => {
              return (
                <HabitItem
                  refetch={fetchHabits}
                  text={item.title}
                  id={item._id}
                  onDeleteItem={deleteHabitHandler}
                  completed={item.completed}
                  onUpdate={updateHabitHandler}
                />
              );
            }}
            keyExtractor={(item, index) => item._id}
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
    position: "relative",
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
    fontWeight: "500",
    marginTop: 15,
    textTransform: "capitalize",
    fontFamily: "poppins",
  },
  screenTimeWidgetContainer: {
    backgroundColor: "#3a3fd3",
    borderRadius: 15,
    height: 170,
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  widgets: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    justifyContent: "center",
  },
  time: {
    top: 10,
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
  },
  screenTimeText: {
    fontSize: 16,
    color: "#ffffff",
    marginTop: 10,
  },
  focusScore: {
    fontSize: 15,
    color: "#ffffff",
  },
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
    borderRadius: 20,
    backgroundColor: "#3a3fd3",
    width: 26,
    height: 26,
  },
  tasksContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fffffffc",
    marginTop: 10,
  },
  listContainer: {
    marginTop: 10,
    width: "90%",
    height: "76%",
  },
  quote: {
    fontSize: 12,
    color: "#777",
    fontFamily: "poppins",
  },
  logo: {
    width: 30,
    height: 40,
    resizeMode: "contain",
  },
  mode: {
    marginRight: 15,
  },
  rightHeader: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    right: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default DashboardPage;
