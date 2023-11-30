import React from 'react';
import { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Image, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserContext from '../../Global/UserContext';

import colors from '../config/colors';

const ChatScreen = () => {
    const navigation = useNavigation();

    // Check wheter the added msg is link or not and add it into the array
    const [links, setLinks] = useState([]);
    const extractLinks = (text) => {
        const regex = /(https?|ftp):\/\/[^\s/$.?#].[^\s]*/gi
        const regex1 = /(https?:\/\/|ftp)?(www\.[^\s/$?#][\w/.?#-]*)/gi
        const extractedLinks = text.match(regex) || text.match(regex1);
        if (extractedLinks) {
            setLinks([...links, text]);
        }
    };

    const [newMessage, setNewMessage] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const defaultProfilePicture = 'https://p.kindpng.com/picc/s/394-3947019_round-profile-picture-png-transparent-png.png'
    const { user } = useContext(UserContext)

    const [showExtraContent, setShowExtraContent] = useState(false);
    const [chatImages, setChatImages] = useState([]);
    const [messages, setMessages] = useState([
        { type: 'text', text: 'Hello there!', time: '10:30 AM', img: null }
    ]);

    const addMessage = () => {
        if (newMessage.trim() !== '') {
            const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            extractLinks(newMessage);
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
            setChatImages([...chatImages, imageUri]);
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
            setChatImages([...chatImages, imageUri]);
        }
    };

    const showProfile = () => {
        setShowExtraContent(!showExtraContent);
    };

    return (
        <View style={[styles.container, { backgroundColor: user.isDarkMode ? 'white' : '#333', }]}>
            {showExtraContent && (
                <View style={styles.profilePicOpenScreen}>
                    {<Image source={{ uri: profilePicture }} style={styles.image} />}
                    <View style={styles.buttons}>
                        <Button color={colors.primary} title="Close" onPress={showProfile} />
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chatImagesContainer}>
                        {chatImages.map((image, index) => (
                            <Image key={index} source={{ uri: image }} style={styles.chatImage} />
                        ))}
                    </ScrollView>
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
                                <Text style={[styles.messageTime, { color: user.isDarkMode ? colors.black : colors.secondary }]}>{message.time}</Text>
                            </View>
                        ))}
                    </ScrollView>
                    <View style={styles.profileContainer}>
                        <Icon name="arrow-back" size={styles.icons.size} color={styles.icons.color} onPress={() => navigation.navigate('HomeScreen')} />
                        <TouchableOpacity onPress={() => navigation.navigate('ProfileSection', { chatImages, links })}>
                            <Image
                                style={styles.profilepic}
                                source={{ uri: defaultProfilePicture }}
                            >
                            </Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('ProfileSection', { chatImages, links })}>
                            <Text style={styles.profileName}>{"Emma Watson"}</Text>
                        </TouchableOpacity>
                        <Icon name="call" size={styles.icons.size} color={styles.icons.color} onPress={() => navigation.navigate('HomeScreen')} />
                        <Icon name="videocam" size={styles.icons.size} color={styles.icons.color} onPress={() => navigation.navigate('HomeScreen')} />
                    </View>

                    <View style={[styles.inputContainer, { backgroundColor: user.isDarkMode ? 'white' : '#333', borderColor: user.isDarkMode ? colors.primary : colors.secondary }]}>
                        <TextInput
                            style={[styles.input, { borderColor: user.isDarkMode ? colors.primary : 'white' }]}
                            placeholder="Type your message"
                            value={newMessage}
                            onChangeText={text => setNewMessage(text)} />
                        <Icon name="photo-camera" size={styles.bicons.size} color={user.isDarkMode ? colors.primary : colors.secondary} onPress={captureImage} />
                        <Icon name="attachment" size={styles.bicons.size} color={user.isDarkMode ? colors.primary : colors.secondary} onPress={attachImage} />
                        <Icon name="send" size={styles.bicons.size} color={user.isDarkMode ? colors.primary : colors.secondary} onPress={addMessage} />
                    </View></>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    linksContainer: {
        marginTop: 5,
        flexDirection: 'row-reverse',
        alignItems: 'center',
    },

    linkItem: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
        marginRight: 5,
    },

    linkText: {
        color: 'white',
    },

    bicons: {
        size: 40,
        color: colors.primary
    },
    icons: {
        size: 40,
        color: colors.secondary
    },

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

    chatImagesContainer: {
        flex: 1,
        maxWidth: '90%',
        maxHeight: '25%',
        marginTop: 20,
        backgroundColor: 'lightgrey'
    },

    chatImage: {
        height: 110,
        width: 110,
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
        padding: 10,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
    },

    input: {
        flex: 1,
        height: 40,
        borderColor: colors.primary,
        backgroundColor: colors.secondary,
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