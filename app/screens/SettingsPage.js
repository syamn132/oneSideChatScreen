import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import React, { useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../Global/UserContext';

const SettingsPage = () => {
    const nav = useNavigation()
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { setUser } = useContext(UserContext)
    const { user } = useContext(UserContext)

    const handleChangePassword = (e) => {
        e.preventDefault()
        setUser({ newPassword })
        if (newPassword === confirmPassword) {
            setOldPassword(newPassword)
            console.log('Password changed successfully');
        } else {
            alert("New Pass")
            console.log('New password and confirmation do not match');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Settings</Text>

            {/* Change Password Section */}
            <Text style={styles.sectionHeader}>Change Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Old Password"
                secureTextEntry
                value={oldPassword || '0000'}
                onChangeText={(text) => setOldPassword(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="New Password"
                secureTextEntry
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm New Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
            />
            <Button title="Change Password" onPress={handleChangePassword} />

            {/* Back to Chat Button */}
            <Button
                title="Go back to Chat"
                onPress={() => nav.navigate('LoginPage')}
            />
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
export default SettingsPage
