import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useLogin } from "../context/LoginProvider";
import { Iconify } from "react-native-iconify";
import { StyleSheet } from "react-native";
import LauncherPage from "../screens/authenticationScreens/LauncherPage";
import LoginPage from "../screens/authenticationScreens/LoginPage";
import ForgetPassword from "../screens/authenticationScreens/ForgetPassword";
import RegisterPage from "../screens/authenticationScreens/RegisterPage";
import DashboardPage from "../screens/tabNavScreens/DashboardPage";
import TasksPage from "../screens/tabNavScreens/TasksPage";
import TaskDetails from "../screens/TaskDetails";
import CalendarPage from "../screens/tabNavScreens/CalendarPage";
import NotesPage from "../screens/tabNavScreens/NotesPage";
import ProfilePage from "../screens/tabNavScreens/Profile/ProfilePage";
import PersonalInfoPage from "../screens/tabNavScreens/Profile/PersonalInfoPage";
import SettingsPage from "../screens/tabNavScreens/Profile/settings/SettingsPage";
import ChangePasswordPage from "../screens/tabNavScreens/Profile/settings/ChangePasswordPage";
import OnboardingTutorial from "../screens/authenticationScreens/OnboardingTutorial";
import Language from "../screens/tabNavScreens/Profile/settings/Language";
import { getItemAsync } from "expo-secure-store";
import TasksListPage from "../screens/tabNavScreens/TasksListPage";
import NoteDetails from "../screens/NoteDetails";
import About from "../screens/tabNavScreens/Profile/settings/About";
import TermsConditionsScreen from "../screens/tabNavScreens/Profile/settings/TermsConditionsScreen";
import OnboardingTutorialModal from "../screens/OnboardingTutorialModal";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { removeToken } from "../../utils/storage";
import { CommonActions } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Alert } from "react-native";

const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStackNavigator = () => {
  const [isBoarding, setIsBoarding] = React.useState(false);
  const { theme } = useLogin();
  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const data = await getItemAsync("onboarding");
        const onboarding = JSON.parse(data);
        if (onboarding) {
          setIsBoarding(true);
        } else {
          setIsBoarding(false);
        }
      } catch (error) {
        console.log("Error:", error.message);
      }
    };
    checkOnboarding();
  }, []);

  return (
    <AuthStack.Navigator
      initialRouteName={isBoarding ? "Onboarding" : "Launcher"}
      screenOptions={{
        cardStyle: {
          backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
        },
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
      <AuthStack.Screen
        name="Onboarding"
        component={OnboardingTutorial}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
          },
          headerTitleStyle: {
            color: theme === "dark" ? "#ffffff" : "#000000",
            fontFamily: "Poppins_600SemiBold",
            fontSize: 18,
            textAlign: "center",
          },
          headerShadowVisible: false,
        }}
      />
    </AuthStack.Navigator>
  );
};

// create stack navigator for the tab navigator
const TaskStack = createStackNavigator();

const TaskStackNavigator = () => {
  const { theme, language  } = useLogin();

  return (
    <TaskStack.Navigator>
      <TaskStack.Screen
        options={{
          headerShown: true,
          headerTitle: language === "English" ? "Task Lists": "Görev Listeleri",
          headerShadowVisible: false,
          headerTitleStyle: {
            color: theme === "dark" ? "#ffffff" : "#000000",
            fontFamily: "Poppins_600SemiBold",
            fontSize: 18,
            textAlign: "center",
          },
          headerStyle: {
            backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
          },
        }}
        name="TasksList"
        component={TasksListPage}
      />
      <TaskStack.Screen
        options={({ route }) => ({
          headerShown: true,
          headerTitle: route.params.title,
          headerShadowVisible: false,
          headerTitleStyle: {
            color: theme === "dark" ? "#ffffff" : "#000000",
            fontFamily: "Poppins_600SemiBold",
            fontSize: 18,
            textAlign: "center",
          },
          headerStyle: {
            backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
          },
        })}
        name="TasksListDetails"
        component={TasksPage}
      />
      <TaskStack.Screen
        name="TaskDetails"
        component={TaskDetails}
        options={({ route }) => ({
          headerShown: true,
          headerShadowVisible: false,
          headerTitle:"",
          headerTitleStyle: {
            color: theme === "dark" ? "#ffffff" : "#000000",
            fontFamily: "Poppins_600SemiBold",
            fontSize: 18,
            textAlign: "center",
          },
          headerStyle: {
            backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
          },
        })}
      />
    </TaskStack.Navigator>
  );
};

const notesStack = createStackNavigator();

function NotesStackNavigator() {
  const { theme } = useLogin();
  return (
    <notesStack.Navigator>
      <notesStack.Screen
        name="Notes"
        component={NotesPage}
        options={{
          headerShown: false,
        }}
      />
      <notesStack.Screen
        name="NoteDetails"
        component={NoteDetails}
        options={({ route }) => ({
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: "",
          headerTitleStyle: {
            color: theme === "dark" ? "#ffffff" : "#000000",
            fontFamily: "Poppins_600SemiBold",
            fontSize: 18,
            textAlign: "center",
          },
          headerStyle: {
            backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
          },
        })}
      />
    </notesStack.Navigator>
  );
}

function TabNavigator() {
  const { theme, language  } = useLogin();

  return (
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
        component={DrawerNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Iconify icon="majesticons:home-line" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TaskStackNavigator}
        options={{
          headerShadowVisible: false,
          headerShown: false,
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
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: language === "English" ? "Calendar": "Takvim",
          headerTitleStyle: {
            color: theme === "dark" ? "#ffffff" : "#000000",
            fontFamily: "Poppins_600SemiBold",
            fontSize: 18,
            textAlign: "center",
          },
          headerStyle: {
            backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
          },
          tabBarIcon: ({ color }) => (
            <Iconify icon="majesticons:calendar-line" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notes"
        component={NotesStackNavigator}
        options={{
          headerShadowVisible: false,
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Iconify
              icon="majesticons:note-text-line"
              size={30}
              color={color}
            />
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
}

function CustomDrawerContent(props) {
  const { setIsLoggedIn, setProfile, theme, language } = useLogin();

  const handleLogout = () => {
    Alert.alert(
      language === "English" ? "Log out" : "Çıkış Yap",
      language === "English" ? "Are you sure you want to logout?" : "Oturumu kapatmak istediğinizden emin misiniz?",
      [
        {
          text: language === "English" ? "Cancel" : "Vazgeç",
          style: "cancel",
        },
        {
          text: language === "English" ? "Log out" : "Çıkış Yap",
          onPress: () => {
            removeToken();
            setIsLoggedIn(false);
            setProfile({});
            props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Login" }],
              })
            );
          },
        },
      ],
      { cancelable: false }
    );
  };
  const drawerStyle = {
    backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
  };

  return (
    <DrawerContentScrollView {...props} style={drawerStyle}>
      <DrawerItemList {...props} />
      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={[
            styles.logoutButton,
            { backgroundColor: theme === "dark" ? "#131313" : "#E9E9E9" },
          ]}
          onPress={handleLogout}
        >
          <Text
            style={[
              styles.logoutText,
              { color: theme === "dark" ? "#ff0000" : "#9B0000" },
            ]}
          >
            {language === "English" ? "Log out" : "Çıkış Yap"}
          </Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  const { theme, language } = useLogin();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
        },
        headerTintColor: theme === "dark" ? "#ffffff" : "#3a3fd3",
        headerShadowVisible: false,
        headerTitleStyle: {
          color: "#00000000",
        },
      }}
    >
      <Drawer.Screen
        name={language === "English" ? "Home" : "Gösterge Paneli"}
        component={DashboardPage}
      />
      <Drawer.Screen
        name={language === "English" ? "Tasks Page" : "Görevler Sayfası"}
        component={TaskStackNavigator}
      />
      <Drawer.Screen
        name={language === "English" ? "Calendar Page" : "Takvim Sayfası"}
        component={CalendarPage}
      />
      <Drawer.Screen
        name={language === "English" ? "Notes Page" : "Notlar Sayfası"}
        component={NotesStackNavigator}
      />
            <Drawer.Screen
        name={language === "English" ? "Profile Page" : "Profil Sayfası"}
        component={ProfilePage}
      />
    </Drawer.Navigator>
  );
}

const MainStack = createStackNavigator();

function MainStackNavigator() {
  const { theme, language} = useLogin();
  return (
    <MainStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
        },
        headerTitleStyle: {
          color: theme === "dark" ? "#ffffff" : "#000000",
          fontFamily: "Poppins_600SemiBold",
          fontSize: 18,
          textAlign: "center",
        },
        cardStyle: {
          backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
        },
        headerShadowVisible: false,
      }}
    >
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
          headerTitleStyle: {
            color: theme === "dark" ? "#ffffff" : "#000000",
            fontFamily: "Poppins_600SemiBold",
            fontSize: 18,
            textAlign: "center",
          },
          headerStyle: {
            backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
          },
          headerTitle: language === "English" ? "Personal Information": "Kişisel bilgi",
          headerShadowVisible: false,
          headerBackTitle: language === "English" ? "Profile": "Profilim",
        }}
      />
      <MainStack.Screen
        name="Settings"
        component={SettingsPage}
        options={{
          headerTitleStyle: {
            color: theme === "dark" ? "#ffffff" : "#000000",
            fontFamily: "Poppins_600SemiBold",
            fontSize: 18,
            textAlign: "center",
          },
          headerStyle: {
            backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
          },
          headerTitle: language === "English" ? "Settings": "Ayarlar",
          headerShadowVisible: false,
          headerBackTitle: language === "English" ? "Profile": "Profilim",
        }}
      />
      <MainStack.Screen
        name="ChangePassword"
        component={ChangePasswordPage}
        options={{
          headerTitleStyle: {
            color: theme === "dark" ? "#ffffff" : "#000000",
            fontFamily: "Poppins_600SemiBold",
            fontSize: 18,
            textAlign: "center",
          },
          headerStyle: {
            backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
          },
          headerShadowVisible: false,
          headerBackTitle: language === "English" ? "Settings": "Ayarlar",
          headerTitle: language === "English" ? "Change Password": "Şifre değiştir",
        }}
      />
      <MainStack.Screen
        name="About"
        component={About}
        options={{
          headerTitleStyle: {
            color: theme === "dark" ? "#ffffff" : "#000000",
            fontFamily: "Poppins_600SemiBold",
            fontSize: 18,
            textAlign: "center",
          },
          headerStyle: {
            backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
          },
          headerShadowVisible: false,
          headerBackTitle: language === "English" ? "Settings": "Ayarlar",
          headerTitle: language === "English" ? "About": "Uygulama hakkında",
        }}
      />
      <MainStack.Screen
        name="Terms & Conditions"
        component={TermsConditionsScreen}
        options={{
          headerTitleStyle: {
            color: theme === "dark" ? "#ffffff" : "#000000",
            fontFamily: "Poppins_600SemiBold",
            fontSize: 18,
            textAlign: "center",
          },
          headerStyle: {
            backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
          },
          headerShadowVisible: false,
          headerBackTitle: language === "English" ? "Settings": "Ayarlar",
          headerTitle: language === "English" ? "Terms & Conditions": "Şartlar ve Koşullar",
        }}
      />
      <MainStack.Screen
        name="Language"
        component={Language}
        options={{
          headerTitleStyle: {
            color: theme === "dark" ? "#ffffff" : "#000000",
            fontFamily: "Poppins_600SemiBold",
            fontSize: 18,
            textAlign: "center",
          },
          headerStyle: {
            backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
          },
          headerShadowVisible: false,
          headerBackTitle: language === "English" ? "Settings": "Ayarlar",
          headerTitle: language === "English" ? "Language": "Dil",
        }}
      />
      <MainStack.Screen
        name="OnboardingTutorialModal"
        component={OnboardingTutorialModal}
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
      />
    </MainStack.Navigator>
  );
}

const AppNavigator = ({ theme, setTheme, language, setLanguage }) => {
  const { isLoggedIn } = useLogin();
  return isLoggedIn ? <MainStackNavigator /> : <AuthStackNavigator />;
};

export default AppNavigator;

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    borderBlockColor: "#000000",
    height: 70,
    position: "absolute",
    width: "90%",
    left: "5%",
    backgroundColor: "#292929",
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
  },
  logoutContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 5,
    backgroundColor: "#E9E9E9",
  },
  logoutText: {
    color: "#9B0000",
    fontFamily: "poppins",
    fontSize: 15,
  },
});
