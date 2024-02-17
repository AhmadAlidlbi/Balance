import React from "react";
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const main = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/landingLogo.jpg')} style={styles.logo} />
      </View>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>Balance</Text>
      </View>
      <View style={styles.buttonContainer}>
        {/* Buttons components will be added here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 163,
    height: 174,
  },
  balanceContainer: {
    marginVertical: 20,
  },
  balanceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});

export default main;
