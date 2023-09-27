import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity, ImageBackground, TextInput, Image, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook from React Navigation
import { Pages,Colors, Fonts } from './constants';
import { useStripe, CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import Constants from "expo-constants";


const YOUR_CLIENT_ID = 'AZC-5Z6zhxR338bOISEchhRL13JfwG-JCGCmgsJPBpZzntabmjEsd9Ki-xlWK9YziV6CyfLW4-PTtgQj'; // this is our real Client ID from paypal

// Import the backgroundImageSource from StorePage
const backgroundImageSource = require('./assets/Background.jpg');
const paypalimage = require('./assets/paypalimage.png'); // Import the PayPal image
const API_URL = "http://172.16.62.62:3000";
const cardImage = require('./assets/CardPaymentMasterCard.png');

const CheckoutPage = ({ route }) => {
  const stripe = useStripe();
  const [cardDetails, setCardDetails] = useState();
  const [clientSecret, setClientSecret] = useState('');
  const [email, setEmail] = useState();
  const {confirmPayment, loading} = useConfirmPayment();
  const navigation = useNavigation(); // Use the useNavigation hook here
  const createOrder = () => {
    navigation.navigate(Pages.Paypal);
  };

  const basicBundleImage = require('./assets/Roll_basic.png');
const standardBundleImage = require('./assets/Roll_standard.png');
const premiumBundleImage = require('./assets/Roll_premium.png');

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


const selectedBundle = route.params?.bundle;

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
   const handlePaypalCheckout = () => {
    // Handle the PayPal checkout logic here
  };


  return (
    <ImageBackground source={backgroundImageSource} style={styles.backgroundContainer}>
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} style={{ flex: 1 }}>
      <View style={styles.container}>
      <View style={styles.headerContainer}>
    <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Icon name="arrow-left" size={24} color="white" />
    </TouchableOpacity>
    <Text style={styles.title}>Checkout Page</Text>
    <View style={{ width: 24 }} /> 
</View>
        <View style={styles.cardImageContainer}>
        {selectedBundle === 'basic' && (
       <View style={styles.bundle}>
       <Image source={basicBundleImage} style={styles.bundleImage} />
        <View style={styles.textContainer}>
        <Text style={styles.bundleTitle}>Basic Bundle</Text>
        <Text style={styles.bundleDescription}>A friendly start for newcomers.</Text>
        <Text style={styles.bundleDescription}>+ with 17 Pictures </Text>
        <Text style={styles.bundleDescription}>+ sustainable packaging </Text>
        <Text style={styles.bundleDescription}>+ free Delivery</Text>
        <Text style={styles.bundlePrice}>€4.99</Text>
      </View>
    </View>
  )}
  {selectedBundle === 'standard' && (
    <View style={styles.bundle}>
      <Image source={standardBundleImage} style={styles.bundleImage} />
      <View style={styles.textContainer}>
        <Text style={styles.bundleTitle}>Standard Bundle</Text>
        <Text style={styles.bundleDescription}>For our regular snap enthusiasts.</Text>
        <Text style={styles.bundleDescription}>+ with 27 Pictures </Text>
        <Text style={styles.bundleDescription}>+ sustainable packaging </Text>
        <Text style={styles.bundleDescription}>+ free Delivery</Text>
        <Text style={styles.bundlePrice}>€8.99</Text>
      </View>
    </View>
  )}
  {selectedBundle === 'premium' && (
    <View style={styles.bundle}>
      <Image source={premiumBundleImage} style={styles.bundleImage} />
      <View style={styles.textContainer}>
        <Text style={styles.bundleTitle}>Premium Bundle</Text>
        <Text style={styles.bundleDescription}>The ultimate pick for photography lovers.</Text>
        <Text style={styles.bundleDescription}>+ with 47 Pictures </Text>
        <Text style={styles.bundleDescription}>+ sustainable packaging </Text>
        <Text style={styles.bundleDescription}>+ free Delivery</Text>
        <Text style={styles.bundlePrice}>€12.99</Text>
      </View>
    </View>
  )}
</View>
<Text style={styles.paymentmethod}>Payment Method</Text>
                    <View style={styles.container2}>
                        <Text style={styles.subtitle}>Email</Text>
                        <TextInput
                            autoCapitalize="none"
                            placeholder="E-mail"
                            keyboardType="email-address"
                            onChange={value => setEmail(value.nativeEvent.text)}
                            style={styles.input}
                        />
                        <Text style={styles.subtitle}>Card Information</Text>
                        <CardField
                            postalCodeEnabled={false}
                            placeholder={{
                                number: "4242 4242 4242 4242",
                            }}
                            cardStyle={styles.card}
                            style={styles.cardContainer}
                            onCardChange={cardDetails => {
                                setCardDetails(cardDetails);
                            }}
                        />
                        <TouchableOpacity 
                            onPress={capturePayment} 
                            style={styles.payButtonContainer} 
                            disabled={loading}
                        >
                            <Text style={styles.payButtonText}>Pay with Card</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.ortext}>Or</Text>

                    <TouchableOpacity onPress={createOrder} style={styles.paypalImageContainer}>
                        <Image source={paypalimage} style={styles.paypalImage} resizeMode="contain" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    </ImageBackground>
);

        }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
  },
  input: {
    backgroundColor: "#efefefef",
    borderRadius: 8,
    fontSize: 16,
    height: 50,
    padding: 10,
    fontFamily: Fonts.BodyText,
    marginBottom: 15, // Added margin for spacing
},
  card: {
    backgroundColor: "#efefefef",
    fontFamily: Fonts.BodyText,
  },
  cardContainer: {
    height: 50,
    
},
  backgroundContainer: {
    flex: 1,
  },
  paypalImageContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  paypalImage: {
    width: 150,
    height: 50,
  },
  ortext: {
    fontSize: 18,
    color: 'white',
    fontFamily: Fonts.Title,
    marginVertical: 10,
    alignSelf: 'center', // This will center the button horizontally
  },
  cardImageContainer: {
    alignItems: 'center',
  },
  cardImage: {
    width: 300, // Adjust the width as necessary
    height: 190, // Adjust the height as necessary
  },
  payButtonContainer: {
    paddingVertical: 6,  // Adjusted padding for better shape
    paddingHorizontal: 10, // Increased padding for better shape
    backgroundColor: '#003087',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10, // Added margin for spacing
},
payButtonText: {
    color: 'white',
    fontSize: 16,  // Slightly bigger font size
    fontWeight: '500',  // Not too bold, not too light
    letterSpacing: 0.5,  // Spacing between letters for better readability
},
subtitle: {
  fontSize: 16,
  color: '#003087',
  fontFamily: Fonts.Title,
  marginBottom: 5, // Added margin for spacing
  left: 10,
},
container2: {
  padding: 20, // Increased padding for better spacing
  backgroundColor: 'white',
  borderRadius: 8,
  marginVertical: 10,
},
  paymentmethod:{
    fontSize: 24,
    color: 'white',
    fontFamily: Fonts.Title,
    alignSelf: 'center',
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
  bundleImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginRight: 10,
    flex: 1,  // Add this line
},
textContainer: {
    flex: 2,  // Add this line
    paddingRight: 10,  // Add some padding to prevent text from touching the edge
},
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',  // Add this line
    marginBottom: 20,
},
  backButton: {
  marginRight: 10,  // To give some space between the back button and the title
},
  title: {
  fontSize: 24,
  color: 'white',
  fontFamily: Fonts.Title,
},
});

export default CheckoutPage;