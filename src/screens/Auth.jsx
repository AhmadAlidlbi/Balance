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

//   console.log(firstName, lastName);

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.logo}
          source={require("../assets/images/BalanceLogo.jpg")}
        />
      </View>
      <View>
        <Text style={styles.heading}>Create Account</Text>
      </View>
      <View>
        <InputField
          placeholder={"First Name"}
          value={firstName}
          onChange={handleFirstNameChange}
          type="firstName"
        />
      </View>
      <View>
        <InputField
          placeholder={"Last Name"}
          value={lastName}
          onChange={handleLastNameChange}
          type="lastName"
        />
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton onPress={() => navigation.navigate("SecondAuth")} title="Next" buttonColor={true} />
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
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
  },
  forgotPassword: {
    color: "#625F60",
    fontSize: 12,
    margin: 12,
  },
  buttonContainer:{
    marginTop: 10,
  }
});
