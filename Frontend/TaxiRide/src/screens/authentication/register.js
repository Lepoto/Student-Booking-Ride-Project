import {View, Text, StyleSheet, Image, useWindowDimensions, TextInput, TouchableOpacity, Modal, Alert, Pressable} from 'react-native';
import { SafeAreaView } from 'react-native';
import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
    const [student, setStudent] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [studentMessage, setStudentMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [studentNumbers, setStudentNumbers] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [accessToken, setAccessToken] = useState('');

    useEffect(() => {
        fetchStudentNumbers();
    }, [student]);

    const fetchStudentNumbers = async() => {
        try {
            const response = await fetch('http:///10.0.2.2:8000/api/accounts/student-check/')
            const data = await response.json();
            // console.log(data);
            setStudentNumbers(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleStudentChange = (text) => {
        setStudent(text);
      
        // Check if the entered student number exists in the list of student numbers
        const studentExists = studentNumbers.some((student) => student.student_number === text);
      
        if (studentExists) {
          setStudentMessage(''); // Student exists
        } else {
          setStudentMessage('Student number is not registered for academic year');
        }
      };
      

    const handlePasswordChange = (text) => {
        setPassword(text);
        // Check if passwords match and set error message accordingly
        if (text !== confirmPassword) {
          setErrorMessage('Password & Confirm Password do not match');
        } else {
          setErrorMessage('');
        }
      };
    
      const handleConfirmPasswordChange = (text) => {
        setConfirmPassword(text);
        // Check if passwords match and set error message accordingly
        if (text !== password) {
          setErrorMessage('Password & Confirm Password do not match');
        } else {
          setErrorMessage('');
        }
      };
    
    const navigation = useNavigation();

    const handleRegister = async () => {
        
        // Navigate to the "Login" screen
        const userData = {
          student,
          password,
          confirmPassword,
        };
        try{
            // Send a POST request with fetch
            const response = await fetch('http://10.0.2.2:8000/api/accounts/student/create',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            }
            );
            const data = await response.json();
            console.log(data);

            if(response.status === 201) {
                console.log('Account created successfully');
                setAccessToken(data.access_token);
                navigation.navigate('OTP', {accessToken: data.access_token});
                setAlertText(data.message);
                setModalVisible(true);
            } else if(response.status === 400) {
                console.log('Error creating account');
                setAlertText(data.message);
                setModalVisible(true);
            };
            } catch (error) {
                console.log(error);
            }
    };
    const closeModal = () => {
        setModalVisible(false);
      };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>

            <View style={{marginHorizontal: 32}}>
                <Text
                    style={{
                        fontSize: 22,
                        marginVertical: 12,
                        fontWeight: 'bold',
                        color: 'black',
                    }}
                >Create Account</Text>

                <Text style={{fontSize: 16, color:'gray', marginBottom:20, }}
                >
                   Enjoy rides with friends.
                </Text>

                <View style={{marginBottom: 12}}>
                    <Text style={{fontSize: 16, fontWeight:400, marginVertical: 8}}>Student Number</Text>

                    <View style={{width: '100%', height: 48, borderWidth:1, borderRadius: 8, alignItems: 'center', justifyContent: 'center', paddingLeft: 22}}>
                        <TextInput 
                        placeholder="Student Number"
                        onChangeText={handleStudentChange}
                        value={student}
                        style={{
                            width: '100%',
                        }}
                        />
                    </View>
                </View>

               {studentMessage ? (<Text style={styles.errorMessage}>{studentMessage}</Text>) : null}


                <View style={{marginBottom: 12}}>
                    <Text style={{fontSize: 16, fontWeight:400, marginVertical: 8}}>Password</Text>

                    <View style={{width: '100%', height: 48, borderWidth:1, borderRadius: 8, alignItems: 'center', justifyContent: 'center', paddingLeft: 22}}>
                        <TextInput 
                        placeholder="Password"
                        onChangeText={handlePasswordChange}
                        value={password}
                        style={{
                            width: '100%',
                        }}
                        secureTextEntry={true}
                        />
                    </View>
                </View>

                <View style={{marginBottom: 12}}>
                    <Text style={{fontSize: 16, fontWeight:400, marginVertical: 8}}>Confirm Password</Text>

                    <View style={{width: '100%', height: 48, borderWidth:1, borderRadius: 8, alignItems: 'center', justifyContent: 'center', paddingLeft: 22}}>
                        <TextInput 
                        placeholder="Confirm Password"
                        onChangeText={handleConfirmPasswordChange}
                        value={confirmPassword}
                        style={{
                            width: '100%',
                        }}
                        secureTextEntry={true}
                        />
                    </View>
                </View>

                {errorMessage ? (
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                  ) : null}

                <View style={{top:30}}>
                    <TouchableOpacity onPress={handleRegister}
                    style={{width: '100%', height: 48, backgroundColor: '#01ADDD', borderRadius: 8, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>Create Account</Text>
                    </TouchableOpacity>
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>{alertText}</Text>
                        <Pressable onPress={closeModal}>
                        <Text style={styles.closeButton}>Close</Text>
                        </Pressable>
                    </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    errorMessage: {
        color: 'red',
        fontSize: 16,
        marginTop: 5,
        marginBottom: 5,
      },
    
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
      },
      modalText: {
        fontSize: 16,
        marginBottom: 20,
      },
      closeButton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007AFF',
      },
});