import React, { useState, useContext } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text, Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import UserContext from '../../Global/UserContext';
import { Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '../config/colors';

const ProfileSettingsScreen = ({ route }) => {

  const { setUser } = useContext(UserContext)
  const { user } = useContext(UserContext)

  const [username, setUsername] = useState("Emma Watson");

  const navigation = useNavigation()
  const { chatImages, links } = route.params;

  const [profilePicture, setProfilePicture] = useState('https://p.kindpng.com/picc/s/394-3947019_round-profile-picture-png-transparent-png.png');
  const [showExtraContent, setShowExtraContent] = useState(false);

  const askForCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      console.error('Camera permission not granted');
    }
  };

  const showProfile = () => {
    setShowExtraContent(!showExtraContent);
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: user.isDarkMode ? 'white' : '#333', }]}>
      {showExtraContent && (
        <View style={styles.profilePicOpenScreen}>
          {<Image source={{ uri: profilePicture }} style={styles.image} />}
        </View>
      )}
      {!showExtraContent && (
        <>
          <Icon name="arrow-back" size={styles.icons.size} color={user.isDarkMode ? colors.primary : colors.secondary} onPress={goBack} />
          <View style={styles.profileContainer}>
            <TouchableOpacity onPress={showProfile}>
              <Avatar
                rounded
                size="xlarge"
                source={{ uri: profilePicture }}
              />
            </TouchableOpacity>
            <Text h4 style={{ marginTop: 10, color: user.isDarkMode ? colors.black : colors.secondary }}>
              {username}
            </Text>
            <Text style={{ marginTop: 5, fontSize: 18, color: 'grey' }}>
              +1 253 879-2948
            </Text>
          </View>

          <Text style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: 'grey',
          }}>Media</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chatImagesContainer}>
            {chatImages.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.chatImage} />
            ))}
          </ScrollView>

          <Text style={{
            marginTop: -220,
            fontSize: 15,
            fontWeight: 'bold',
            color: 'grey',
          }}>Links</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chatImagesContainer}>
            {links.map((link, index) => (
              <TouchableOpacity key={index} onPress={() => Linking.openURL(link)}>
                <View style={styles.linkItem}>
                  <Text style={styles.linkText}>{link}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={{
            marginTop: -220,
            fontSize: 15,
            fontWeight: 'bold',
            color: 'grey',
          }}>Events</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chatImagesContainer}>

          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  icons: {
    size: 40,
  },

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

  chatImagesContainer: {
    maxHeight: 112,
    marginTop: 5,
    flexDirection: 'row-reverse',
  },

  chatImage: {
    height: 110,
    width: 110,
    marginRight: 2
  },

  container: {
    flex: 1,
    padding: 20,
    marginTop: 30
  },

  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },

  profilePicOpenScreen: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  procontainer: {
    flex: 1,
    marginTop: 30,
  },

  image: {
    width: 300,
    height: 300,
    marginBottom: 15,
  },

  buttons: {
    flexDirection: 'row',
  },

  formContainer: {
    marginBottom: 0,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  logoutButton: {
    backgroundColor: 'red',
  },
});

export default ProfileSettingsScreen;