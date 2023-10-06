import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import {Slide} from '../../components/Sliders/slides';
const OnboardingScreen = () => {

    const slides = [
        {
            id:1,
            image: require('../../assets/tech.jpg'),
            title: 'Connect to the World',
        },
        // {
        //     id:2,
        //     image: require('../../assets/UL.jpg'),
        //     title: 'Connect to the World',
        // }
    ]
    return (
        <FlatList
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            data={slides}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (Slide)}
        />
    );
}
export default OnboardingScreen;

const styles = StyleSheet.create({});