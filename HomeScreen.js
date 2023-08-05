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
        <View style={styles.header}>
          <TouchableOpacity style={styles.titleContainer}>
            <Text style={styles.title}> Snapster {userName} </Text>
          </TouchableOpacity>
          <Text style={styles.progressText}>3/27</Text> 

          <TouchableOpacity style={styles.settingsButton} onPress={handleSettings}>
            <Feather name="settings" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.storeButton} onPress={handleStore}>
            <Feather name="shopping-cart" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={[styles.cameraContainer, styles.cameraBorderRadius]}>
          <Camera
            style={styles.camera}
            type={type}
            ref={(ref) => setCameraRef(ref)}
          />
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
    flex: 0.85,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row', // Align elements horizontally
    alignItems: 'center', // Center elements vertically in the row
    justifyContent: 'space-between', // Distribute space evenly between elements
    width: '100%', // Occupy the full width
    marginBottom: 20,
    marginTop: '10%', // Move the header 10% towards the bottom
  },
  titleContainer: {
    flexDirection: 'row', // Align elements horizontally
    alignItems: 'center', // Center elements vertically in the row
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
  },
  button: {
    position: 'absolute',
    bottom: '10%', // Move the button 10% higher up from the bottom
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
  logoutButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // White transparent background
    borderWidth: 1,
    borderColor: 'white', // Change the logout button border color to white
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  cameraContainer: {
    flex: 1, // Adjust the flex to take more space for the camera
    width: '100%',
    justifyContent: 'flex-end', // Align the camera to the bottom of the container
  },
  cameraBorderRadius: {
    borderRadius: 10, // Set the border radius for rounded corners
    overflow: 'hidden', // Clip the camera view to fit within the rounded container
  },
  settingsButton: {
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
});