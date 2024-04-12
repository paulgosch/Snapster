import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Pages, Colors, Fonts } from '../constants';
import Icon from 'react-native-vector-icons/Feather';

const basicBundleImage = require('.././assets/Roll_basic.png');
const standardBundleImage = require('.././assets/Roll_standard.png');
const premiumBundleImage = require('.././assets/Roll_premium.png');
const backgroundImageSource = require('.././assets/Background.jpg');
const BG_linesSource = require('.././assets/BG_lines.png');

const StorePage = () => {
  const navigation = useNavigation();

  const handleBundleOrder = (selectedBundle) => {
    navigation.navigate(Pages.CheckoutPage, { bundle: selectedBundle });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground source={backgroundImageSource} style={styles.background}>
       <Image source={BG_linesSource} style={styles.BG_lines} />
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Welcome to Our Store!</Text>

        <View style={styles.bundlesContainer}>


          <TouchableOpacity style={styles.bundle} onPress={() => handleBundleOrder('basic')}>
            <Image source={basicBundleImage} style={styles.bundleImage} />
            <View style={styles.textContainer}>
              <Text style={styles.bundleTitle}>Basic Bundle</Text>
              <Text style={styles.bundleDescription}>A friendly start for newcomers.</Text>
              <Text style={styles.bundleDescription}>+ with 17 Pictures </Text>
              <Text style={styles.bundleDescription}>+ sustainable packaging </Text>
              <Text style={styles.bundleDescription}>+ free Delivery</Text>
              <Text style={styles.bundlePrice}>€4.99</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bundle} onPress={() => handleBundleOrder('standard')}>
            <Image source={standardBundleImage} style={styles.bundleImage} />
            <View style={styles.textContainer}>
              <Text style={styles.bundleTitle}>Standard Bundle</Text>
              <Text style={styles.bundleDescription}>For our regular snap enthusiasts.</Text>
              <Text style={styles.bundleDescription}>+ with 27 Pictures </Text>
              <Text style={styles.bundleDescription}>+ sustainable packaging </Text>
              <Text style={styles.bundleDescription}>+ free Delivery</Text>
              <Text style={styles.bundlePrice}>€8.99</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bundle} onPress={() => handleBundleOrder('premium')}>
            <Image source={premiumBundleImage} style={styles.bundleImage} />
            <View style={styles.textContainer}>
              <Text style={styles.bundleTitle}>Premium Bundle</Text>
              <Text style={styles.bundleDescription}>The ultimate pick for photography lovers.</Text>
              <Text style={styles.bundleDescription}>+ with 47 Pictures </Text>
              <Text style={styles.bundleDescription}>+ sustainable packaging </Text>
              <Text style={styles.bundleDescription}>+ free Delivery</Text>
              <Text style={styles.bundlePrice}>€12.99</Text>
            </View>
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
    color: Colors.PrimaryColor,
    fontFamily: Fonts.Title,
    backgroundColor: '#E2CAAE',
    padding: 2,
  },
  bundlesContainer: {
    width: '80%',
    height: '78%',
    alignItems: 'center',
  },
  bundle: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
    width: '100%',
  },
  bundleImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  bundleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: Fonts.Subtitle,
  },
  bundleDescription: {
    textAlign: 'left',
    marginBottom: 5,
    color: '#666',
    fontFamily: Fonts.BodyText,
  },
  bundlePrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2ecc71',
    fontFamily: Fonts.BodyText,
    textAlign: 'right',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    padding: 10,
  },
  backButtonText: {
    fontFamily: Fonts.Button,
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.PrimaryColor,
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

export default StorePage;