import React from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Font from 'expo-font';
import { Pages, Colors } from './constants';

const backgroundImageSource = require('./assets/Background.jpg');
const customFont = require('./assets/Neucha-Regular.otf');

export default function FirstScreen({ navigation }) {
  const handleScreenPress = () => {
    navigation.navigate(Pages.WelcomePage);
  };

  return (
    <ImageBackground source={backgroundImageSource} style={styles.backgroundImage}>
      <TouchableOpacity onPress={handleScreenPress} style={styles.container}>
        <View style={styles.upperHalf}>
          <Icon name="camera" size={36} color="black" style={styles.cameraIcon} />
          <Text style={styles.title}>Snapster</Text>
        </View>
      </TouchableOpacity>
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
  },
  upperHalf: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    marginBottom: 5,
    color: 'white',
  },
  title: {
    fontFamily: 'neucha-regular', // Apply the custom font
    fontSize: 50,
    fontWeight: 'bold',
    color: Colors.PrimaryColor,
  },
});