import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, Image } from 'react-native';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { Pages, Colors, Fonts } from './constants';

const backgroundImageSource = require('./assets/Background.jpg');
const customFont = require('./assets/Neucha-Regular.otf');
const { width } = Dimensions.get('window');
const photoofgirl = require('./assets/photoofgirl.png');
const houseImage = require('./assets/photoofhouse.png');
const deliveryImage = require('./assets/photoofdelivery.png');

export default function AppPresentationScreen() {
  const [fontLoaded, setFontLoaded] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(0);
  const navigation = useNavigation();

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
    return null;
  }

  const steps = [
    {
      title: 'Step 1: Capture the Moment',
      text: 'Sign up, choose a bundle, snap a picture, and preserve precious moments with a simple click.',
      image: photoofgirl,
    },
    {
      title: 'Step 2: Transform Digital to Tangible',
      text: 'Say goodbye to digital albums as we transform your photo into a stunning hardcopy print.',
      image: houseImage,
    },
    {
      title: 'Step 3: Delivery to Your Doorstep',
      text: 'Sit back and relax once you\'ve taken all your pictures, as we take care of delivering your personalized prints right to your doorstep.',
      image: deliveryImage,
    },
  ];

  const handleNextScreen = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.navigate(Pages.HomeScreen);
    }
  };

  const handleSkip = () => {
    navigation.navigate(Pages.HomeScreen);
  };

  return (
    <ImageBackground source={backgroundImageSource} style={styles.backgroundImage} resizeMode="cover">
      <View style={styles.container}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <View style={styles.imageContainer}>
          <Image source={steps[currentStep].image} style={styles.image} resizeMode="contain" />
        </View>

        <Text style={styles.text}>{steps[currentStep].text}</Text>
        <Text style={styles.title}>{steps[currentStep].title}</Text>

        <View style={styles.dotsContainer}>
          {steps.map((_, index) => (
            <View key={index} style={[styles.dot, currentStep === index && styles.dotActive]} />
          ))}
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleNextScreen}>
          <Text style={styles.nextButtonText}>Next</Text>
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
  title: {
    fontFamily: Fonts.Title,
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.PrimaryColor,
    marginBottom: 20,
    marginTop: 15,
    top: 70,
  },
  text: {
    fontSize: 20,
    fontFamily: 'neucha-regular',
    color: Colors.PrimaryColor,
    marginBottom: 20,
    top: 70,
    textAlign: 'center',
    fontFamily: Fonts.BodyText,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 40,
  },
  skipText: {
    fontSize: 18,
    fontFamily: 'neucha-regular',
    color: Colors.PrimaryColor,
    fontWeight: 'bold',
    fontFamily: Fonts.Button,
  },
  nextButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    top: 120,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  nextButtonText: {
    color: Colors.PrimaryColor,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Fonts.Button,
  },
  dotsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 280,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 3,
  },
  dotActive: {
    backgroundColor: 'white',
  },
  imageContainer: {
    position: 'absolute',
    top: 50, // Adjust the positioning as needed
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoofgirl: {
    width: width * 1, // Adjust the size as needed
    height: width * 1.2, // Maintain aspect ratio
    marginBottom: 30,
  },
  image: {
    width: width * 1, // Adjust the size as needed
    height: width * 1.2, // Maintain aspect ratio
    marginBottom: 30,
  },
});