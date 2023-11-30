import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../config/colors';
import UserContext from '../../Global/UserContext';

const SettingsPage = () => {
    const nav = useNavigation();
    const { setUser, user } = useContext(UserContext);

    const handleLogout = () => {
        if (user.out === 2) {
            nav.navigate('LoginPage2');
        } else if (user.out === 3) {
            nav.navigate('LoginPage3');
        } else {
            nav.navigate('LoginPage');
        }
    };

    const goBack = () => {
        nav.goBack();
    };

    return (
        <View style={[styles.container, { backgroundColor: user.isDarkMode ? colors.secondary : '#333' }]}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={goBack}>
                    <Icon name="arrow-back" style={styles.headerIcon} size={styles.icons.size} color={user.isDarkMode ? colors.primary : colors.secondary} />
                </TouchableOpacity>
                <Text style={[styles.header, { color: user.isDarkMode ? colors.primary : colors.secondary }]}>Settings</Text>
            </View>

            <View style={styles.settingsContainer}>
                <TouchableOpacity style={styles.settingItem} onPress={() => nav.navigate('ProfileSettings')}>
                    <Icon name="account-circle" style={styles.headerIcon} size={styles.icons.size} color={user.isDarkMode ? colors.primary : colors.secondary} />
                    <Text style={[styles.settingItemText, { color: user.isDarkMode ? colors.primary : colors.secondary }]}>Profile Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingItem} onPress={() => nav.navigate('PasswordSettings')}>
                    <Icon name="lock" style={styles.headerIcon} size={styles.icons.size} color={user.isDarkMode ? colors.primary : colors.secondary} />
                    <Text style={[styles.settingItemText, { color: user.isDarkMode ? colors.primary : colors.secondary }]}>Password Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingItem} onPress={() => nav.navigate('LockScreenStyles')}>
                    <Icon name="stay-current-portrait" style={styles.headerIcon} size={styles.icons.size} color={user.isDarkMode ? colors.primary : colors.secondary} />
                    <Text style={[styles.settingItemText, { color: user.isDarkMode ? colors.primary : colors.secondary }]}>Lock Screen Settings</Text>
                </TouchableOpacity>
                <Button title="Logout" onPress={handleLogout} color={user.isDarkMode ? colors.primary : 'grey'} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    icons: {
        size: 40,
    },
    container: {
        flex: 1,
        padding: 16,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    headerIcon: {
        marginRight: 20,
    },
    header: {
        fontSize: 25,
        fontWeight: 'bold',
        color: colors.secondary,
    },
    settingsContainer: {
        marginTop: 20,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        paddingVertical: 15,
    },
    settingItemText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.secondary,
    },
});

export default SettingsPage;
