import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { Pages } from './constants';
import { Camera } from 'expo-camera';

const customFont = require('./assets/Neucha-Regular.otf');

export default function HomeScreen() {
  const [fontLoaded, setFontLoaded] = React.useState(false);
  const [type, setType] = React.useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = React.useState(null);
  const [cameraRef, setCameraRef] = React.useState(null);
  const navigation = useNavigation(); // Use the useNavigation hook here

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

  const handleLogout = () => {
    // Implement any necessary logout logic here
    // For now, let's just navigate to the WelcomePage
    navigation.navigate(Pages.WelcomePage);
  };
  const takePicture = async () => {
    if (cameraRef) {
      let photo = await cameraRef.takePictureAsync();
      console.log('photo', photo);
      Alert.alert('Photo taken', 'Check your console logs');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>log out</Text>
      </TouchableOpacity>
      <Camera 
        style={styles.camera} 
        type={type} 
        ref={(ref) => setCameraRef(ref)}
      >
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
});