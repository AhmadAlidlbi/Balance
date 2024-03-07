import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "../screens/Main";
import Login from "../screens/Login";
import Auth from "../screens/Auth";
import SecondAuth from "../screens/SecondAuth";
import OnboardingTutorial from "../screens/OnboardingTutorial";
import TabNavigator from "../navigation/TabNavigator";
import PInfo from "../screens/PInfo";
import Settings from "../screens/Settings";
import ChangePassword from "../screens/ChangePassword";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          headerStyle: { backgroundColor: "#ffffffff" },
          headerTitleStyle: { color: "#ffffff00" },
          headerShadowVisible: false,
        }}
      />
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
      <Stack.Screen
        name="OnboardingTutorial"
        component={OnboardingTutorial}
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
      />
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
      <Stack.Screen
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
        name="InAppStack"
        component={TabNavigator}
      />
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
          headerBackTitle: "Back",
          headerTitle: "Personal Information",
        }}
      />
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
          headerBackTitle: "Back",
        }}
      />
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
          headerBackTitle: "Back",
          headerTitle: "Change Your Password",
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
