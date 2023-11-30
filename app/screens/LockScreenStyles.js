import React, { useState, useContext } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import UserContext from '../../Global/UserContext';
import { useNavigation } from '@react-navigation/native';

import colors from '../config/colors';

const LockScreenStyles = () => {
  const nav = useNavigation();
  const [isHovered1, setHovered1] = useState(false);
  const [isHovered2, setHovered2] = useState(false);
  const [isHovered3, setHovered3] = useState(false);
  const defaultStyle = 1;
  const [selectedTile, setSelectedTile] = useState(null);
  const out = selectedTile || defaultStyle;

  const { setUser, user } = useContext(UserContext);

  const handlePressIn = (tileNumber) => {
    switch (tileNumber) {
      case 1:
        setHovered1(!isHovered1);
        setHovered2(false);
        setHovered3(false);
        setSelectedTile(selectedTile === 1 ? null : 1);
        break;
      case 2:
        setHovered2(!isHovered2);
        setHovered1(false);
        setHovered3(false);
        setSelectedTile(selectedTile === 2 ? null : 2);
        break;
      case 3:
        setHovered3(!isHovered3);
        setHovered2(false);
        setHovered1(false);
        setSelectedTile(selectedTile === 3 ? null : 3);
        break;
      default:
        break;
    }
  };

  const handleSelectStyle = () => {
    if (selectedTile !== null) {
      setUser((prevUser) => ({
        ...prevUser,
        out
      }));
      // setUser({ out });
      nav.goBack();
    } else {
      alert('Please select a style first');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: user.isDarkMode ? colors.secondary : '#333' }]}>
      <Text style={{ fontSize: 25, fontWeight: '800', marginBottom: 15, color: user.isDarkMode ? colors.primary : colors.secondary }}>Styles</Text>
      <View>
        <TouchableWithoutFeedback onPress={() => handlePressIn(1)}>
          <View style={[styles.tile, isHovered1 && styles.hovered]}>
            <Image style={{ height: 180, width: 100, borderRadius: 10 }} source={{ uri: 'https://addrom.com/wp-content/uploads/2021/09/1633025839_906_How-to-change-your-lock-screen-shortcuts-on-Android-12.jpg' }} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => handlePressIn(2)}>
          <View style={[styles.tile, isHovered2 && styles.hovered]}>
            <Image style={{ height: 180, width: 100, borderRadius: 10 }} source={{ uri: 'https://storage.googleapis.com/support-forums-api/attachment/thread-133337499-1497477143686209883.png' }} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => handlePressIn(3)}>
          <View style={[styles.tile, isHovered3 && styles.hovered]}>
            <Image style={{ height: 180, width: 100, borderRadius: 10 }} source={{ uri: 'https://images.tenorshare.com/topics/android/android-12-lock-screen-clock.jpg?w=276&h=425' }} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <Button title="Select Style" onPress={handleSelectStyle} color={user.isDarkMode ? colors.primary : 'grey'}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
    padding: 20,
  },
  tile: {
    width: 100,
    height: 180,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  hovered: {
    backgroundColor: 'lightcoral',
    height: 190,
    width: 110,
  },
});

export default LockScreenStyles;
