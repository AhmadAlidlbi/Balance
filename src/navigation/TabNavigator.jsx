import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/Dashboard";
import TaskManagement from "../screens/TaskManagement";
import NoteManagement from "../screens/NoteManagement";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Dashboard"
        component={Dashboard}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Task Management"
        component={TaskManagement}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Note Management"
        component={NoteManagement}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
