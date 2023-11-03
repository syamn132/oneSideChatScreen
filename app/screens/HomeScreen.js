import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import colors from '../config/colors';

const chatData = [
  {name: 'Emma Watson', text: 'Hello there!', time: '10:30 AM'},
];

const HomeScreen = ({ navigation }) => {
    const navigateToChatScreen = () => {
        navigation.navigate('ChatScreen');
      };

  return (
    <View style={styles.container}>
        <ScrollView>
        {chatData.map((data, index) => (
            
            <View key={index}>
                <View style={styles.appName}>
                <Text style = {styles.title}>Messages</Text>
                </View>
              <TouchableOpacity onPress={navigateToChatScreen}>
                <View style={styles.chatItem}>
                    <Image
                    style={styles.profilepic}
                    source={require('../assets/ppr.png')}
                    >
                    </Image>
                    <View>
                      <Text style={styles.contactName}>{data.name}</Text>
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
          <TouchableOpacity>
            <Image 
              style = {styles.bottomIcons}
              source={require('../assets/search.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image 
              style = {styles.bottomIcons}
              source={require('../assets/people.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
            <Image 
              style = {styles.bottomIcons}
              source={require('../assets/home.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ChatScreen')}>
            <Image 
              style = {styles.bottomIcons}
              source={require('../assets/msgButton.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image 
              style = {styles.bottomIcons}
              source={require('../assets/extra.png')} />
          </TouchableOpacity>
          
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appName: {
    alignItems: 'center'
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
  title: {
    fontSize: 24,
    width: '100%',
    paddingBottom: 15,
    marginBottom: 18,
    borderBottomWidth: .5,
    textAlign: 'center',
    fontWeight: 'bold',
    borderColor: '#ccc',
    color: colors.primary,
  },
  messageTime: {
    fontSize: 14,
    color: '#888'
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
  },
  text: {
      fontSize: 16,
      color: '#888',
  },
});

export default HomeScreen;
