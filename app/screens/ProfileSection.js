import React, { useState, useContext } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text, Button, Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import UserContext from '../../Global/UserContext';

import colors from '../config/colors';

const ProfileSettingsScreen = ({ route }) => {
  
  const { setUser } = useContext(UserContext)
  const {user} = useContext(UserContext)

  const [username, setUsername] = useState("Emma Watson");

  const navigation = useNavigation()
  const { chatImages } = route.params;
  const [profilePicture, setProfilePicture] = useState('https://p.kindpng.com/picc/s/394-3947019_round-profile-picture-png-transparent-png.png');
  const [showExtraContent, setShowExtraContent] = useState(false);

  const askForCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      console.error('Camera permission not granted');
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
      setProfilePicture(imageUri);
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

  const handleSaving = () => {
    setUser({ profilePicture })
    navigation.navigate('ChatScreen')
  }

  return (
    <View style={styles.container}>
      {showExtraContent && (
        <View style={styles.profilePicOpenScreen}>

          {<Image source={{ uri: profilePicture }} style={styles.image} />}
          <View style={styles.buttons}>
            <Button color={colors.primary} title="Camera" onPress={captureImage} />
            <View style={{ width: 30 }} />
            <Button color={colors.primary} title="Gallery" onPress={profilepic} />
            <View style={{ width: 30 }} />
            <Button color={colors.primary} title="Upload" onPress={showProfile} />
          </View>
        </View>
      )}
      {!showExtraContent && (
        <>
          <View style={styles.profileContainer}>
            <TouchableOpacity onPress={showProfile}>
              <Avatar
                rounded
                size="xlarge"
                source={{ uri: profilePicture }}
              />
            </TouchableOpacity>
            <Text h4 style={{ marginTop: 10 }}>
              {username}
            </Text>
            <Text style={{ marginTop: 5, fontSize: 18, color: 'grey' }}>
              +1 253 879-2948
            </Text>
          </View>

          <Text style={{
            fontSize: 15,
            fontWeight: 200,
            color: 'grey',
          }}>Media</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chatImagesContainer}>
            {chatImages.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.chatImage} />
            ))}
          </ScrollView>

          <View style={styles.buttonContainer}>
            <Button title="Save Changes" onPress={handleSaving} />
            <Button title="Logout" onPress={() => navigation.navigate('LoginPage')} buttonStyle={styles.logoutButton} />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: '#fff',
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