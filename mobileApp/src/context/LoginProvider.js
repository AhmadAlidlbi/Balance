import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { getToken } from "../../utils/storage";
import { getProfile } from "../../api/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
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
