import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';

const backgroundImageSource = require('./assets/Background.jpg');
const customFont = require('./assets/Neucha-Regular.otf');

export default function AppPresentationScreen3() {
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
    navigation.navigate('Home');
  };

  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={handleNextScreen}>
      <ImageBackground source={backgroundImageSource} style={styles.backgroundImage} resizeMode="cover">
        <View style={styles.container}>
          <Text style={styles.title}>Step 3: Delivery to Your Doorstep</Text>
          <Text style={styles.text}>Sit back and relax once you've taken all your pictures, as we take care of delivering your personalized prints right to your doorstep.</Text>
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
});