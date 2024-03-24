import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "../screens/authenticationScreens/Main";
import Login from "../screens/authenticationScreens/Login";
import Auth from "../screens/authenticationScreens/Auth";
import SecondAuth from "../screens/authenticationScreens/SecondAuth";
import OnboardingTutorial from "../screens/authenticationScreens/OnboardingTutorial";
import TabNavigator from "../navigation/TabNavigator";
import PInfo from "../screens/tabNavScreens/Profile/PInfo";
import Settings from "../screens/tabNavScreens/Profile/settings/Settings";
import ChangePassword from "../screens/tabNavScreens/Profile/settings/ChangePassword";

const Stack = createStackNavigator();
// The Stack Navigator for the main screens of the application

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: "#ffffffff" },
      }}
    >
      {/* The Stack.Screen components are used to define the screens of the application */}

      {/* Main screen */}
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          headerStyle: { backgroundColor: "#ffffffff" },
          headerTitleStyle: { color: "#ffffff00" },
          headerShadowVisible: false,
        }}
      />

      {/* Auth screen */}
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{
          headerStyle: { backgroundColor: "#ffffffff" },
          headerTitleStyle: { color: "#ffffff00" },
          headerShadowVisible: false,
          headerBackTitle: "Back",
        }}
      />

      {/* SecondAuth screen */}
      <Stack.Screen
        name="SecondAuth"
        component={SecondAuth}
        options={{
          headerStyle: { backgroundColor: "#ffffffff" },
          headerTitleStyle: { color: "#ffffff00" },
          headerShadowVisible: false,
          headerBackTitle: "Back",
        }}
      />

      {/* OnboardingTutorial screen */}
      <Stack.Screen
        name="OnboardingTutorial"
        component={OnboardingTutorial}
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
      />

      {/* Login screen */}
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerStyle: {
            backgroundColor: "#ffffffff",
          },
          headerTitleStyle: {
            color: "#ffffff00",
          },
          headerShadowVisible: false,
          headerBackTitle: "Back",
        }}
      />

      {/* Goes to TabNavigator component */}
      <Stack.Screen
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
        name="InAppStack"
        component={TabNavigator}
      />

      {/* Personal info screen */}
      <Stack.Screen
        name="PInfo"
        component={PInfo}
        options={{
          headerStyle: {
            backgroundColor: "#ffffffff",
          },
          headerTitleStyle: {
            color: "#000000ff",
          },
          headerShadowVisible: false,
          headerBackTitle: "Profile",
          headerTitle: "Personal Information",
        }}
      />

      {/* Settings screen */}
      <Stack.Screen
        name="Settings"
        component={Settings}
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
        
        {/* ChangePassword screen */}
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
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
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
