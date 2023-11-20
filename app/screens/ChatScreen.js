import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Image, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

import colors from '../config/colors';

const ChatScreen = () => {
    const navigation = useNavigation();

    const [newMessage, setNewMessage] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [profilePicture, setProfilePicture] = useState('https://p.kindpng.com/picc/s/394-3947019_round-profile-picture-png-transparent-png.png');
    const [showExtraContent, setShowExtraContent] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'text', text: 'Hello there!', time: '10:30 AM', img: null }
    ]);

    const addMessage = () => {
        if (newMessage.trim() !== '') {
            const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            setMessages([...messages, { type: 'text', text: newMessage, time: currentTime, img: null }]);
            setNewMessage('');
        }
    };

    const captureImage = async () => {
        askForCameraPermission();
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });
        if (!result.canceled) {
            const imageAsset = result.assets[0];
            const imageUri = imageAsset.uri;
            setSelectedImage(imageUri);
            const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            setMessages([...messages, { type: 'image', time: currentTime, img: imageUri }]);
        }
    };

    const askForCameraPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
    
        if (status !== 'granted') {
          console.error('Camera permission not granted');
        }
      };

    const attachImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });
        if (!result.canceled) {
            const imageAsset = result.assets[0];
            const imageUri = imageAsset.uri;
            setSelectedImage(imageUri);
            const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            setMessages([...messages, { type: 'image', time: currentTime, img: imageUri }]);
        }
    };

    const profilepic = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });
        if (!result.canceled) {
            const imageAsset = result.assets[0];
            setProfilePicture(imageAsset.uri);
        }
    };

    const showProfile = () => {
        setShowExtraContent(!showExtraContent);
    };


    return (
        <View style={styles.container}>
            {showExtraContent && (
                <View style={styles.profilePicOpenScreen}>
                    {<Image source={{ uri: profilePicture }} style={styles.image} />}
                    <View style={styles.buttons}>
                        <Button color={colors.primary} title="Change" onPress={profilepic} />
                        <View style={{ width: 30 }} />
                        <Button color={colors.primary} title="Upload" onPress={showProfile} />
                        <View style={{ width: 30 }} />
                        <Button color={colors.primary} title="Cancel" onPress={showProfile} />
                    </View>
                </View>
            )}
            {!showExtraContent && (
                <>
                    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.messageContainer}>
                        {messages.map((message, index) => (
                            <View key={index}>
                                {message.type === 'text' && (
                                    <View style={styles.message}>
                                        <Text style={styles.messageText}>{message.text}</Text>
                                    </View>
                                )}
                                {message.type === 'image' && (
                                    <View style={styles.photo}>
                                        <Image source={{ uri: message.img }} style={{ width: '70%', aspectRatio: 4 / 3 }} />
                                    </View>
                                )}
                                <Text style={styles.messageTime}>{message.time}</Text>
                            </View>
                        ))}
                    </ScrollView>
                    <View style={styles.profileContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                            <Image
                                style={styles.backarrow}
                                source={require('../assets/back.png')}
                            >
                            </Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={showProfile}>
                            <Image
                                style={styles.profilepic}
                                source={{ uri: profilePicture }}
                            >
                            </Image>
                        </TouchableOpacity>
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
                            onChangeText={text => setNewMessage(text)} />
                        <TouchableOpacity onPress={captureImage}>
                            <Image
                                source={require('../assets/camera.png')}
                                style={styles.camera}
                            >
                            </Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={attachImage}>
                            <Image
                                style={styles.attach}
                                source={require('../assets/attach.png')}
                            >
                            </Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={addMessage}>
                            <Image
                                source={require('../assets/send.png')}
                                style={styles.send} />
                        </TouchableOpacity>
                    </View></>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    attach: {
        height: 40,
        width: 40,
    },

    backarrow: {
        height: 40,
        width: 40,
    },

    buttons: {
        flexDirection: 'row',
    },

    callbtn: {
        width: 35,
        height: 35,
    },

    camera: {
        width: 40,
        height: 40,
        right: 5
    },

    container: {
        flex: 1,
        marginTop: 30,
    },

    photo: {
        alignSelf: 'flex-end',
        borderWidth: 1,
        borderColor: 'black',
    },

    image: {
        width: 300,
        height: 300,
        marginBottom: 15,
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
        justifyContent: 'space-around',
        alignItems: 'center'
    },


    profilepic: {
        height: 55,
        width: 55,
        borderRadius: 30
    },

    profilePicOpenScreen: {
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    profileName: {
        fontSize: 20,
        color: 'white',
    },

    send: {
        height: 40,
        width: 40,
    },

    vcallbtn: {
        width: 35,
        height: 35,
    },
});

export default ChatScreen;