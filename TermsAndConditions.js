import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function TermsAndConditionsScreen() {
  const imageUrl = require('./assets/TermsAndConditions.jpg'); // Relative path to the image

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Terms and Conditions</Text>
      <View style={styles.imageContainer}>
        <Image source={imageUrl} style={styles.image} resizeMode="contain" />
      </View>
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
    fontFamily: 'neucha-regular',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});