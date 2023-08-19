import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Pages } from './constants';
import Icon from 'react-native-vector-icons/Feather';

const basicBundleImage = require('./assets/storeexample.png');
const backgroundImageSource = require('./assets/Background.jpg');

const StorePage = () => {
  const navigation = useNavigation();

  const handleBundleOrder = () => {
    // Navigate to the CheckoutPage
    navigation.navigate(Pages.CheckoutPage);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground source={backgroundImageSource} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Welcome to Our Store!</Text>

        <View style={styles.bundlesContainer}>
          <TouchableOpacity style={styles.bundle} onPress={handleBundleOrder}>
            <Image source={basicBundleImage} style={styles.bundleImage} />
            <Text style={styles.bundleTitle}>Basic Bundle</Text>
            <Text style={styles.bundleDescription}>A simple bundle with essential 27 Pictures.</Text>
            <Text style={styles.bundleDescription}>+ free Delivery</Text>
            <Text style={styles.bundlePrice}>€10.99</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bundle} onPress={handleBundleOrder}>
            <Text style={styles.bundleTitle}>Standard Bundle</Text>
            <Text style={styles.bundleDescription}>
              A well-rounded bundle with 
            </Text>
            <Text style={styles.bundleDescription}>35 Pictures.</Text>
            <Text style={styles.bundleDescription}>+ free Delivery</Text>
            <Text style={styles.bundlePrice}>€19.99</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bundle} onPress={handleBundleOrder}>
            <Text style={styles.bundleTitle}>Premium Bundle</Text>
            <Text style={styles.bundleDescription}>
              The ultimate bundle with 40 Pictures and an exclusive item.
            </Text>
            <Text style={styles.bundleDescription}>+ free Delivery</Text>
            <Text style={styles.bundlePrice}>€24.99</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // White transparent background
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  bundlesContainer: {
    width: '80%', // Set a fixed width for the container
    height: '78%',
    alignItems: 'center', // Center bundles vertically
  },
  bundle: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
    width: '100%', // Set the width of each bundle to be 100% of the container
  },
  bundleImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  bundleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bundleDescription: {
    textAlign: 'center',
    marginBottom: 5,
    color: '#666',
  },
  bundlePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1, // Ensure the back button is above the bundles
    padding: 10,
  },
  backButtonText: {
    fontFamily: 'neucha-regular',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default StorePage;