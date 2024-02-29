import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
} from "react-native";
import InputField from "../components/InputField";
import SecondaryButton from "../components/SecondaryButton";

const PInfo = () => {
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
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

  const handleEmailChange = (Email) => {
    setEmail(Email);
  };

  const handleSave = () => {
    // Handle saving the information
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Personal Information</Text>

      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/profile.jpg")}
          style={styles.profileImage}
        />
      </View>

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

      <View style={styles.fieldsContainer}>
        <Text style={styles.label}>Email</Text>
        <InputField
          placeholder={"Email"}
          value={email}
          onChange={handleEmailChange}
          type="email"
        />
      </View>

      <View style={styles.SaveButtonContainer}>
        <SecondaryButton title="Save" onPress={handleSave} />
      </View>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#ccc",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  fieldsContainer: {
    marginBottom: 15,
  },
  label: {
    paddingHorizontal: 15,
  },
  SaveButtonContainer: {
    marginTop: 100,
  },
};

export default PInfo;
