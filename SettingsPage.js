import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Pages } from './constants';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const backgroundImageSource = require('./assets/Background.jpg');

export default function SettingsPage() {
  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(false);
  const { userName, email, fullName, address, userBundle } = useSelector((state) => state.user);
  const navigation = useNavigation();
  useEffect(() => {
    loadSoundEffectsSetting();
  }, []);

  const loadSoundEffectsSetting = async () => {
    try {
      const value = await AsyncStorage.getItem('soundEffectsEnabled');
      if (value !== null) {
        setSoundEffectsEnabled(value === 'true');
      }
    } catch (error) {
      console.error('Error loading sound effects setting:', error);
    }
  };

  const saveSoundEffectsSetting = async (value) => {
    try {
      await AsyncStorage.setItem('soundEffectsEnabled', value.toString());
    } catch (error) {
      console.error('Error saving sound effects setting:', error);
    }
  };

  const handleSoundsChange = async (value) => {
    try {
      await AsyncStorage.setItem('soundEffectsEnabled', value.toString());
    } catch (error) {
      console.error('Error saving sound effects setting:', error);
    }

    setSoundEffectsEnabled(value);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSupportPage = () => {
    navigation.navigate(Pages.SupportPage);
  };

  const handlePrivacyPolicyPage = () => {
    navigation.navigate(Pages.PrivacyPolicyPage);
  };

  const handleTermsAndConditions = () => {
    navigation.navigate(Pages.TermsAndConditions);
  };

  const handleLogout = () => {
    navigation.navigate(Pages.WelcomePage);
  };

  const handleNotificationChange = (value) => {
    // Implement logic to toggle notification settings
  };

  const handleChangeFullName = () => {
    // Implement logic to navigate to the screen where the user can change their full name
  };

  const handleChangePassword = () => {
    // Implement logic to change the password
  };

  const handleSettings = () => {
    navigation.navigate(Pages.HomeScreen, { soundEffectsEnabled });
  };

  return (
    <ImageBackground source={backgroundImageSource} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <FeatherIcon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.settingContainer}>
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Enable Notifications</Text>
            <Switch
              value={false}
              onValueChange={handleNotificationChange}
            />
          </View>
        </View>

        <View style={styles.settingContainer}>
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Mute Sounds</Text>
            <Switch
              value={soundEffectsEnabled}
              onValueChange={handleSoundsChange}
            />
          </View>
        </View>

        <View style={styles.accountContainer}>
          <Text style={styles.accountHeaderText}>My Account</Text>
          <View style={styles.accountDetails}>
            <View style={styles.accountRow}>
              <Text style={[styles.accountText, styles.accountLabel]}>Name:</Text>
              <Text style={[styles.accountTextGrey, styles.accountValue]}>{fullName}</Text>
              <TouchableOpacity onPress={handleChangeFullName}>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.accountRow}>
              <Text style={[styles.accountText, styles.accountLabel]}>Password:</Text>
              <Text style={[styles.accountTextGrey, styles.accountValue]}>********</Text>
              <TouchableOpacity onPress={handleChangePassword}>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.accountRow}>
              <Text style={[styles.accountText, styles.accountLabel]}>Username:</Text>
              <Text style={[styles.accountTextGrey, styles.accountValue]}>{userName}</Text>
            </View>

            <View style={styles.accountRow}>
              <Text style={[styles.accountText, styles.accountLabel]}>Email:</Text>
              <Text style={[styles.accountTextGrey, styles.accountValue]}>{email}</Text>
            </View>

            <View style={styles.accountRow}>
              <Text style={[styles.accountText, styles.accountLabel]}>My Bundle:</Text>
              <Text style={[styles.accountTextGrey, styles.accountValue]}>Basic Bundle {userBundle}</Text>
            </View>

            <Text style={styles.accountText}>Pictures left: 3/27</Text>
            <Text style={styles.accountText}>Address: {address}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.buttonTextWhite}>Log out</Text>
        </TouchableOpacity>

        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={handleTermsAndConditions}>
            <Text style={styles.bottomText}>Terms & Conditions</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePrivacyPolicyPage}>
            <Text style={styles.bottomText}>Privacy Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSupportPage}>
            <Text style={styles.bottomText}>Q&A + Support</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    color: 'white',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'rgba(8,77,136,255)',
  },
  settingContainer: {
    width: '90%',
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    backgroundColor: 'white',
  },
  settingText: {
    fontSize: 18,
    color: 'rgba(8,77,136,255)',
  },
  accountContainer: {
    width: '90%', // Adjust the width as needed
    marginVertical: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    
  },
  accountHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(8,77,136,255)',
    marginBottom: 10,
  },
  accountText: {
    fontSize: 16,
    color: 'rgba(8,77,136,255)',
    marginBottom: 5,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonTextWhite: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  bottomText: {
    fontFamily: 'neucha-regular',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 2,
    textDecorationLine: 'underline',
    textDecorationStyle: 'dotted',
  },
  changeText: {
    color: 'grey',
    textDecorationLine: 'underline',
  },
  accountDetails: {
    marginBottom: 10,
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    width: '100%',
  },
  accountLabel: {
    flex: 1,
    fontSize: 16,
    color: 'rgba(8,77,136,255)',
  },
  accountValue: {
    flex: 2,
    fontSize: 16,
    color: 'grey',
  },
});