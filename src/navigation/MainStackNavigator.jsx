import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "../screens/Main";
import Login from "../screens/Login";
import Auth from "../screens/Auth";
import SecondAuth from "../screens/SecondAuth";
import OnboardingTutorial from "../screens/OnboardingTutorial";
import TabNavigator from "../navigation/TabNavigator";

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
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
