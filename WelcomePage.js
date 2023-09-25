import React, { useEffect, useState } from 'react'; // Import useState here
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { Pages, Colors, Fonts } from './constants';

const backgroundImageSource = require('./assets/Background.jpg');
const customFont = require('./assets/Neucha-Regular.otf');


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
        <View style={styles.container}>
          <View style={styles.upperHalf}>
            <Icon name="camera" size={36} color="black" style={styles.cameraIcon} />
            <Text style={styles.title}>Snapster</Text>
          </View>
          <Text style={styles.middle}>Ready to bring your digital photos</Text>
          <Text style={styles.middle}>to life?</Text>
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
    middle:{   
    fontFamily: Fonts.BodyText,
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.PrimaryColor,
    },
    title: {
      fontFamily: Fonts.Title,
      fontSize: 50,
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
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // White transparent background
    borderWidth: 1,
    borderColor: 'white', // Change the button border color to white
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

});