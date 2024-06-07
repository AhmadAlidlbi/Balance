import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken } from "../../utils/storage";
import { getProfile } from "../../api/user";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({});
  const [loadingPending, setLoadingPending] = useState(false);
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("English");

  useEffect(() => {
    // Load language from storage when component mounts
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('language');
        if (savedLanguage !== null) {
          setLanguage(savedLanguage);
        }
      } catch (error) {
        console.log("Error loading language from storage:", error);
      }
    };
    loadLanguage();
  }, []);

  useEffect(() => {
    // Load theme from storage when component mounts
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme !== null) {
          setTheme(savedTheme);
        }
      } catch (error) {
        console.log("Error loading theme from storage:", error);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    // Save the selected theme to storage
    AsyncStorage.setItem('theme', newTheme)
      .then(() => console.log("Theme saved:", newTheme))
      .catch((error) => console.log("Error saving theme:", error));
  };

  const toggleLanguage = () => {
    const newLanguage = language === "English" ? "Turkish" : "English";
    setLanguage(newLanguage);
    // Save the selected language to storage
    AsyncStorage.setItem('language', newLanguage)
      .then(() => console.log("Language saved:", newLanguage))
      .catch((error) => console.log("Error saving language:", error));
  };

  const checkLogin = async () => {
    try {
      const token = getToken();
      if (token) {
        setLoadingPending(true);
        const res = await getProfile();
        console.log("Profile:", res);
        if (res.success && res.user) {
          setProfile(res.user);
          setLoadingPending(false);
          setIsLoggedIn(true);
        } else {
          setLoadingPending(false);
        }
      }
    } catch (error) {
      console.log("Profile Error:", error.response.data);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        profile,
        setProfile,
        loadingPending,
        setLoadingPending,
        theme,
        toggleTheme,
        language,
        toggleLanguage,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;
