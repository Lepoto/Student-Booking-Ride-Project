import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [accessToken, setAccessToken] = useState('');

  const navigation = useNavigation();

  const handleRegister = () => {
    navigation.navigate('Account'); // Navigate to the "Login" screen
  };

  const handleLoginUser = async() => {
    const model = {
      username: username,
      password: password
    }

    try{
       const response = await fetch('http://10.0.2.2:8000/api/token/',{
          method: 'POST',
          headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
          },
          body: JSON.stringify(model)
        }
       
       )
       const data = await response.json();

      //  console.log(data);
       if (response.status === 200) {
        setAlertText('Login Successful');
        setModalVisible(true);
        setAccessToken(data.access)
        navigation.navigate('Home', {accessToken: data.access});
      } else {
        // Handle error response
        if (data.detail) {
          setAlertText(`Error: ${data.detail}`);
        } else if(data.username && data.password) {
          setAlertText(`Username: ${data.username}\nPassword: ${data.password}`);
        // Optionally, add username and password to the error message
      }

        setModalVisible(true);
      }
    }
    catch(error){
      console.log(error);
    }

  };
  const closeModal = () => {
    setModalVisible(false);
  };


  return (
    <View style={styles.container}>
      <Image
          source={require('../../assets/4721508.jpg')} // Replace with your image path
          style={styles.image}
        />
      <Text style={styles.heading}>UL Student Ride Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}

      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.button} onPress={handleLoginUser}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleRegister} style={{marginTop:20}}>
        <Text>Don't have an account? Register here.</Text>
      </TouchableOpacity>

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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#01ADDD'
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#01ADDD',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  image: {
    width: 350, // Set your desired width
    height: 350, // Set your desired height
    marginBottom: 10,
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

export default LoginScreen;
