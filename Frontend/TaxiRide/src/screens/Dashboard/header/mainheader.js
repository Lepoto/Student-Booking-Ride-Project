// Header.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const Header = ({ title, user }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Entypo
                    name="menu"
                    size={24}
                    color="black"
                    style={styles.icon}
                />
                <Text style={styles.title}>{title}</Text>
                <FontAwesome
                    name="sign-out"
                    size={24}
                    color="#01ADDD"
                    style={styles.icon}
                />
            </View>

            <View style={styles.header}>
                    <Text style={styles.headerText}>Hi, {user}</Text>
                </View>

            {/* Additional header content */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
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
    // header: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     paddingHorizontal: 16,
    //     backgroundColor: 'white', // Customize the background color
    //     // Add any other styles for the header itself
    // },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        // Add any other styles for the title text
    },
    icon: {
        // Add any styles for the icons
    },
    // Add any additional styles as needed
});

export default Header;
