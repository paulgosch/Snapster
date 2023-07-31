import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TermsAndConditionsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Terms and Conditions</Text>
      {/* Add the content of your Terms and Conditions here */}
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
    color: 'black', // Adjust the color as needed
    marginBottom: 20,
  },
});