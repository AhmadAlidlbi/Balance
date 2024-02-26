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
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#ffffff",
          tabBarInactiveTintColor: "#787878",
          tabBarShowLabel: false,
          tabBarStyle:
            styles.container,
        }}
        safeAreaInsets={{ bottom: 0 }
      }
      >
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Iconify icon="majesticons:home-line" size={30} color={color} />
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
                size={30}
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
                size={30}
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
              <Iconify icon="majesticons:user-line" size={30} color={color} />
            ),
          }}
          name="Profile"
          component={Profile}
        />
      </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    height: 70,
    position: "absolute",
    width: "90%",
    left: "5%",
    backgroundColor: "#292929",//292929
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.50,
  },
});
