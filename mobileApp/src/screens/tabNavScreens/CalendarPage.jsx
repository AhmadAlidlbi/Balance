import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import DatePicker from "react-native-modern-datepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { getTaskListByDate } from "../../../api/task";
import { useLogin } from "../../context/LoginProvider";
import TaskItem from "../../components/TaskItem";
import UpcomingTask from "../../components/UpcomingTask";

const CalendarPage = () => {
  const [startDate, setStartDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { profile, theme, language  } = useLogin();

  function handleStartDateChange(date) {
    setStartDate(date);
  }

  useEffect(() => {
    if (startDate) {
      fetchTasks(startDate);
    }
  }, [startDate]);

  const fetchTasks = async (date) => {
    setLoading(true);
    try {
      const response = await getTaskListByDate(profile.id, date);
      setTasks(response.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderHabit = ({ item }) => (
    <UpcomingTask task={item} changeTaskStatusHanker={() => {}} />
  );

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}-${month < 10 ? `0${month}` : month}-${
      day < 10 ? `0${day}` : day
    }`;
    setStartDate(formattedDate);
  }, []);
  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "#000000" : "#ffffff" },
      ]}
    >
      <DatePicker
        onSelectedChange={handleStartDateChange}
        options={{
          backgroundColor: theme === "dark" ? "#292929" : "#3a3fd3",
          textHeaderColor: "#ffffff",
          textDefaultColor: "#ffffff",
          selectedTextColor: "#000000",
          mainColor: "#ffffff",
          textSecondaryColor: "#ffffff",
          borderColor: "rgba(122, 146, 165, 0.1)",
        }}
        current={startDate}
        selected={startDate}
        default={startDate}
        mode="calendar"
        style={styles.datePicker}
      />
      <Text
        style={[
          styles.tasksHeading,
          { color: theme === "dark" ? "#ffffff" : "#000000" },
        ]}
      >
        {language === "English" ? "Upcoming Tasks": "Yaklaşan Görevler"}
      </Text>
      <ScrollView>
        {loading ? (
          <ActivityIndicator size="large" color="#3a3fd3" />
        ) : (
          <FlatList
            ListEmptyComponent={
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 20,
                  color: theme === "dark" ? "#ffffff" : "#000000",
                }}
              >
                {language === "English" ? "No tasks found": "Hiçbir görev bulunamadı"}
              </Text>
            }
            data={tasks}
            renderItem={renderHabit}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.tasksList}
            ListFooterComponent={
              <View style={{ height: 100, width: "100%" }} />
            }
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  datePicker: {
    borderRadius: 10,
    width: 320,
    bottom: 30,
  },
  tasksHeading: {
    fontSize: 20,
    color: "#000000",
    marginBottom: 10,
    textAlign: "center",
  },
  tasksList: {
    paddingTop: 10,
    width: "100%",
    paddingHorizontal: 20,
  },
  habitItem: {
    backgroundColor: "#e9e9e9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  habitText: {
    fontSize: 18,
    color: "#000000",
  },
});

export default CalendarPage;
