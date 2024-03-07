import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Button,
} from "react-native";
import InputField from "../components/InputField";
import SecondaryButton from "../components/SecondaryButton";
import { Iconify } from "react-native-iconify";
import DateTimePicker from "@react-native-community/datetimepicker";

const PInfo = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profession, setProfession] = useState("");

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const handleImageSelection = () => {
    // Handle image selection
  };

  const handleFirstNameChange = (FirstName) => {
    setFirstName(FirstName);
  };

  const handleLastNameChange = (LastName) => {
    setLastName(LastName);
  };

  const handleProfessionChange = (Profession) => {
    setProfession(Profession);
  };

  const handleEmailChange = (Email) => {
    setEmail(Email);
  };

  const handleSave = () => {
    // Handle saving the information
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.heading}>Personal Information</Text>

      <TouchableOpacity
        onPress={handleImageSelection}
        style={styles.imageContainer}
      >
        <Image
          source={require("../assets/images/profile.jpg")}
          style={styles.profileImage}
        />
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: "#ffffff",
            padding: 5,
            borderRadius: 20,
          }}
        >
          <Iconify icon="majesticons:camera" color="#555555" size={24} />
        </View>
      </TouchableOpacity>

      <View style={styles.fieldsContainer}>
        <Text style={styles.label}>First Name</Text>
        <InputField
          placeholder={"First Name"}
          value={firstName}
          onChange={handleFirstNameChange}
          type="firstName"
          required={true}
        />
      </View>

      <View style={styles.fieldsContainer}>
        <Text style={styles.label}>Last Name</Text>
        <InputField
          placeholder={"Last Name"}
          value={lastName}
          onChange={handleLastNameChange}
          type="lastName"
          required={true}
        />
      </View>

      <View style={styles.fieldsContainer}>
        <Text style={styles.label}>Profession</Text>
        <InputField
          placeholder={"Profession"}
          value={profession}
          onChange={handleProfessionChange}
          type="Profession"
          required={true}
        />
      </View>
      {/* must be changed to date picker */}
      {/* <View style={styles.fieldsContainer}>
        <Text style={styles.label}>Email</Text>
        <InputField
          placeholder={"Email"}
          value={email}
          onChange={handleEmailChange}
          type="email"
        />
      </View> */}

      {/* <View>
        <TouchableOpacity
          style={styles.DatePickerContainer}
          onPress={showDatepicker}
        >
          <Text>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              onChange={onChange}
              display="spinner"
            />
          )}
      </View> */}

      <View style={{bottom: 20,}}>
        <SecondaryButton title="Save" onPress={handleSave} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = {
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  imageContainer: {
    marginBottom: 180,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  label: {
    paddingHorizontal: 13,
  },
  fieldsContainer: {
    bottom: 150,
  },
  DatePickerContainer: {
    flexDirection: "row",
    backgroundColor: "#E9E9E9",
    borderRadius: 7,
    alignItems: "center",
    paddingHorizontal: 10,
    width: 350,
    justifyContent: "space-between",
    margin: 10,
    height: 50,
  },
};

export default PInfo;
