import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useLogin } from "../../../../context/LoginProvider";


const Language = () => {
  const { theme, toggleLanguage, language } = useLogin();

  const handleLanguageSelection = (selectedLanguage) => {
    if (language !== selectedLanguage) {
      toggleLanguage(selectedLanguage);
      console.log("Selected Language:", selectedLanguage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>
        {language === "English" ? "Select a language:" : "Bir dil seç:"}
      </Text>

      {language !== "Turkish" ? (
        <TouchableOpacity onPress={() => handleLanguageSelection("Turkish")}>
          <View style={styles.row}>
            <Image source={require("../../../../assets/images/turkey.png")} style={{ width: 35, height: 35 }} />
            <Text style={[styles.language, language === "Turkish" && styles.selectedLanguage, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>
            {language === "English" ? "Turkish": "Türkçe"}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.row}>
          <Image source={require("../../../../assets/images/turkey.png")} style={{ width: 35, height: 35 }} />
          <Text style={[styles.language, language === "Turkish" && styles.selectedLanguage, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>
          {language === "English" ? "Turkish": "Türkçe"}
          </Text>
        </View>
      )}
      
      {language !== "English" ? (
        <TouchableOpacity onPress={() => handleLanguageSelection("English")}>
          <View style={styles.row}>
            <Image source={require("../../../../assets/images/usa.png")} style={{ width: 30, height: 30 }} />
            <Text style={[styles.language, language === "English" && styles.selectedLanguage, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>
            {language === "English" ? "English": "İngilizce"}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.row}>
          <Image source={require("../../../../assets/images/usa.png")} style={{ width: 30, height: 30 }} />
          <Text style={[styles.language, language === "English" && styles.selectedLanguage, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>
          {language === "English" ? "English": "İngilizce"}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  language: {
    fontSize: 18,
    alignItems: "center",
  },
  selectedLanguage: {
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
});

export default Language;
