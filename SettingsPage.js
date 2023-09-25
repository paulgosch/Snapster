import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Pages, Colors, Fonts } from './constants';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';

const backgroundImageSource = require('./assets/Background.jpg');

export default function SettingsPage() {
  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(false);
  const { userName, email, fullName, address, userBundle } = useSelector((state) => state.user);
  const navigation = useNavigation();
  useEffect(() => {
    loadSoundEffectsSetting();
  }, []);

  const loadSoundEffectsSetting = async () => {
   
  };

  const saveSoundEffectsSetting = async (value) => {

  };

  const handlePaymentMethodPage = () => {
    navigation.navigate(Pages.PaymentMethodPage);
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
  const handleRateApp = () => {
    // Implement the function to navigate to the app store page
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

  const handleNotificationChange = () => {
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

  const handleAccountPage = () => {
    navigation.navigate('AccountPage'); // Navigate to AccountPage when My Account is clicked
  };

  return (
    <ImageBackground source={backgroundImageSource} style={styles.container}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <FeatherIcon name="arrow-left" size={24} color={Colors.PrimaryColor} />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.settingContainer}>
        <View style={styles.settingRow}>
        <FeatherIcon name="bell" size={24} color="grey" style={{ marginRight: 10 }} /> 
          <Text style={styles.settingText}>Notifications</Text>
          <Switch
              value={false}
              onValueChange={handleNotificationChange}
            />
          </View>
        </View>

        <View style={styles.settingContainer}>
        <View style={styles.settingRow}>
        <FeatherIcon name="volume-1" size={24} color="grey" style={{ marginRight: 10 }} /> 
            <Text style={styles.settingText}>Sounds</Text>
            <Switch
              value={soundEffectsEnabled}
              onValueChange={handleSoundsChange}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAccountPage}>
        <View style={styles.buttonContent}>
        <FeatherIcon name="credit-card" size={24} color="white" style={{ marginRight: 10 }} /> 
          <Text style={styles.accountHeaderText}>My Account</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handlePaymentMethodPage}>
        <View style={styles.buttonContent}>
        <FeatherIcon name="user" size={24} color="white" style={{ marginRight: 10 }} />
          <Text style={styles.buttonText}>Payment Method</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={handleRateApp}>
       <View style={styles.buttonContent}>
        <FeatherIcon name="star" size={24} color="white" style={{ marginRight: 10 }} />
        <Text style={styles.buttonText}>Rate this App</Text>
       </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.accountContainer} onPress={handleLogout}>
        <View style={styles.buttonContent}>
        <FeatherIcon name="log-out" size={24} color="white" style={{ marginRight: 10 }} />
          <Text style={styles.buttonText}>Log out</Text>
          </View>
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
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    alignSelf: 'center',
    fontFamily: Fonts.Title,
  },
  settingContainer: {
    width: '100%',
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
    color: 'grey',
    fontFamily: Fonts.Subtitle,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accountContainer: {
    width: '50%',
    marginVertical: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountHeaderText: {
    fontSize: 18,
    color: 'white',
    fontFamily: Fonts.Subtitle,
  },
  button: {
    width: '100%',
    marginVertical: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontFamily: Fonts.Button,
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
    color: Colors.PrimaryColor,
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 2,
    textDecorationLine: 'underline',
    textDecorationStyle: 'dotted',
    fontFamily: Fonts.Footer,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});