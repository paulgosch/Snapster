import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import Icon from 'react-native-vector-icons/Feather';
import { Pages,Colors } from './constants';

export default function PrivacyPolicyPage() {
  const pdfUrl = "https://drive.google.com/uc?export=download&id=1vlelO-YcMg4zPprmgOszatYTVTQOpiOa";
  const navigation = useNavigation(); // Use the useNavigation hook here

  const handleGoBack = () => {
    navigation.goBack(); // Navigate back to the previous screen (LoginPage)
  };

  return (
    <ImageBackground
      source={require('./assets/Background.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Privacy Policy</Text>
        <View style={styles.webViewContainer}>
          <WebView
            source={{ uri: pdfUrl }}
            style={styles.webView}
            onError={(error) => console.log(error)}
          />
        </View>
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
    flex: 0.85,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 120,
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    paddingTop: 30
  },
  backButtonText: {
    fontFamily: 'neucha-regular',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    fontFamily: 'neucha-regular',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  webViewContainer: {
    flex: 1, // Take up the available space for the WebView
    width: '100%', // Ensure the WebView container takes up the full width
    borderRadius: 10, // Set the border radius for rounded corners
    overflow: 'hidden', // Clip the WebView to fit within the rounded container
  },
  webView: {
    flex: 1,
    width: '100%', // Ensure the WebView takes up the full width
  },
});