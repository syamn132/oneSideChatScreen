import React, { useState, useContext } from 'react';
import { View, StyleSheet, Button, TextInput, Image, TouchableOpacity } from 'react-native';
import { Text, Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import UserContext from '../../Global/UserContext';

import colors from '../config/colors';

const ProfileSettings = ({ route }) => {

  const { setUser } = useContext(UserContext)
  const { user } = useContext(UserContext)

  const [firstName, setFirstName] = useState("Emma");
  const [lastName, setLastName] = useState("Watson");
  const [username, setUsername] = useState("Emma Watson");

  const navigation = useNavigation()

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
    setUser((prevUser) => ({
      ...prevUser,
      profilePicture
    }));
    setShowExtraContent(!showExtraContent);
  };

  const updateProfile = () => {
    setUser((prevUser) => ({
      ...prevUser,
      firstName, lastName, profilePicture
    }));
    setShowExtraContent(false);
    navigation.goBack()
  };

  return (
    <View style={[styles.container, { backgroundColor: user.isDarkMode ? 'white' : '#333', }]}>
      {showExtraContent && (
        <View style={styles.profilePicOpenScreen}>
          <Image source={{ uri: profilePicture }} style={styles.image} />
          <View style={styles.buttons}>
            <Button color={user.isDarkMode ? colors.primary : 'grey'} title="Camera" onPress={captureImage} />
            <View style={{ width: 30 }} />
            <Button color={user.isDarkMode ? colors.primary : 'grey'} title="Gallery" onPress={profilepic} />
            <View style={{ width: 30 }} />
            <Button color={user.isDarkMode ? colors.primary : 'grey'} title="Upload" onPress={showProfile} />
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
                source={{ uri: user.profilePicture || profilePicture}}
              />
            </TouchableOpacity>
            <Text h4 style={{ marginTop: 10, color: user.isDarkMode ? colors.black : colors.secondary }}>
              {`${firstName} ${lastName}`}
            </Text>
            <Text style={{ marginTop: 5, fontSize: 18, color: 'grey' }}>
              +1 253 879-2948
            </Text>
            <View style={styles.editProfileContainer}>
              <Text style={{ fontWeight: '700', marginTop: 10, fontSize: 16, color: user.isDarkMode ? colors.black : colors.secondary }}>Edit Profile</Text>
              <View style={styles.nameInputContainer}>
                <Text style={[styles.inputLabel, { color: user.isDarkMode ? colors.black : colors.secondary }]}>First Name:</Text>
                <TextInput
                  style={[styles.input, { borderColor: user.isDarkMode ? colors.black : colors.secondary, color: user.isDarkMode ? colors.black : colors.secondary }]}
                  value={firstName}
                  onChangeText={setFirstName}
                />
              </View>
              <View style={styles.nameInputContainer}>
                <Text style={[styles.inputLabel, { color: user.isDarkMode ? colors.black : colors.secondary }]}>Last Name:</Text>
                <TextInput
                  style={[styles.input, { borderColor: user.isDarkMode ? colors.black : colors.secondary, color: user.isDarkMode ? colors.black : colors.secondary }]}
                  value={lastName}
                  onChangeText={setLastName}
                />
              </View>
              <Button
                title="Update Profile"
                onPress={updateProfile}
                color={user.isDarkMode ? colors.primary : 'grey'}
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({

  editProfileContainer: {
    marginTop: 20,
    alignItems: 'center',
  },

  nameInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },

  inputLabel: {
    fontSize: 16,
    marginRight: 10,
    color: colors.primary,
  },

  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
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

export default ProfileSettings;