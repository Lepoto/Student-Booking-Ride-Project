import React, { useState } from 'react';
import {
  View,
  Platform,
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OTPScreen = ({ route }) => {
  const { accessToken } = route.params;
  const navigation = useNavigation();
  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pin3, setPin3] = useState('');
  const [pin4, setPin4] = useState('');
  const [pin5, setPin5] = useState('');
  const [pin6, setPin6] = useState('');

  const handleValidation = () => {
    const otp = pin1 + pin2 + pin3 + pin4 + pin5 + pin6;
    if (otp.length === 6) {
      console.log('OTP Verified');
      // Navigate to the home screen
      navigation.navigate('Home', { accessToken });
    } else {
      console.log('Please enter a valid OTP');
    }
  };

  const clearAllInputs = () => {
    setPin1('');
    setPin2('');
    setPin3('');
    setPin4('');
    setPin5('');
    setPin6('');
    // Focus on the first input field
    pin1Ref.current.focus();
    navigation.navigate('Home', { accessToken });
  };

  const pin1Ref = React.createRef();
  const pin2Ref = React.createRef();
  const pin3Ref = React.createRef();
  const pin4Ref = React.createRef();
  const pin5Ref = React.createRef();
  const pin6Ref = React.createRef();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.logoText}>UL Student Ride</Text>
          <Text style={styles.heading}>Verify Student Email</Text>
          <Text style={styles.subHeading}>
            Enter 6 digits code received on your student email inbox
          </Text>

          <View
            style={{
              marginTop: 100,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            {[pin1Ref, pin2Ref, pin3Ref, pin4Ref, pin5Ref, pin6Ref].map(
              (pinRef, index) => (
                <View style={styles.TextInputView} key={index}>
                  <TextInput
                    ref={pinRef}
                    keyboardType={'number-pad'}
                    maxLength={1}
                    value={index === 0 ? pin1 : index === 1 ? pin2 : index === 2 ? pin3 : index === 3 ? pin4 : index === 4 ? pin5 : pin6}
                    onChangeText={(inputValue) => {
                      if (inputValue.length === 1) {
                        if (index === 0) {
                          setPin1(inputValue);
                          if (pin2Ref.current) pin2Ref.current.focus();
                        } else if (index === 1) {
                          setPin2(inputValue);
                          if (pin3Ref.current) pin3Ref.current.focus();
                        } else if (index === 2) {
                          setPin3(inputValue);
                          if (pin4Ref.current) pin4Ref.current.focus();
                        } else if (index === 3) {
                          setPin4(inputValue);
                          if (pin5Ref.current) pin5Ref.current.focus();
                        } else if (index === 4) {
                          setPin5(inputValue);
                          if (pin6Ref.current) pin6Ref.current.focus();
                        } else if (index === 5) {
                          setPin6(inputValue);
                        }
                      } else if (inputValue.length === 0) {
                        // Handle backspace here if needed
                      }
                    }}
                  />
                </View>
              )
            )}
          </View>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => clearAllInputs()}
          >
            <Text style={{ color: 'white' }}>Clear</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  TextInputView: {
    borderBottomColor: '#111',
    borderBottomWidth: 1,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  clearButton: {
    marginTop: 30,
    width: 100,
    height: 30,
    backgroundColor: '#01ADDD',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logoText: {
    fontSize: 35,
    marginVertical: 50,
    color: '#111',
  },
  heading: {
    fontSize: 24,
    color: '#111',
  },
  subHeading: {
    fontSize: 15,
    color: '#111',
    marginTop: 15,
  },
});

export default OTPScreen;
