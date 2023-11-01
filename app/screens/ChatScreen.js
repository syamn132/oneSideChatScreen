import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

import colors from '../config/colors';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const addMessage = () => {
    if (newMessage.trim() !== '') {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages([...messages, { text: newMessage, time: currentTime }]);
      setNewMessage('');
    }
  };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.messageContainer}>
            {messages.map((message, index) => (
                <View key={index}>
                <View style={styles.message}>
                    <Text style={styles.messageText}>{message.text}</Text>
                </View>
                <Text style={styles.messageTime}>{message.time}</Text>
                </View>
            ))}
            </ScrollView>
            <View style={styles.profileContainer}>
                <Image
                style={styles.backarrow}
                source={require('../assets/back.png')}
                >
                </Image>
                <Image
                style={styles.profilepic}
                source={require('../assets/ppr.png')}
                >
                </Image>
                <Text style={styles.profileName}>Emma Watson</Text>
                <Image
                style={styles.callbtn}
                source={require('../assets/call.png')}
                >
                </Image>
                <Image
                style={styles.vcallbtn}
                source={require('../assets/vcall.png')}
                >
                </Image>
            </View>
            <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="Type your message"
                value={newMessage}
                onChangeText={text => setNewMessage(text)}
            />
            <Image
                style={styles.attach}
                source={require('../assets/attach.png')}
                >
                </Image>
                <TouchableOpacity onPress={addMessage}>
            <Image
                source={require('../assets/send.png')}
                style={styles.send}
            />
            </TouchableOpacity>
            </View>
        </View>
        );
    };
    
    const styles = StyleSheet.create({
        attach: {
            height: 40,
            width: 40,
        },

        backarrow:{
            height: 40,
            width: 40,
        },

        callbtn: {
            width: 35,
            height: 35,
            right: 5
        },

        container: {
            flex: 1,
            marginTop: 30,
        },

        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            borderTopWidth: 1,
            borderColor: colors.primary,
            padding: 10,
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 0,
        },

        input: {
            flex: 1,
            height: 40,
            borderColor: colors.primary,
            borderWidth: 2,
            marginRight: 10,
            padding: 10,
            borderRadius: 20
        },

        message: {
            alignSelf: 'flex-end',
            maxWidth: '60%',
            padding: 12,
            backgroundColor: colors.primary,
            borderRadius: 25,
            borderBottomRightRadius: 0
        }, 
        messageContainer: {
            flex: 1,
            padding: 15,
            bottom: 50,
            marginTop: 45,
            justifyContent: 'flex-end'
        },

        messageText: {
            color: 'white',
        },

        messageTime: {
            marginBottom: 10,
            color: 'black',
            fontSize: 12,
            alignSelf: 'flex-end',
        },
    
        profileContainer: {
            flexDirection: 'row',
            width: '100%',
            height: 70,
            backgroundColor: colors.primary,
            position: 'absolute',
            borderRadius: 50,
            justifyContent: 'space-around',
            alignItems: 'center'
        },

        profilepic: {
            height: 55,
            width: 55,
            },
            profileName: {
            fontSize: 20,
            color: 'white',
            right:5
        },

        send:{
            height: 40,
            width: 40,
        },

        vcallbtn: {
            width: 35,
            height: 35,
            right: 5
        },
    });
    
    export default ChatScreen;