import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; // Import the Feather component
import { Camera } from 'expo-camera';
import { Pages } from './constants';
import { useSelector } from 'react-redux';


const customFont = require('./assets/Neucha-Regular.otf');
const backgroundImageSource = require('./assets/Background.jpg');

export default function HomeScreen() {
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

  const takePicture = async () => {
    if (cameraRef) {
      let photo = await cameraRef.takePictureAsync();
      console.log('photo', photo);
      Alert.alert('Photo taken', 'Check your console logs');
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
              name={flashMode === Camera.Constants.FlashMode.off ? "zap-off" : "zap"}
              size={24}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cameraSwitchButton} onPress={toggleCameraType}>
            <Feather
              name="rotate-cw"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>

        {/* Move the camera container slightly up */}
        <View style={[styles.cameraContainer, styles.cameraBorderRadius]}>
          <Camera
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
    fontFamily: 'neucha-regular', // Apply the custom font
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    left: 20,
  },
  button: {
    position: 'absolute',
    bottom: '21%', // Move the button 10% higher up from the bottom
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // White transparent background
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
    marginLeft: 10,
  },
  flashButton: {
    left: 45, // Move the button to the top left corner
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // White transparent background
    borderColor: 'white', // Change the button border color to white
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
});
