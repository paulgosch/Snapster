import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity, ImageBackground } from 'react-native'; // Import ImageBackground
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook from React Navigation
import { Pages, Colors, Fonts } from './constants';

const YOUR_CLIENT_ID = 'AZC-5Z6zhxR338bOISEchhRL13JfwG-JCGCmgsJPBpZzntabmjEsd9Ki-xlWK9YziV6CyfLW4-PTtgQj'; // this is our real Client ID from paypal
const YOUR_APP_SECRET = 'YOUR_APP_SECRET';

// Import the backgroundImageSource from StorePage
const backgroundImageSource = require('./assets/Background.jpg');

const CheckoutPage = () => {
  const [orderID, setOrderID] = useState(null);
  const navigation = useNavigation(); // Use the useNavigation hook here

  const createOrder = () => {
    navigation.navigate(Pages.Paypal);
  };

  const capturePayment = async () => {
    if (!orderID) {
      Alert.alert('Error', 'Order ID is missing. Please create an order first.');
      return;
    }

    try {
      const response = await axios.post('http://YOUR_SERVER_URL/capture-paypal-order', {
        orderID,
      });

      // TODO: Handle successful payment capture and order fulfillment

      Alert.alert('Payment Captured', 'Payment successfully captured.');
    } catch (error) {
      console.error('Error capturing payment:', error);
    }
  };

  const handleGoBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  return (
    <ImageBackground source={backgroundImageSource} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Checkout</Text>
        <Button title="Create Order" onPress={createOrder} />
        <Button title="Capture Payment" onPress={capturePayment} />
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
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    padding: 10,
    fontFamily: Fonts.Button,
  },
});

export default CheckoutPage;