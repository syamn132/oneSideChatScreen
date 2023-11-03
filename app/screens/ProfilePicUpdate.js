import React, { useState } from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import colors from '../config/colors';

function ProfilePicUpdate() {
  const [profilePicture, setProfilePicture] = useState('https://p.kindpng.com/picc/s/394-3947019_round-profile-picture-png-transparent-png.png');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      {<Image source={{uri : profilePicture}} style={styles.image} />}
      <View style={styles.buttons}>
        <Button color={colors.primary} title="Change" onPress={pickImage} />
        <View style={{ width: 40 }} />
        <Button color={colors.primary} title="Upload" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 350,
    height: 350,
    marginBottom: 15,
  },
  buttons: {
    flexDirection: 'row',
  }
});

export default ProfilePicUpdate;