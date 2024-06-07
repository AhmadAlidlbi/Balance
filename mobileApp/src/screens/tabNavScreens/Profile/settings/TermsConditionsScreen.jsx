import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLogin } from '../../../../context/LoginProvider';

const TermsConditionsScreen = () => {
  const { theme } = useLogin();
  return (
    <View style={[styles.container, { backgroundColor: theme === "dark" ? "#000000" : "#ffffff" }]}>
      <Text style={[styles.heading, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>Terms & Conditions</Text>
      <View style={styles.section}>
        <Text style={[styles.text, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>
          Please read these Terms and Conditions carefully before using the Balance mobile application.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={[styles.sectionHeading, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>Acceptance of Terms</Text>
        <Text style={[styles.text, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>
          By accessing or using the Balance app, you agree to be bound by these Terms and Conditions.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={[styles.sectionHeading, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>Privacy Policy</Text>
        <Text style={[styles.text, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>
          Your use of the Balance app is also governed by our Privacy Policy. Please review our Privacy Policy to understand how we collect, use, and disclose information.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={[styles.sectionHeading, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>User Accounts</Text>
        <Text style={[styles.text, { color: theme === "dark" ? "#ffffff" : "#000000" }]}>
          In order to access certain features of the Balance app, you may be required to create a user account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
});

export default TermsConditionsScreen;
