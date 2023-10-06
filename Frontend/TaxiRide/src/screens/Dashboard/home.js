import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView, Image, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // Import useSafeAreaInsets
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, { Callout, Circle, Marker } from "react-native-maps"
import { useState } from 'react';
import Header from './header/mainheader';
import { useNavigation } from '@react-navigation/native';
import jwt_decode from 'jwt-decode'; 
const HomeScreen = ({ route }) => {
  const { accessToken } = route.params;
  // Decode the token to get the payload
  const decodedToken = jwt_decode(accessToken);
  // console.log('Decoded Token:', decodedToken);

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [ pin, setPin ] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324
    })
    const [ region, setRegion ] = React.useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    })
  const upcomingTrips = [
    {
      id: '1',
      date: '2023-09-20',
      time: '10:00 AM',
      pickupLocation: 'Campus Center',
      dropoffLocation: '456 Elm St',
    },

    {
        id: '2',
        date: '2023-09-20',
        time: '10:00 AM',
        pickupLocation: 'Gate 2',
        dropoffLocation: '456 Elm St',
      },
    // Add more trip data here
  ];

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            <Header title="UL Student Ride" user={decodedToken.name} />

            <TouchableOpacity onPress={() => navigation.navigate('Chats')}  style={{flexDirection: 'row', alignItems: 'center', padding:7, backgroundColor: '#01ADDD', justifyContent: 'center', borderRadius:5}}>
              <Text>Chats</Text>
            </TouchableOpacity>

                <View>
                        <Text style={styles.tripInfo}>Upcoming Trips</Text>
                </View>

            <View style={styles.locationContainer}>
                <FlatList
                data={upcomingTrips}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                    <Text style={styles.cardText}>{item.pickupLocation} </Text>
                    <FontAwesome
                        name="level-down"
                        size={20}
                        color="white"
                        style={styles.icon}
                    />
                    <Text style={styles.cardText}>{item.dropoffLocation}</Text>
                    <Text style={styles.cardText}>{item.date} {item.time}</Text>
                    </View>
                )}
                />
                <View>
                    <Text style={styles.tripInfo}>Pick your locations to book</Text>
                </View>

                <View style={styles.locationInputs}>
                    <TextInput
                        style={styles.locationInput}
                        placeholder="Pickup Location"
                        // value={pickupLocation}
                        // onChangeText={setPickupLocation}
                    />
                    <TextInput
                        style={styles.locationInput}
                        placeholder="Dropoff Location"
                        // value={dropoffLocation}
                        // onChangeText={setDropoffLocation}
                    />
                </View>
            <View style={{display:'flex', alignItems: 'center', alignContent:'center', marginBottom:10 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Book')}
                 style={{flexDirection: 'row', alignItems: 'center', padding:7, backgroundColor: '#01ADDD', justifyContent: 'center', borderRadius:5}}>
                    <Text style={{marginRight: 10, color:'white'}}>Next</Text>
                    <FontAwesome
                        name="chevron-right"
                        size={15}
                        color="white"
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
              <MapView
              style={styles.map}
              initialRegion={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421
              }}
              provider="google"
          >
              <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
              <Marker
                  coordinate={pin}
                  pinColor="black"
                  draggable={true}
                  onDragStart={(e) => {
                      console.log("Drag start", e.nativeEvent.coordinates)
                  }}
                  onDragEnd={(e) => {
                      setPin({
                          latitude: e.nativeEvent.coordinate.latitude,
                          longitude: e.nativeEvent.coordinate.longitude
                      })
                  }}
              >
                  <Callout>
                      <Text>I'm here</Text>
                  </Callout>
              </Marker>
              <Circle center={pin} radius={100} />
          </MapView>
            </View>
      </View>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
    paddingLeft: 5,
    paddingRight: 5,
  },
  header: {
    marginTop: 8,
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  locationInput: {
    flex: 1,
    height: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 5,
  },

  locationInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },

  tripCard: {
    backgroundColor: '#f4f4f4',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  tripInfo: {
    fontSize: 16,
  },
    card: {
        width: 250,
        height: 110,
        color: 'white',
        backgroundColor: '#01ADDD',
        borderRadius: 10,
        marginRight: 10,
        marginTop: 5,
        marginVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardText: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
        marginTop: 5,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height ,
    },

  mainheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16, // Use your desired spacing
    backgroundColor: 'white', // Add a background color
},
title: {
    fontSize: 20, // Use your desired font size
    fontWeight: 'bold',
},
});

export default HomeScreen;
