import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Animated, Easing, Image } from 'react-native';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import { Pages, Colors, Fonts } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { reference, storage } from '../firebaseConfig';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { get } from 'firebase/database';
const customFont = require('.././assets/Neucha-Regular.otf');
const ImageSource = require('.././assets/FilmFrame.png');
const cameraImageSource = require('.././assets/Camera_.png');
const backgroundImageSource = require('.././assets/Background.jpg');
const BG_lines_upSource = require('.././assets/BG_lines.png');

export default function HomeScreen({ route }) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [buttonOpacity] = useState(new Animated.Value(1));
  const [buttonText, setButtonText] = React.useState("Take Photo");
  const [isUploading, setIsUploading] = useState(false);  // state to track uploading status
  const dispatch = useDispatch();
  const [fontLoaded, setFontLoaded] = React.useState(false);
  const [type, setType] = React.useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = React.useState(null);
  const [cameraRef, setCameraRef] = React.useState(null);
  const navigation = useNavigation();
  const { userName, purchaseHistory } = useSelector((state) => state.user);

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
    startAnimation()
    if (cameraRef) {
      setIsUploading(true); // Begin uploading animation
      console.log('Taking picture...');
      let photo = await cameraRef.takePictureAsync();
      const fetchRep = await fetch(photo.uri);
      const theBlob = await fetchRep.blob();
      uploadBytesResumable(
        ref(storage, '/images/'+ userName + "/userna" + photo.uri.substring(photo.uri.lastIndexOf('/') + 1)),
        theBlob
      ).then((snapshot) => {
        console.log('Success!');
        console.log(snapshot.metadata);
        // After fade-in, start fade-out
        animateButtonOpacity(1, "Take Photo"); // enable the button after animatio
        setIsUploading(false); // Begin uploading animation

      });
    } else {
      console.log('Camera reference is not set');
    }
  };

  const takePicture = async () => {
    animateButtonOpacity(0.5, "Uploading...");
    if (isTimerEnabled) {
      startTimer();
    } else {
      await capturePhoto();
    }
  };
  const startAnimation = () => {
    fadeAnim.setValue(0); // reset to initial value
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true, // use native driver for performance
    }).start(() => {
      // After fade-in, start fade-out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start(() => fadeAnim.setValue(0) // reset to initial value after animation ends
      );
    });
    const fadeIn = Animated.timing(buttonOpacity, {
      toValue: 0.5,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.linear,
    });

    const fadeOut = Animated.timing(buttonOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.linear,
    });

    Animated.loop(
      Animated.sequence([
        fadeIn,
        fadeOut,
      ])
    ).start(() => {
      if (!isUploading) {
        buttonOpacity.setValue(1); // reset to initial value when uploading completes
      }
    });
  }
  const loadUser = async () => {
    try {
      console.log("loaduser here")
      console.log(reference);

      const snapshot = await get((reference));
      console.log("loaduser2 here")

      const userData = snapshot.val();
      Object.entries(userData).forEach(([key, value]) => {
        switch (key) {
          case "username":
            dispatch({
              type: 'SET_USERNAME',
              payload: value
            })
            break;
          case "email":
            dispatch({
              type: 'SET_EMAIL',
              payload: value
            })
            break;
          case "name":
            dispatch({
              type: 'SET_FULLNAME',
              payload: value
            })
            break;
          case "address":
            dispatch({
              type: 'SET_ADDRESS',
              payload: Object.values(value).join(' ')
            })
            break;

          case 'bundles':
            dispatch({
              type: 'SET_PURCHASE_HISTORY',
              payload: value.purchaseHistory
            })
            break;
          }
        });
      } catch (error) {
        console.error("Error loading user:", error);
      }
    }
    useEffect(() => {
      async function loadFont() {
        await Font.loadAsync({
          'neucha-regular': customFont,
        });
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
        setFontLoaded(true);
      }
      loadFont();
      loadUser();
      console.log(purchaseHistory)
      console.log(purchaseHistory)

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
  const animateButtonOpacity = (toValue, textVal) => {
    Animated.timing(buttonOpacity, {
      toValue: toValue,
      duration: 150,
      useNativeDriver: true,
    }).start(
      setButtonText(textVal)
    );
  }
  return (
    <View style={styles.backgroundColorContainer}>
    <ImageBackground source={backgroundImageSource} style={styles.backgroundImage} resizeMode="cover">
    <Image source={BG_lines_upSource} style={styles.BG_lines} />
    
      <View style={styles.container}>
        <View style={styles.headerTop}>
        <Image source={cameraImageSource} style={styles.titleImage} />
          <Text style={styles.progressText}>3/27</Text>
          <TouchableOpacity style={styles.flashButton} onPress={toggleFlashMode}>
            <Feather
              name={flashMode === Camera.Constants.FlashMode.off ? 'zap-off' : 'zap'}
              size={24}
              color="#2A4D69"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cameraSwitchButton} onPress={toggleCameraType}>
            <Feather name="rotate-cw" size={24} color="#2A4D69" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.timerButton} onPress={toggleTimer}>
            <Feather name="clock" size={24} color={isTimerEnabled ? 'green' : '#2A4D69'} />
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
            <Animated.View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'white',
                opacity: fadeAnim, // this should be the Animated.Value we discussed
              }}
            />
          </View>
        </GestureDetector>
        <View style={styles.headerBottom}>
          <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate(Pages.SettingsPage)}>
            <Feather name="settings" size={24} color="#2A4D69" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.storeButton} onPress={() => navigation.navigate(Pages.StorePage)}>
            <Feather name="shopping-cart" size={24} color="#2A4D69" />
          </TouchableOpacity>
        </View>
        {isTimerActive ? (
          <>
            <View style={styles.timerOverlay}>
              <Text style={styles.timerTextLarge}>{timer}</Text>
            </View>
            <TouchableOpacity style={[styles.button, styles.buttonWhite]} onPress={stopTimer}>
              <Text style={[styles.buttonText]}>Stop</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Animated.View style={[styles.button, styles.buttonWhite, { opacity: buttonOpacity }]}>
            <TouchableOpacity onPress={takePicture}>
              <Text style={[styles.buttonText]}>{buttonText}</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
      </ImageBackground>
    
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // This will ensure the image covers the entire view
  },
  container: {
    flex: 1, // Use flex 1 to occupy the entire screen
    justifyContent: 'space-between', // Align elements vertically with space between them
    alignItems: 'center', // Center elements horizontally in the row
    
  },
  headerTop: {
    flexDirection: 'row', // Align elements horizontally in a row
    alignItems: 'center', // Center elements vertically in the row
    justifyContent: 'space-between', // Distribute space evenly between elements
    width: '100%', // Occupy the full width
    marginTop: '15%', // Move the header 15% towards the bottom
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
    color: '#2A4D69',
    fontFamily: Fonts.Title,
  },
  progressText: {
    fontFamily: Fonts.BodyText,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2A4D69',
    position: 'absolute',
    left: '47.5%', // Adjust the left position
  },
  button: {
    position: 'absolute',
    bottom: '11%', // Move the button 10% higher up from the bottom
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // White transparent background
    borderWidth: 1,
    borderColor: '#2A4D69', // Change the button border color to white
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: Fonts.Button,
    color: '#2A4D69', // Set the button text color to white
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  cameraContainer: {
    flex: 0.73, // Adjust the flex to take more space for the camera
    width: '90%',
    justifyContent: 'center', // Align the camera to the center of the container
    bottom: '5%',
  },
  cameraBorderRadius: {
    borderRadius: 8, // Set the border radius for rounded corners
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
    right: 20,
    fontFamily: Fonts.Button,
  },
  timerOverlay: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    alignItems: 'center',
  },
  timerTextLarge: {
    fontSize: 100,
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
  backgroundColorContainer: {
    flex: 1,
    backgroundColor: '#2E2E2E',
  },
  titleImage: {
    width: 65,  // You can adjust this as needed
    height: 68, // You can adjust this as needed
    resizeMode: 'contain', // This will ensure the image fits within the dimensions provided
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  BG_lines: {
    position: 'absolute', // Absolute position
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Cover the entire screen
  },
});

