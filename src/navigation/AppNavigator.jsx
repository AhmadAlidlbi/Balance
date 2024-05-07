import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useLogin } from "../context/LoginProvider";
import { Iconify } from "react-native-iconify";
import { StyleSheet } from "react-native";
import LauncherPage from "../screens/authenticationScreens/LauncherPage";
import LoginPage from "../screens/authenticationScreens/LoginPage";
import RegisterPage from "../screens/authenticationScreens/RegisterPage";
import DashboardPage from "../screens/tabNavScreens/DashboardPage";
import TasksPage from "../screens/tabNavScreens/TasksPage";
import CalendarPage from "../screens/tabNavScreens/CalendarPage";
import NotesPage from "../screens/tabNavScreens/NotesPage";
import ProfilePage from "../screens/tabNavScreens/Profile/ProfilePage";
import PersonalInfoPage from "../screens/tabNavScreens/Profile/PersonalInfoPage";
import SettingsPage from "../screens/tabNavScreens/Profile/settings/SettingsPage";
import ChangePasswordPage from "../screens/tabNavScreens/Profile/settings/ChangePasswordPage";
import OnboardingTutorial from "../screens/authenticationScreens/OnboardingTutorial";

const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStackNavigator = () => (
  <AuthStack.Navigator
    screenOptions={{
      cardStyle: { backgroundColor: "#ffffffff" },
    }}
  >
    <AuthStack.Screen
      name="Launcher"
      component={LauncherPage}
      options={{
        headerShown: false,
      }}
    />
    <AuthStack.Screen
      name="Login"
      component={LoginPage}
      options={{
        headerShown: false,
      }}
    />
    <AuthStack.Screen
      name="Register"
      component={RegisterPage}
      options={{
        headerShown: false,
      }}
    />
  </AuthStack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: "#ffffff",
      tabBarInactiveTintColor: "#787878",
      tabBarShowLabel: false,
      tabBarStyle: styles.container,
      cardStyle: { backgroundColor: "#ffffffff" },
    }}
    safeAreaInsets={{ bottom: 0 }}
  >
    <Tab.Screen
      name="Dashboard"
      component={DashboardPage}
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <Iconify icon="majesticons:home-line" size={30} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Tasks"
      component={TasksPage}
      options={{
        headerShadowVisible: false,
        tabBarIcon: ({ color }) => (
          <Iconify
            icon="majesticons:checkbox-list-line"
            size={30}
            color={color}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Calendar"
      component={CalendarPage}
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <Iconify icon="majesticons:calendar-line" size={30} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Notes"
      component={NotesPage}
      options={{
        headerShadowVisible: false,
        tabBarIcon: ({ color }) => (
          <Iconify icon="majesticons:note-text-line" size={30} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfilePage}
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <Iconify icon="majesticons:user-line" size={30} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const MainStack = createStackNavigator();

const MainStackNavigator = () => (
  <MainStack.Navigator>
    <MainStack.Screen
      name="Tabs"
      component={TabNavigator}
      options={{
        headerShown: false,
      }}
    />
    <MainStack.Screen
      name="PersonalInfo"
      component={PersonalInfoPage}
      options={{
        headerStyle: {
          backgroundColor: "#ffffffff",
        },
        headerTitleStyle: {
          color: "#000000ff",
        },
        headerTitle: "Personal Information",
        headerShadowVisible: false,
        headerBackTitle: "Profile",
      }}
    />
    <MainStack.Screen
      name="Settings"
      component={SettingsPage}
      options={{
        headerStyle: {
          backgroundColor: "#ffffffff",
        },
        headerTitleStyle: {
          color: "#000000ff",
        },
        headerShadowVisible: false,
        headerBackTitle: "Profile",
      }}
    />
    <MainStack.Screen
      name="ChangePassword"
      component={ChangePasswordPage}
      options={{
        headerStyle: {
          backgroundColor: "#ffffffff",
        },
        headerTitleStyle: {
          color: "#000000ff",
        },
        headerShadowVisible: false,
        headerBackTitle: "Settings",
        headerTitle: "Change Your Password",
      }}
    />
  </MainStack.Navigator>
);

const AppNavigator = () => {
  const { isLoggedIn } = useLogin();
  return isLoggedIn ? <MainStackNavigator /> : <AuthStackNavigator />;
};

export default AppNavigator;

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    height: 70,
    position: "absolute",
    width: "90%",
    left: "5%",
    backgroundColor: "#292929",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
  },
});
