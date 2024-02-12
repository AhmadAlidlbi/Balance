import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const LandingPage = () => {
  return (
    <View style={styles.container}>
        <Image style={styles.logo} source={require('../assets/landingLogo.jpg')}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo:{
    width: 200,
    height: 200
  }
});

export default LandingPage;
