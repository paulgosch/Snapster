import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { Pages, Colors, Fonts } from '../constants';

const backgroundImageSource = require('.././assets/Background.jpg');
const cameraImageSource = require('.././assets/Camera_.png');
const customFont = require('.././assets/Neucha-Regular.otf');
const BG_linesSource = require('.././assets/BG_lines.png');

export default function WelcomePage() {
  const navigation = useNavigation();

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

  const handleLoginPress = () => {
    navigation.navigate(Pages.LoginPage);
  };

  const handleRegisterPress = () => {
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
    color: '#2A4D69',
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
    marginBottom: 20,
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
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: Fonts.Button,
    textAlign: 'center',
  },
  titleImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginTop: -50,
  },
  BG_lines: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  inputContainer: {
    backgroundColor: '#E2CAAE',
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