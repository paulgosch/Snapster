import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity, ImageBackground, TextInput } from 'react-native'; // Import ImageBackground
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook from React Navigation
import { Pages,Colors } from './constants';
import { useStripe, CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import Constants from "expo-constants";


const YOUR_CLIENT_ID = 'AZC-5Z6zhxR338bOISEchhRL13JfwG-JCGCmgsJPBpZzntabmjEsd9Ki-xlWK9YziV6CyfLW4-PTtgQj'; // this is our real Client ID from paypal

// Import the backgroundImageSource from StorePage
const backgroundImageSource = require('./assets/Background.jpg');
const API_URL = "http://172.16.62.62:3000";
const CheckoutPage = () => {
  const stripe = useStripe();
  const [cardDetails, setCardDetails] = useState();
  const [clientSecret, setClientSecret] = useState('');
  const [email, setEmail] = useState();
  const {confirmPayment, loading} = useConfirmPayment();
  const navigation = useNavigation(); // Use the useNavigation hook here
  const createOrder = () => {
    navigation.navigate(Pages.Paypal);
  };

  

  const fetchPaymentIntentClientSecret =async () => {
    const response = await fetch(`${API_URL}/create-payment-intent/24pack`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const capturePayment = async () => {
    //1.Gather the customer's billing information (e.g., email)
    if (!cardDetails?.complete || !email) {
      Alert.alert("Please enter Complete card details and Email");
      return;
    }
    const billingDetails = {
      email: email,
    };
    //2.Fetch the intent client secret from the backend
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //2. confirm the payment
      if (error) {
        console.log("Unable to process payment");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          paymentMethodType: "Card",
          billingDetails: billingDetails,
        });
        if (error) {
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          alert("Payment Successful");
          console.log("Payment successful ", paymentIntent);
        }
      }
    } catch (e) {
      console.log("HERE")
      console.log(e);
    }
    //3.Confirm the payment with the card details
  };

   /*  try {
      const { paymentIntent, error } = await stripe.confirmPayment(clientSecret, {
        paymentMethod: {
          card: cardDetails,
          type: "card", 
        },
      });

      if (error) {
        console.log('Payment error:', error);
        Alert.alert('Payment Failed', error.message);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded:', paymentIntent);
        Alert.alert('Payment Successful');
      } else {
        console.log('Unexpected payment result:', paymentIntent);
        Alert.alert('Unexpected Payment Result');
      }
    } catch (error) {
      console.log('An error occurred:', error);
      Alert.alert('An error occurred');
    } */
  const handleGoBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };


  return (
    <View style={styles.container}>
              <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Button title="Paypal" onPress={createOrder} />
    <TextInput
      autoCapitalize="none"
      placeholder="E-mail"
      keyboardType="email-address"
      onChange={value => setEmail(value.nativeEvent.text)}
      style={styles.input}
    />
    <CardField
      postalCodeEnabled={true}
      placeholder={{
        number: "4242 4242 4242 4242",
      }}
      cardStyle={styles.card}
      style={styles.cardContainer}
      onCardChange={cardDetails => {
        setCardDetails(cardDetails);
      }}
    />
    <Button onPress={capturePayment} title="Pay with Card" disabled={loading} />
  </View>
);
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
  },
  input: {
    backgroundColor: "#efefefef",

    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});

export default CheckoutPage;