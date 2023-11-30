import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import React, { useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../Global/UserContext';
import colors from '../config/colors';


const PasswordSettings = () => {
    const nav = useNavigation()
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState('https://p.kindpng.com/picc/s/394-3947019_round-profile-picture-png-transparent-png.png');

    const { setUser } = useContext(UserContext)
    const { user } = useContext(UserContext)

    const handleChangePassword = (e) => {
        e.preventDefault()
        setUser((prevUser) => ({
            ...prevUser,
            newPassword
        }));
        if (newPassword === confirmPassword) {
            setOldPassword(newPassword)
            nav.goBack()
        } else {
            alert("Passwords entered are not same")
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: user.isDarkMode ? 'white' : '#333', }]}>
            <Text style={[styles.header, { color: user.isDarkMode ? colors.primary : colors.secondary, }]}>Settings</Text>
            <Text style={[styles.sectionHeader, { color: user.isDarkMode ? colors.primary : colors.secondary, }]}>Change Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Old Password"
                secureTextEntry
                value={oldPassword || '0000'}
                onChangeText={(text) => setOldPassword(text)}
                color={colors.primary}
                backgroundColor={colors.secondary}
            />
            <TextInput
                style={styles.input}
                placeholder="New Password"
                secureTextEntry
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
                color={colors.primary}
                backgroundColor={colors.secondary}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm New Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                color={colors.primary}
                backgroundColor={colors.secondary}
            />
            <View style={{ flexDirection: 'row', gap: 25, marginTop: 15 }}>
                <Button
                    title="Change Password"
                    onPress={handleChangePassword}
                    color={user.isDarkMode ? colors.primary : 'grey'}
                />
                <Button
                    title="Cancel"
                    onPress={() => nav.navigate('SettingsPage')}
                    color={user.isDarkMode ? colors.primary : 'grey'}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 8,
        width: '100%',
    },
});
export default PasswordSettings