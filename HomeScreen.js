import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Vibration } from 'react-native';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; // Import the Feather component
import { Camera } from 'expo-camera';
import { Pages } from './constants';
import { useSelector } from 'react-redux';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from './firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { TapGestureHandler, State } from 'react-native-gesture-handler';

const customFont = require('./assets/Neucha-Regular.otf');
const backgroundImageSource = require('./assets/Background.jpg');

export default function HomeScreen({ route }) {
  const [fontLoaded, setFontLoaded] = React.useState(false);
  const [type, setType] = React.useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = React.useState(null);
  const [cameraRef, setCameraRef] = React.useState(null);
  const navigation = useNavigation(); // Use the useNavigation hook here
  const { userName } = useSelector((state) => state.user);

  const toggleCameraType = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const [flashMode, setFlashMode] = React.useState(Camera.Constants.FlashMode.off);

  const toggleFlashMode = () => {
    setFlashMode(
      flashMode === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.on
        : Camera.Constants.FlashMode.off
    );
  };
  
  const [timer, setTimer] = useState(10); // Initial timer value is 10 seconds
  const [isTimerActive, setIsTimerActive] = useState(false);

  // New state variable for countdown text
  const [countdownText, setCountdownText] = useState('');

  // Updated sound effects logic
  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(true); // Initialize as true or as needed

  useEffect(() => {
    // Retrieve the sound effects setting from AsyncStorage
    async function loadSoundEffectsSetting() {
      try {
        const value = await AsyncStorage.getItem('soundEffectsEnabled');
        if (value !== null) {
          setSoundEffectsEnabled(value === 'true');
        }
      } catch (error) {
        console.error('Error loading sound effects setting:', error);
      }
    }
  
    loadSoundEffectsSetting();
  }, []);

  useEffect(() => {
    // Start the countdown when the timer is active
    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    // When the timer reaches 0, take a photo and reset the timer
    if (timer === 0) {
      takePicture();
      setTimer(10); // Reset the timer to 10 seconds
      setIsTimerActive(false); // Disable the timer
    }

    // Clean up the interval when component unmounts or timer is inactive
    return () => clearInterval(interval);
  }, [timer, isTimerActive]);

  const startTimer = () => {
    // Start the timer when the button is pressed
    setIsTimerActive(true);

    // Set the initial countdown text
    setCountdownText('10');
  };

  React.useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'neucha-regular': customFont,
      });
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      setFontLoaded(true);
    }
    loadFont();
  }, []);

  if (!fontLoaded) {
    return null; // Wait for the font to load
  }
  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleSettings = () => {
    navigation.navigate(Pages.SettingsPage);
  };
  const handleStore = () => {
    navigation.navigate(Pages.StorePage);
  };

  // Updated sound effects logic
  const playSoundEffect = () => {
    if (soundEffectsEnabled) {
      // Implement the logic to play the sound effect here
    }
  };

  const takePicture = async () => {
    if (cameraRef) {
      console.log('Taking picture...');
      try {
        let photo = await cameraRef.takePictureAsync();
        const fetchRep = await fetch(photo.uri);
        const theBlob = await fetchRep.blob();

        console.log('photo', photo);
        console.log('photo uri: ', photo.uri);
        uploadBytesResumable(
          ref(storage, 'images/' + photo.uri.substring(photo.uri.lastIndexOf('/') + 1)),
          theBlob
        ).then((snapshot) => {
          console.log('Success!');
          console.log(snapshot.metadata);

          // Play the sound effect when the picture is taken
          playSoundEffect();
        });
      } catch (error) {
        console.error('Error taking picture:', error); // Log error if something goes wrong
      }
    } else {
      console.log('Camera reference is not set'); // Log if cameraRef is not set
    }
  };

  return (
    <ImageBackground source={backgroundImageSource} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.headerTop}>
          {/* Title "Snapster" and "3/27" */}
          <Text style={styles.title}> Snapster </Text>
          <Text style={styles.progressText}>3/27</Text>
          <TouchableOpacity style={styles.flashButton} onPress={toggleFlashMode}>
            <Feather
              name={flashMode === Camera.Constants.FlashMode.off ? 'zap-off' : 'zap'}
              size={24}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cameraSwitchButton} onPress={toggleCameraType}>
            <Feather name="rotate-cw" size={24} color="white" />
          </TouchableOpacity>

          {/* Render countdown text when timer is active */}
          {isTimerActive ? (
            <Text style={styles.timerText}>{countdownText}</Text>
          ) : (
            <TouchableOpacity style={styles.timerButton} onPress={startTimer}>
              <Feather name="clock" size={24} color={isTimerActive ? 'red' : 'white'} />
            </TouchableOpacity>
          )}
        </View>


        {/* Move the camera container slightly up */}
        <View style={[styles.cameraContainer, styles.cameraBorderRadius]}>
          <Camera flashMode={flashMode}
            style={styles.camera}
            type={type}
            ref={(ref) => setCameraRef(ref)}
          />
        </View>

        <View style={styles.headerBottom}>
          {/* Move the settings icon to the bottom right corner */}
          <TouchableOpacity style={styles.settingsButton} onPress={handleSettings}>
            <Feather name="settings" size={24} color="white" />
          </TouchableOpacity>

          {/* Move the shopping cart icon to the bottom left corner */}
          <TouchableOpacity style={styles.storeButton} onPress={handleStore}>
            <Feather name="shopping-cart" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Move the button below the camera window */}
        <TouchableOpacity style={[styles.button, styles.buttonWhite]} onPress={takePicture}>
          <Text style={[styles.buttonText, styles.buttonTextWhite]}>Take Photo</Text>
        </TouchableOpacity>

        {isTimerActive && <Text style={styles.timerText}>{timer}</Text>}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // White transparent background
  },
  container: {
    flex: 1, // Use flex 1 to occupy the entire screen
    justifyContent: 'space-between', // Align elements vertically with space between them
    alignItems: 'center', // Center elements horizontally in the row
    padding: 20,
  },
  headerTop: {
    flexDirection: 'row', // Align elements horizontally in a row
    alignItems: 'center', // Center elements vertically in the row
    justifyContent: 'space-between', // Distribute space evenly between elements
    width: '100%', // Occupy the full width
    marginTop: '10%', // Move the header 15% towards the bottom
  },
  headerBottom: {
    flexDirection: 'row', // Align elements horizontally
    alignItems: 'center', // Center elements vertically in the row
    justifyContent: 'space-between', // Distribute space evenly between elements
    width: '100%', // Occupy the full width
  },
  title: {
    fontFamily: 'neucha-regular', // Apply the custom font
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  progressText: {
    fontFamily: 'neucha-regular',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    top: '10%', // Adjust the top position
    left: '47.5%', // Adjust the left position
  },
  button: {
    position: 'absolute',
    bottom: '11%', // Move the button 10% higher up from the bottom
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // White transparent background
    borderWidth: 1,
    borderColor: 'white', // Change the button border color to white
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 18,
  },
  buttonTextWhite: {
    color: 'white', // Set the button text color to white
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  cameraContainer: {
    flex: 0.85, // Adjust the flex to take more space for the camera
    width: '100%',
    justifyContent: 'center', // Align the camera to the center of the container
    bottom: 35,
  },
  cameraBorderRadius: {
    borderRadius: 20, // Set the border radius for rounded corners
    overflow: 'hidden', // Clip the camera view to fit within the rounded container
  },
  settingsButton: {
    bottom: '20%', // Move the button to the bottom left corner
    left: '40%', // Move the button to the bottom left corner
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // White transparent background
    borderColor: 'white', // Change the button border color to white
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  storeButton: {
    bottom: '20%', // Move the button to the bottom right corner
    right: '40%', // Move the button to the bottom right corner
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // White transparent background
    borderColor: 'white', // Change the button border color to white
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  settingsButtonText: {
    fontSize: 18,
    color: 'white',
  },
  cameraSwitchButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'white',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginLeft: 32,
    position: 'absolute', 
    left: '60%', // Adjust the left position
  },
  flashButton: {
    left: 45, // Move the button to the top left corner
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // White transparent background
    borderColor: 'white', // Change the button border color to white
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 15,
    position: 'absolute', 
    left: '77.5%', // Adjust the left position
  },
  timerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // White transparent background
    borderColor: 'white', // Change the button border color to white
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 5,
    position: 'absolute',
    left: '90%', // Adjust the left position
  },
  timerText: {
    fontFamily: 'neucha-regular',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 100, // Adjust the left margin to align with other elements
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 5,
    position: 'absolute', 
    top: 55,
     right: 20 
  },
});
