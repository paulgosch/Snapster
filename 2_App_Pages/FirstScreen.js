import React from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Pages, Colors, Fonts } from '../constants';

const backgroundImageSource = require('.././assets/Background.jpg');

export default function FirstScreen({ navigation }) {
  const handleScreenPress = () => {
    navigation.navigate(Pages.WelcomePage);
  };

  // Override default navigation options
  React.useLayoutEffect(() => {
    const disableBackButton = () => {
      navigation.setOptions({
        headerLeft: () => null, // Disable system-provided back button
      });
    };

    const disableGesture = () => {
      // Disable swipe gesture from the left edge on iOS
      navigation.setOptions({
        gestureEnabled: false,
      });
    };

    disableBackButton();
    disableGesture();

    // Cleanup function to reset navigation options when component unmounts
    return () => {
      navigation.setOptions({
        headerLeft: undefined, // Reset headerLeft
        gestureEnabled: false, // Reset gestureEnabled
      });
    };
  }, [navigation]);

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
    fontFamily: Fonts.Title,
    fontSize: 50,
    fontWeight: 'bold',
    color: Colors.PrimaryColor,
  },
});