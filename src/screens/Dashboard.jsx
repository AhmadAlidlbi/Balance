import React from "react";
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const Dashboard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        {/* User's profile picture */}
          <Image
            source={require("../assets/images/profile.jpg")}
            style={styles.profileImage}
          />

        {/* User's name */}
        <Text style={styles.profileName}>Hey, Ahmad!</Text>
      </View>

      {/* Screen time calculation widget */}
      <View style={styles.screenTimeWidgetContainer}>
        <Text style={styles.time}>04h 47m</Text>
        <Text style={styles.screenTimeText}>Screen time today</Text>
        <Text style={styles.focusScore}>Focus score 42%</Text>
      </View>

      {/* List of tasks */}
      <View style={styles.tasksContainer}>
        <Text style={styles.listName}>Daily Tasks 2/5</Text>
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
    backgroundColor: "#3a3fd3",//3a3fd3
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
  tasksContainer: {
    marginTop: 25,
    height: 420,
    marginHorizontal: 20,
    backgroundColor: "#e9e9e9",
    borderRadius: 15,
  },
  listName: {
    fontSize: 15,
    margin: 15,
  },
});

export default Dashboard;
