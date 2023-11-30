import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import UserContext from '../../Global/UserContext';
import { useNavigation } from '@react-navigation/native';

const NumericInput = ({ value, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(value)}>
      <View style={styles.numericButton}>
        <Text style={styles.numericButtonText}>{value}</Text>
      </View>
    </TouchableOpacity>
  );
};

const PinDisplay = ({ pin }) => {
  return (
    <View style={styles.pinDisplay}>
      {Array.from({ length: 4 }).map((_, index) => (
        <View key={index} style={styles.pinDot}>
          {index < pin.length && <Text style={styles.pinDotText}>•</Text>}
        </View>
      ))}
    </View>
  );
};

const LoginPage = () => {
  const nav = useNavigation();

  const { setUser } = useContext(UserContext);
  const { user } = useContext(UserContext);

  const [pin, setPin] = useState('');
  const [showLogin, setShowLogin] = useState(!!user.newPassword);

  const handleNumericPress = (value) => {
    if (pin.length < 4) {
      setPin((prevPin) => prevPin + value);
    }
  };

  const handleBackspace = () => {
    setPin((prevPin) => prevPin.slice(0, -1));
  };

  const handleCreatePin = () => {
    if (pin.length === 4) {
      setUser((prevUser) => ({
        ...prevUser,
        newPassword: pin,
        isDarkMode: false
      }));
      // setUser({ newPassword: pin });
      setPin('');
      setShowLogin(true);
    }
  };

  const handleLogin = () => {
    if (pin === user.newPassword) {
      setPin('');
      nav.navigate('HomeScreen');
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://wallpapercave.com/wp/wp5418955.jpg' }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <PinDisplay pin={pin} />
          <TouchableOpacity onPress={handleBackspace}>
            <View style={{ marginTop: -8 }}>
              <Text style={{ color: 'white', fontSize: 25 }}>⌫</Text>
            </View>
          </TouchableOpacity>
        </View>
        {!showLogin && (
          <>
            <View style={styles.pinInput}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((digit) => (
                <NumericInput key={digit} value={digit} onPress={handleNumericPress} />
              ))}
              <TouchableOpacity onPress={handleCreatePin}>
                <View style={styles.numericButton}>
                  <Text style={{ fontSize: 17 }}>Create</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
        {showLogin && (
          <>
            <View style={styles.pinInput}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((digit) => (
                <NumericInput key={digit} value={digit} onPress={handleNumericPress} />
              ))}
              <TouchableOpacity onPress={handleLogin}>
                <View style={styles.numericButton}>
                  <Text style={{ fontSize: 17 }}>Login</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  pinInput: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  numericButton: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  numericButtonText: {
    fontSize: 24,
  },
  pinDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  pinDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinDotText: {
    color: 'white',
    fontSize: 16,
  },
});

export default LoginPage;
