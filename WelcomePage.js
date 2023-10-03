import React, { useEffect, useState } from 'react'; // Import useState here
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground,Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { Pages, Colors, Fonts } from './constants';

const backgroundImageSource = require('./assets/Background.jpg');
const cameraImageSource = require('./assets/Camera_.png');
const customFont = require('./assets/Neucha-Regular.otf');
const BG_linesSource = require('./assets/BG_lines.png');

export default function WelcomePage() {
  // ... your existing code ...
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'neucha-regular': customFont,
      });
      setFontLoaded(true);
    }
    loadFont();
  }, []);

  if (!fontLoaded) {
    // Wait for the font to load
    return null;
  }

  const navigation = useNavigation();

  const handleLoginPress = () => {
    // Code to navigate to the login page
    navigation.navigate(Pages.LoginPage);
  };

  const handleRegisterPress = () => {
    // Code to navigate to the register page
    navigation.navigate(Pages.RegisterPage);
  };
  return (
    <ImageBackground source={backgroundImageSource} style={styles.backgroundImage}>
      <Image source={BG_linesSource} style={styles.BG_lines} />
      <View style={styles.container}>
        <Text style={styles.title}>Snapster</Text>
        <Image source={cameraImageSource} style={styles.titleImage} />
        <View style={styles.whiteShadowContainer}>
          <View style={styles.divider} />
          <Text style={styles.middle}>Ready to bring your digital photos</Text>
          <Text style={styles.middle}>to life?</Text>
          <View style={styles.divider} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleRegisterPress}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  middle: {
    fontFamily: Fonts.BodyText,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#2A4D69',  // Changed color to blue
    padding: 2,
    alignSelf: "center",
  },
  whiteShadowContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,  // Added some space below the container
  },
  title: {
    fontFamily: Fonts.Title,
    fontSize: 60,
    fontWeight: 'bold',
    color: Colors.PrimaryColor,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperHalf: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerHalf: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    marginBottom: 5,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderColor: '#2A4D69',
    backgroundColor: '#2A4D69',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  buttonText: {
    color: 'white', // Change text color to white
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: Fonts.Button,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',  // Distribute the space between items
    alignItems: 'center',
    paddingVertical: 50,  // Add some padding to top and bottom
  },
  titleImage: {
    width: 150,  // You can adjust this as needed
    height: 150, // You can adjust this as needed
    resizeMode: 'contain', // This will ensure the image fits within the dimensions provided
    marginTop: -50,  // Adjust this value to move the camera image up a bit
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
  inputContainer: {
    backgroundColor: '#E2CAAE', // Assuming you have a color defined for this in the Colors constant
    padding: 0,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2CAAE',
    marginVertical: 10,
    alignSelf: 'stretch',
  },

});