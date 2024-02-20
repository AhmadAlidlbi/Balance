import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import Main from "./src/screens/Main";
import Login from "./src/screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Auth from "./src/screens/Auth";
import SecondAuth from "./src/screens/SecondAuth";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({});
