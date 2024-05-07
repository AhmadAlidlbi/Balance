import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import InputField from "../../../components/InputField";
import SecondaryButton from "../../../components/SecondaryButton";
import Avatar from "../../../components/Avatar";

const PersonalInfoPage = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profession, setProfession] = useState("");

  const handleFirstNameChange = (FirstName) => {
    setFirstName(FirstName);
  };

  const handleLastNameChange = (LastName) => {
    setLastName(LastName);
  };

  const handleProfessionChange = (Profession) => {
    setProfession(Profession);
  };

  const handleSave = () => {
    // Save all the fields
    const data = {
      firstName: firstName,
      lastName: lastName,
      profession: profession
    };
  
    console.log("Saved Data:", data);
    // Or you can send it to your backend or perform any other action here

    navigation.navigate("Profile");
  };
  

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Avatar />

        <View>
          <Text style={styles.label}>First Name</Text>
          <InputField
            placeholder={"First Name"}
            value={firstName}
            onChange={handleFirstNameChange}
            type="firstName"
            required={true} // Added required prop
          />
        </View>

        <View>
          <Text style={styles.label}>Last Name</Text>
          <InputField
            placeholder={"Last Name"}
            value={lastName}
            onChange={handleLastNameChange}
            type="lastName"
            required={true} // Added required prop
          />
        </View>

        <View>
          <Text style={styles.label}>Profession</Text>
          <InputField
            placeholder={"Profession"}
            value={profession}
            onChange={handleProfessionChange}
            type="Profession"
            required={true} // Added required prop
          />
        </View>

        <View style={styles.saveButtonContainer}>
          <SecondaryButton title="Save" onPress={handleSave} />
        </View>

      </KeyboardAvoidingView>
    </>
  );
};

const styles = {
  container: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    flex: 1,
    justifyContent: "center",
  },
  label: {
    paddingHorizontal: 13,
  },
  saveButtonContainer: {
    marginTop: 250,
  },
};

export default PersonalInfoPage;