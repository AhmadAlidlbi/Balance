import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";

const Auth = ({ navigation }) => {
  // State variables to store the first and last names
  // The setFirstName and setLastName functions are used to update the state variables
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleFirstNameChange = (FirstName) => {
    setFirstName(FirstName);
    //test
    // console.log(FirstName);
  };
  // The handleFirstNameChange function updates the firstName state variable with the value of the input field

  const handleLastNameChange = (LastName) => {
    //test
    // console.log(LastName);
    setLastName(LastName);
  };
  // The handleLastNameChange function updates the lastName state variable with the value of the input field

  const handleNext = () => {
    // if (firstName === "" || lastName === "") {
    //   alert("Please fill all fields");
    //   return;
    // }
    navigation.navigate("SecondAuth");
    // The navigation prop is used to navigate to the SecondAuth screen
  };

  return (
    // The KeyboardAvoidingView component is used to ensure that the input fields are not hidden by the keyboard
    // The behavior prop is set to "padding" for iOS and "height" for Android
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {/* logo */}
      <View>
        <Image
          style={styles.logo}
          source={require("../../assets/images/BalanceLogo.jpg")}
        />
      </View>

      {/* Title */}
      <View>
        <Text style={styles.title}>Create account</Text>
      </View>

      {/* Input field component */}
      <View>
        <InputField
          placeholder={"First name"}
          value={firstName}
          onChange={handleFirstNameChange}
          type="firstName"
          required={true}
        />
      </View>

      {/* Input field component */}
      <View>
        <InputField
          placeholder={"Last name"}
          value={lastName}
          onChange={handleLastNameChange}
          type="lastName"
          required={true}
        />
      </View>

      {/* Primary button component */}
      <View style={styles.buttonContainer}>
        <PrimaryButton onPress={handleNext} title="Next" buttonColor={true} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Auth;

// Styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginBottom: 100,
  },
  logo: {
    width: 86,
    height: 92,
    marginBottom: 20,
  },
  title: {
    fontFamily: "poppins-medium",
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
