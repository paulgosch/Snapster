import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const backgroundImageSource = require('./assets/Background.jpg');
const blurryImagePlaceholder = require('./assets/CardPaymentMasterCard.jpg'); // replace with your blurry image

export default function MyPicturesPage() {
  const { userBundle } = useSelector((state) => state.user);
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };
  const handleBuyMore = () => {
    navigation.navigate('StorePage');
  };

  const blurRadius = 10; // Adjust this value to control the blurriness of the images

  return (
    <ImageBackground source={backgroundImageSource} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.title}>My Pictures</Text>
        </View>
        
        <View style={styles.grid}>
          {[...Array(30)].map((_, index) => (
            <View style={styles.gridItem} key={index}>
              <ImageBackground source={blurryImagePlaceholder} style={styles.image} blurRadius={blurRadius} />
            </View>
          ))}
        </View>
        <Text style={styles.bundleInfo}>Current Bundle: Basic Bundle</Text>
        <Text style={styles.bundleInfo}>Pictures remaining: 3/27</Text>
        <TouchableOpacity onPress={handleBuyMore}>
        <Text style={styles.Shop}>Buy More!</Text>
              </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 16,
    marginTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    top: 20,
  },
  bundleInfo: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  gridItem: {
    width: '18%',
    aspectRatio: 1,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    padding: 10,
  },
  Shop: {
        color: '#FF9817', // Use the same orange color as the "Change" text
        fontSize: 16, // Set a font size for the text
        alignSelf: 'center',
  }
});