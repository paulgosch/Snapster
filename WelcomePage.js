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
        <View style={styles.upperHalf}>
          <Text style={styles.title}>Snapster</Text>
        </View>
        <Image source={cameraImageSource} style={styles.titleImage} />
        <View style={styles.inputContainer}>
        <Text style={styles.middle}>Ready to bring your digital photos</Text>
        <Text style={styles.middle}>to life?</Text>
        </View>
        <View style={styles.lowerHalf}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleRegisterPress}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
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
    color: 'white',
    Top: 100,
    padding: 2,
    alignSelf: "center",
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
  },

  buttonText: {
    color: 'white', // Change text color to white
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: Fonts.Button,
    textAlign: 'center',
  },
  titleImage: {
    width: 150,  // You can adjust this as needed
    height: 150, // You can adjust this as needed
    resizeMode: 'contain', // This will ensure the image fits within the dimensions provided
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

});