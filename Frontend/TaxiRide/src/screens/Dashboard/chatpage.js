import { PrettyChatWindow } from "react-chat-engine-pretty";
import { ChatEngine } from 'react-chat-engine';
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const ChatScreen = () => {
    return (
        <ChatEngine
            projectId='26c3394c-28b1-47ee-baa1-5f31307abc04'
            username='Lepoto'
            secret='Lepoto70473'
        />
    )
};
export default ChatScreen;