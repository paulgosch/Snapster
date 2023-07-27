import React, { useEffect, useState } from 'react'; // Import useState here
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Font from 'expo-font';

const backgroundImageSource = require('./assets/Background.jpg');
const customFont = require('./assets/Neucha-Regular.otf');

const handleLoginPress = () => {
  // Code to navigate to the login page
};

const handleRegisterPress = () => {
  // Code to navigate to the register page
};


  export default function App() {
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
  
  
    return (
      <ImageBackground source={backgroundImageSource} style={styles.backgroundImage}>
        <View style={styles.container}>
          <View style={styles.upperHalf}>
            <Icon name="camera" size={36} color="black" style={styles.cameraIcon} />
            <Text style={styles.title}>Snapster</Text>
          </View>
          <Text style={styles.middle}>you better know it</Text>
          <View style={styles.lowerHalf}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleRegisterPress}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>Terms and Conditions</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
  

  const styles = StyleSheet.create({
    middle:{   fontFamily: 'neucha-regular', // this is ust for fun
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    },
    title: {
      fontFamily: 'neucha-regular', // Apply the custom font
      fontSize: 50,
      fontWeight: 'bold',
      color: 'white',
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
    marginLeft: 10,
    marginRight: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white', // Change text color to white
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'neucha-regular',
    textAlign: 'center',
  },
  termsContainer: {
    position: 'absolute',
    bottom: 40,
  },
  termsText: {
    fontSize: 18,
    fontFamily: 'neucha-regular',
    color: 'white',
    textDecorationLine: 'underline',
  },
});