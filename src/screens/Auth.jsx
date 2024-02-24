import React, { useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";

const Auth = ({navigation}) => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleFirstNameChange = (FirstName) => {
    setFirstName(FirstName);
  };

  const handleLastNameChange = (LastName) => {
    setLastName(LastName);
  };

  const handleNext = () => {
    if (firstName === "" || lastName === "") {
      alert("Please fill all fields");
      return;
    }
    navigation.navigate("SecondAuth")
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.logo}
          source={require("../assets/images/BalanceLogo.jpg")}
        />
      </View>
      <View>
        <Text style={styles.title}>Create Account</Text>
      </View>
      <View>
        <InputField
          placeholder={"First Name"}
          value={firstName}
          onChange={handleFirstNameChange}
          type="firstName"
          required={true}
        />
      </View>
      <View>
        <InputField
          placeholder={"Last Name"}
          value={lastName}
          onChange={handleLastNameChange}
          type="lastName"
          required={true}
        />
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton onPress={handleNext} title="Next" buttonColor={true} />
      </View>
    </View>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingBottom: 100,
  },
  logo: {
    width: 86,
    height: 92,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
  },
  buttonContainer:{
    marginTop: 10,
  }
});
