import {View, Text, StyleSheet, Image, useWindowDimensions} from 'react-native';
import React from 'react';
import {styles} from './slides.style';
const Slide = ({item}) => {
    const {width} = useWindowDimensions();
    return (
        <View>
            <Image source={item.image} style={[styles.image]} />
            <View style={{flex: 0.3}}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    );
}
export default Slide;