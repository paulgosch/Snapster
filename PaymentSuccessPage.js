import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ImageBackground, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Pages, Colors, Fonts } from './constants';

const backgroundImageSource = require('./assets/Background.jpg');
const ImageSource = require('./assets/JumpingPeople.jpg');
const BG_lines_upSource = require('./assets/BG_lines.png');

export default function PaymentSuccessPage() {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.navigate(Pages.HomeScreen); // Navigate to Homescreen.js
  };

  return (
    <ImageBackground source={backgroundImageSource} style={styles.backgroundImage}>
      <ImageBackground source={BG_lines_upSource} style={styles.BG_lines} />
      <View style={styles.container}>
        <Text style={styles.title}>Payment Success!</Text> 
        <Image source={ImageSource} style={styles.jumpingPeople} />
        <View style={styles.containerTitle}>
          <Text style={styles.successText}>Your purchase was successful!</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleGoBack}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  containerTitle: {
    width: '100%', // Adjust the width as needed
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 40,
    marginVertical: 10,
    fontWeight: 'bold',
    color: Colors.PrimaryColor,
    textAlign: 'center',
    fontFamily: Fonts.Title,
  },
  successText: {
    fontSize: 20,
    color: Colors.PrimaryColor,
    textAlign: 'center',
    fontFamily: Fonts.BodyText,
  },
  button: {
    borderWidth: 1,
    borderColor: '#2A4D69',
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: '#2A4D69',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: Fonts.Button,
    textAlign: 'center',
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
  jumpingPeople: {
    borderRadius: 8,
    width: 300, // Adjust width as needed
    height: 200, // Adjust height as needed
    marginBottom: 20, // Adjust margin as needed
  },
});