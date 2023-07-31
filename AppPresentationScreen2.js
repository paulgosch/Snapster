import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { Pages } from './constants';

const backgroundImageSource = require('./assets/Background.jpg');
const customFont = require('./assets/Neucha-Regular.otf');

export default function AppPresentationScreen2() {
  const [fontLoaded, setFontLoaded] = React.useState(false);
  const navigation = useNavigation(); // Use the useNavigation hook here

  React.useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'neucha-regular': customFont,
      });
      setFontLoaded(true);
    }
    loadFont();
  }, []);

  if (!fontLoaded) {
    return null; // Wait for the font to load
  }

  const handleNextScreen = () => {
    navigation.navigate('AppPresentation3');
  };

  const handleSkip = () => {
    navigation.navigate('HomeScreen'); // Direct to HomePage when "Skip" is pressed
  };

  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={handleNextScreen}>
      <ImageBackground source={backgroundImageSource} style={styles.backgroundImage} resizeMode="cover">
        <View style={styles.container}>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Step 2: Transform Digital to Tangible </Text>
          <Text style={styles.text}>Say goodbye to digital albums as we transform your photo into a stunning hardcopy print.</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
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
  title: {
    fontFamily: 'neucha-regular', // Apply the custom font
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontFamily: 'neucha-regular',
    color: 'white', // You can adjust the text color as needed
  },
  skipButton: {
    position: 'absolute',
    fontFamily: 'neucha-regular',
    top: 40,
    right: 20,
  },
  skipText: {
    fontSize: 18,
    fontFamily: 'neucha-regular',
    color: 'white',
    fontWeight: 'bold',
    marginTop: 15,
    marginRight: 15,
  },
});