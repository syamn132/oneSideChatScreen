import React, { useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Switch as RNSwitch } from 'react-native';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserContext from '../../Global/UserContext';

const chatData = [
  { name: 'Emma Watson', text: 'Hello there!', time: '10:30 AM' },
];

const HomeScreen = ({ navigation }) => {
  const { setUser } = useContext(UserContext)
  const {user} = useContext(UserContext)

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSwitch = () => {
    setUser({ isDarkMode })
    setIsDarkMode(!isDarkMode);
  };

  const containerStyle = {
    ...styles.container,
    backgroundColor: isDarkMode ? '#333' : 'white',
  };
  const iconColor = isDarkMode ? 'white' : styles.icons.color;
  const titleStyle = {
    ...styles.title,
    color: isDarkMode ? 'white' : colors.primary,
  };
  const titleContactName = {
    ...styles.contactName,
    color: isDarkMode ? 'white' : 'black',
  };

  const navigateToChatScreen = () => {
    navigation.navigate('ChatScreen');
  };

  return (
    <View style={containerStyle}>
      <ScrollView>
        {chatData.map((data, index) => (
          <View key={index}>
            <View style={styles.appNameContainer}>
              <View>
                <Text style={titleStyle}>Home</Text>
              </View>
              <View style={styles.nightbutton}>
                <RNSwitch
                  value={isDarkMode}
                  onValueChange={toggleSwitch}
                />
              </View>
            </View>
            <TouchableOpacity onPress={navigateToChatScreen}>
              <View style={styles.chatItem}>
                <Image
                  style={styles.profilepic}
                  source={require('../assets/ppr.png')}
                >
                </Image>
                <View>
                  <Text style={titleContactName}>{data.name}</Text>
                  <Text style={styles.text}>{data.text}</Text>
                </View>
                <View style={styles.time}>
                  <Text style={styles.messageTime}>{data.time}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View style={styles.bottom}>
        <Icon name="home" size={styles.icons.size} color={iconColor} />
        <Icon name="search" size={styles.icons.size} color={iconColor} />
        <Icon name="chat" size={styles.icons.size} color={iconColor} onPress={() => navigation.navigate('ChatScreen')} />
        <Icon name="settings" size={styles.icons.size} color={iconColor} onPress={() => navigation.navigate('SettingsPage')} />
        <Icon name="logout" size={styles.icons.size} color={iconColor} onPress={() => navigation.navigate('LoginPage')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appNameContainer: {
    justifyContent: "center",
    flexDirection: 'row'
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 55,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 10
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 16,
  },
  bottomIcons: {
    height: 40,
    width: 40,
  },
  bottomIconsNotifications: {
    height: 35,
    width: 35,
  },
  icons: {
    size: 40,
    color: colors.primary
  },
  messageTime: {
    fontSize: 14,
    color: '#888'
  },
  nightbutton: {
    position: 'absolute',
    right: 5,
    marginTop: 5
  },
  time: {
    position: 'absolute',
    flexDirection: 'row-reverse',
    alignSelf: 'center',
    right: 10
  },
  profilepic: {
    height: 55,
    width: 55,
    marginRight: 15,
    borderRadius: 20
  },
  text: {
    fontSize: 16,
    color: '#888',
  },
  title: {
    fontSize: 24,
    paddingBottom: 15,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.primary,
  },
});

export default HomeScreen;
