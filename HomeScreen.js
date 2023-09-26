import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import { Pages, Colors, Fonts } from './constants';
import { useSelector } from 'react-redux';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from './firebaseConfig';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
const customFont = require('./assets/Neucha-Regular.otf');
const backgroundImageSource = require('./assets/Background.jpg');

export default function HomeScreen({ route }) {
  const [fontLoaded, setFontLoaded] = React.useState(false);
  const [type, setType] = React.useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = React.useState(null);
  const [cameraRef, setCameraRef] = React.useState(null);
  const navigation = useNavigation();
  const { userName } = useSelector((state) => state.user);

  const doubleTap = Gesture.Tap({
    numberOfTaps: 2,
    onEnd: (event, success) => {
      if (success) {
        toggleCameraType();
      }
    },
  });

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

  const [timer, setTimer] = useState(10);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isTimerEnabled, setIsTimerEnabled] = useState(false); // New state variable

  const stopTimer = () => {
    setIsTimerActive(false);
    setTimer(10);
  };

  const toggleTimer = () => {
    setIsTimerEnabled(!isTimerEnabled);
    if (isTimerActive) {
      stopTimer();
    }
  };

  useEffect(() => {
    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    if (timer === 0) {
      capturePhoto();
      setTimer(10);
      setIsTimerActive(false);
    }

    return () => clearInterval(interval);
  }, [timer, isTimerActive]);

  const startTimer = () => {
    setIsTimerActive(true);
  };

  const capturePhoto = async () => {
    if (cameraRef) {
      console.log('Taking picture...');
      let photo = await cameraRef.takePictureAsync();
      const fetchRep = await fetch(photo.uri);
      const theBlob = await fetchRep.blob();
      uploadBytesResumable(
        ref(storage, 'images/' + photo.uri.substring(photo.uri.lastIndexOf('/') + 1)),
        theBlob
      ).then((snapshot) => {
        console.log('Success!');
        console.log(snapshot.metadata);
      });
    } else {
      console.log('Camera reference is not set');
    }
  };

  const takePicture = async () => {
    if (isTimerEnabled) {
      startTimer();
    } else {
      await capturePhoto();
    }
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
    return null;
  }
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <ImageBackground source={backgroundImageSource} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Snapster</Text>
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
          <TouchableOpacity style={styles.timerButton} onPress={toggleTimer}>
            <Feather name="clock" size={24} color={isTimerEnabled ? 'green' : 'white'} />
          </TouchableOpacity>
        </View>
        <GestureDetector gesture={doubleTap}>
          <View style={[styles.cameraContainer, styles.cameraBorderRadius]}>
            <Camera
              flashMode={flashMode}
              style={styles.camera}
              type={type}
              ref={(ref) => setCameraRef(ref)}
            />
          </View>
        </GestureDetector>
        <View style={styles.headerBottom}>
          <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate(Pages.SettingsPage)}>
            <Feather name="settings" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.storeButton} onPress={() => navigation.navigate(Pages.StorePage)}>
            <Feather name="shopping-cart" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.button, styles.buttonWhite]} onPress={takePicture}>
          <Text style={[styles.buttonText]}>Take Photo</Text>
        </TouchableOpacity>
        {isTimerActive && (
          <View style={styles.timerOverlay}>
            <Text style={styles.timerTextLarge}>{timer}</Text>
            <TouchableOpacity style={styles.stopButton} onPress={stopTimer}>
              <Text style={styles.stopButtonText}>Stop</Text>
            </TouchableOpacity>
          </View>
        )}
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
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: Fonts.Title,
  },
  progressText: {
    fontFamily: Fonts.BodyText,
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
    fontFamily: Fonts.Button,
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
    borderColor: 'white', // Change the button border color to white
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  storeButton: {
    bottom: '20%', // Move the button to the bottom right corner
    right: '40%', // Move the button to the bottom right corner
    borderColor: 'white', // Change the button border color to white
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  settingsButtonText: {
    fontSize: 18,
    color: 'white',
    fontFamily: Fonts.Button,
  },
  cameraSwitchButton: {
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
    borderColor: 'white', // Change the button border color to white
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 15,
    position: 'absolute', 
    left: '77.5%', // Adjust the left position
  },
  timerButton: {
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
     right: 20 ,
     fontFamily: Fonts.Button,
  },
  timerOverlay: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    alignItems: 'center',
  },
  timerTextLarge: {
    fontSize: 80,
    color: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white
    fontFamily: Fonts.Title,
    textAlign: 'center',
  },
  stopButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white
    borderRadius: 8,
  },
  stopButtonText: {
    fontSize: 18,
    color: 'black',
    fontFamily: Fonts.Button,
  },
});

