import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, ImageBackground, Linking, Alert,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Pages, Colors, Fonts } from './constants';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const backgroundImageSource = require('./assets/Background.jpg');
const appleStoreURL = "https://apps.apple.com/us/app/facebook/id284882215"; // Example link for the Facebook app on the App Store
const googlePlayURL = "https://play.google.com/store/apps/details?id=com.facebook.katana"; // Example link for the Facebook app on Google Play


export default function SettingsPage() {
  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(false);
  const { userName, email, fullName, address, userBundle } = useSelector((state) => state.user);
  const navigation = useNavigation();
  useEffect(() => {
    loadSoundEffectsSetting();
  }, []);

  const loadSoundEffectsSetting = async () => {

  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleRateApp = () => {
    Alert.alert(
      "Rate this App",
      "Choose a store to rate the app:",
      [
        {
          text: "🍏 Apple App Store",
          onPress: () => Linking.openURL(appleStoreURL).catch(err => console.error("Couldn't load App Store page", err))
        },
        {
          text: "▶️ Google Play Store",
          onPress: () => Linking.openURL(googlePlayURL).catch(err => console.error("Couldn't load Google Play Store page", err))
        },
        {
          text: "Cancel",
          style: "cancel"
        }
      ],
      { cancelable: true }
    );
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

  const handleInstagramRedirect = () => {
    // You can use Linking from react-native to open the Instagram app or browser
    const instagramURL = "https://www.instagram.com/snapsterstudios/?hl=de";
    Linking.openURL(instagramURL).catch(err => console.error("Couldn't load Instagram page", err));
  };

  const BG_linesSource = require('./assets/BG_lines.png');

  return (
    <ImageBackground source={backgroundImageSource} style={styles.container}>
      <Image source={BG_linesSource} style={styles.BG_lines} />
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <FeatherIcon name="arrow-left" size={24} color={Colors.PrimaryColor} />
        </TouchableOpacity>
        <View style={styles.topContainer}>
        <Text style={styles.title}>Settings</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleAccountPage}>
          <View style={styles.buttonContent}>
            <FeatherIcon name="user" size={24} color="white" style={{ marginRight: 10 }} />
            <Text style={styles.accountHeaderText}>My Account</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSupportPage}>
          <View style={styles.buttonContent}>
            <FeatherIcon name="book-open" size={24} color="white" style={{ marginRight: 10 }} />
            <Text style={styles.buttonText}>About Snapster </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleRateApp}>
          <View style={styles.buttonContent}>
            <FeatherIcon name="star" size={24} color="white" style={{ marginRight: 10 }} />
            <Text style={styles.buttonText}>Rate this App </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleInstagramRedirect}>
          <View style={styles.buttonContent}>
            <AntDesignIcon name="instagram" size={24} color="white" style={{ marginRight: 10 }} />
            <Text style={styles.buttonText}>Follow us on Instagram</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
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
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
  },
  title: {
    fontSize: 42, // Increased font size
    fontWeight: 'bold',
    color: '#2A4D69',
    alignSelf: 'center',
    fontFamily: Fonts.Title,
    textShadowColor: 'rgba(255, 255, 255, 0.75)', // White text shadow
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    letterSpacing: 2, // Increased letter spacing
  },
  settingContainer: {
    width: '100%',
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#2A4D69',
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
  accountHeaderText: {
    fontSize: 18,
    color: 'white',
    fontFamily: Fonts.Subtitle,
  },
  button: {
    width: '85%',
    marginVertical: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: '#2A4D69',
    borderRadius: 8,
    backgroundColor: '#2A4D69', // Assuming you have a color defined for this in the Colors constant
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontFamily: Fonts.Button,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: '5%',
    alignSelf: 'center', // Center the container horizontally
    padding: 2,
    backgroundColor: '#E2CAAE',
    width: '40%',       // Set the width to 40% of the screen width
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomText: {
    color: 'white',
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
  BG_lines: {
    position: 'absolute', // Absolute position
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Cover the entire screen
  },
  topContainer: {
    alignSelf: 'center', // Center the container horizontally
    backgroundColor: '#E2CAAE',
    width: '42%',       // Set the width to 40% of the screen width
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
});