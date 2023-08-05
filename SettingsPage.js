import React from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, ImageBackground, Icon } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Pages } from './constants';
import FeatherIcon from 'react-native-vector-icons/Feather';

const backgroundImageSource = require('./assets/Background.jpg');

export default function SettingsPage() {
  const navigation = useNavigation();

  const handleBack = () => {
    // Navigate back to the HomeScreen
    navigation.goBack();
  };

  const handlePrivacyPolicyPage = () => {
    navigation.navigate(Pages.PrivacyPolicyPage); // Navigate to the 'PrivacyPolicyPage'
  };

  const handleTermsAndConditions = () => {
    navigation.navigate(Pages.TermsAndConditions); // Navigate to the 'TermsAndConditions' screen
  };

  const handleLogout = () => {
    // Implement any necessary logout logic here
    // For now, let's just navigate to the WelcomePage
    navigation.navigate(Pages.WelcomePage);
  };

  const handleNotificationChange = (value) => {
    // Implement logic to toggle notification settings
  };

  const handleSoundsChange = (value) => {
  };

  return (
    <ImageBackground source={backgroundImageSource} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <FeatherIcon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.settingContainer}>
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Enable Notifications</Text>
            <Switch
              value={false} // Pass the actual state of notifications
              onValueChange={handleNotificationChange}
            />
          </View>
        </View>

        <View style={styles.settingContainer}>
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Sound Effects</Text>
            <Switch
              value={false}
              onValueChange={handleSoundsChange}
            />
          </View>
        </View>


        <View style={styles.accountContainer}>
          <Text style={styles.accountHeaderText}> My Account: </Text>
          <Text style={styles.accountText}> Name: John Doe </Text>
          <Text style={styles.accountText}> Username: johndoe123 </Text>
          <Text style={styles.accountText}> Email: john@example.com </Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={[styles.buttonText, styles.buttonTextWhite]}>Log out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={handleTermsAndConditions}>
            <Text style={[styles.bottomText]}>Terms & Conditions</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePrivacyPolicyPage}>
            <Text style={[styles.bottomText]}>Privacy Policy</Text>
          </TouchableOpacity>
        
          <TouchableOpacity onPress={handlePrivacyPolicyPage}>
            <Text style={[styles.bottomText]}>Support</Text>
          </TouchableOpacity>

          
          {/* Add more settings options as needed */}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // White transparent background
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
    color: 'white', // Set the icon color to white
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  settingContainer: {
    width: '90%',
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingRow: {
    flexDirection: 'row', // Align items horizontally
    justifyContent: 'space-between', // Align items at both ends of the row
    alignItems: 'center', // Center items vertically in the row
  },
  settingText: {
    fontSize: 18,
    color: 'white',
  },
  buttonText: {
    fontSize: 18,
  },
  buttonTextWhite: {
    color: 'white', // Set the text color to white
    fontWeight: 'bold',
    paddingTop: 10,
  },
  accountContainer: {
    width: '90%',
    marginVertical: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  accountHeaderText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  accountText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
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
});