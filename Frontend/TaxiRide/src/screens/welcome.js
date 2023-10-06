import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import COLORS from '../constants/theme';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('Login'); // Navigate to the "Login" screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logoImage} />
      </View>

      <View style={styles.content}>
        <Text style={styles.heading}>University of Limpopo</Text>
        <Text style={styles.subHeading}>Student Ride</Text>
        <Text style={styles.slogan}>"Ride together with your classmates."</Text>
      </View>

      <View style={styles.customButton}>
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gray,
  },


  logoImage: {
    width: 250,
    height: 205,
  },

  content: {
    alignItems: 'center',
    marginTop: 60,
  },

  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.primary,
    paddingLeft: 10,
    paddingRight: 10,
  },

  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
  },

  slogan: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#c4c4c9',
    marginTop: 40,
  },

  customButton: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    alignItems: 'center',

  },

  button: {
    backgroundColor: '#01ADDD',
    padding: 10,
    borderRadius: 50,
    width: 300,
  },

  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,
  },
});
