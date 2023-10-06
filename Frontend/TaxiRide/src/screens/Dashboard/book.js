import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const BookScreen = () => {
    const [selectedValue1, setSelectedValue1] = useState('');
    const [selectedValue2, setSelectedValue2] = useState('');
    const [selectedValue3, setSelectedValue3] = useState('');

    const [chosenDate, setChosenDate] = useState(new Date());
    const [storeTimeSlot, setStoreTimeSlot] = useState('');

    const [isFocus, setIsFocus] = useState(false);
    const gate = [
        {
            id: '1',
            label: 'Gate 1',
            value: 'Gate 1',
        },
        {
            id: '2',
            label: 'Gate 2',
            value: 'Gate 2',
        },
        {
            id: '3',
            label: 'Gate 3',
            value: 'Gate 3',
        }
    ];

    const fetchTimeSlots = async () => {
        try {
          const response = await fetch('http://10.0.2.2:8000/api/time-slots/');
          const data = await response.json();

          let newArray = data.map((item) => {
            return { key: item.id.toString(), value: item.name };
          });
          setStoreTimeSlot(newArray);
        } catch (error) {
          console.log(error);
        }
      };


    useEffect(() => {
        fetchTimeSlots();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Booking</Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../../assets/4721508.jpg')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>
                <View style={{marginBottom:30}}>
                   <Text style={{textAlign: 'center', fontSize: 15,}}>Destination: Gate 3</Text>
                </View>
                <View style={styles.selectContainer}>

                   <Text style={{fontSize: 15, fontWeight:'bold', marginBottom: 5, marginTop:5, paddingLeft:5}}>Select Gate</Text>

                    <SelectList style={styles.selectField}
                        setSelected={(val) => setSelectedValue1(val)} 
                        data={gate}
                        label="Select Gate"
                        save="value"
                    />
                    <Text style={{fontSize: 15, fontWeight:'bold',marginTop:5, marginBottom: 5, paddingLeft:5}}>Select Date</Text>



                    <Text style={{fontSize: 15, fontWeight:'bold',marginTop:5, marginBottom: 5, paddingLeft:5}}>Choose a preferred time slot</Text>
                    <SelectList style={styles.selectField}
                        setSelected={(val) => setSelectedValue1(val)}
                        data={storeTimeSlot}
                        save="value"
                    />
                    <Text></Text>

                    <TouchableOpacity
                        style={{width: '100%', height: 48, backgroundColor: '#01ADDD', borderRadius: 8, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>Book a seat</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingLeft: 5,
        paddingRight: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',

    },
    imageContainer: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    image: {
        width: 300, // Set your desired width
        height: 250, // Set your desired height
    },
    selectContainer: {
        flex: 1,
    },
    selectField: {
        width: '70%',
        marginBottom: 20,
        marginTop: 20,
    },
});

export default BookScreen;
