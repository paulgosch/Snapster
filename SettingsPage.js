import React from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { Pages } from './constants';

const backgroundImageSource = require('./assets/Background.jpg');

export default function SettingsPage() {
  const navigation = useNavigation(); // Use the useNavigation hook here

  const handleBack = () => {
    // Navigate back to the HomeScreen
    navigation.goBack();
  };

  const handleLogout = () => {
    // Implement any necessary logout logic here
    // For now, let's just navigate to the WelcomePage
    navigation.navigate(Pages.WelcomePage);
  };

  const handleNotificationChange = (value) => {
    // Implement logic to toggle notification settings
  };

  const handleDarkModeChange = (value) => {
    // Implement logic to toggle dark mode settings
  };

  return (
    <ImageBackground source={backgroundImageSource} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Icon name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.settingContainer}>
          <Text style={styles.settingText}>Enable Notifications</Text>
          <Switch
            value={false} // Pass the actual state of notifications
            onValueChange={handleNotificationChange}
          />
        </View>
        <View style={styles.settingContainer}>
          <Text style={styles.settingText}>Dark Mode</Text>
          <Switch
            value={false} // Pass the actual state of dark mode
            onValueChange={handleDarkModeChange}
          />
        </View>
        <TouchableOpacity style={[styles.logoutButton, styles.logoutButton]} onPress={handleLogout}>
        <Text style={[styles.buttonText, styles.buttonTextWhite]}>log out</Text>
        </TouchableOpacity>
        {/* Add more settings options as needed */}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    padding: 10, 
    color: 'white', // Set the icon color to white
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white'
  },
  settingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'white', // Change the border color to white
    borderRadius: 4, // Set the border radius for rounded corners, same as the logout button
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // White transparent background, same as the logout button
  },
  settingText: {
    fontSize: 18,
    color: 'white', // Set the text color to white, same as the logout button
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // White transparent background
    borderWidth: 1,
    borderColor: 'white', // Change the logout button border color to white
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  settingsButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // White transparent background
    borderWidth: 1,
    borderColor: 'white', // Change the button border color to white
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 18,
  },
  buttonTextWhite: {
    color: 'white', // Set the text color to white
  },
});