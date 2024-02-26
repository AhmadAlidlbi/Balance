import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/Dashboard";
import TaskManagement from "../screens/TaskManagement";
import NoteManagement from "../screens/NoteManagement";
import Profile from "../screens/Profile";
import { Iconify } from "react-native-iconify";
import { View, StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#ffffff",
          tabBarInactiveTintColor: "#949494",
          tabBarShowLabel: false,
          tabBarStyle: {
            borderRadius: 50,
            height: 60,
            width: 380,
            backgroundColor: "#3238FF",
            marginBottom: 30,
          },
        }}
        safeAreaInsets={{ bottom: 0 }}
      >
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Iconify icon="majesticons:home-line" size={35} color={ color } />
            ),
          }}
          name="Dashboard"
          component={Dashboard}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Iconify
                icon="majesticons:checkbox-list-line"
                size={35}
                color={color}
              />
            ),
          }}
          name="Task Management"
          component={TaskManagement}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Iconify
                icon="majesticons:note-text-line"
                size={35}
                color={color}
              />
            ),
          }}
          name="Note Management"
          component={NoteManagement}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Iconify icon="majesticons:user-line" size={35} color={color} />
            ),
          }}
          name="Profile"
          component={Profile}
        />
      </Tab.Navigator>
    </View>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
