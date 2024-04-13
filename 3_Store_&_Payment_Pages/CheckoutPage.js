import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity, ImageBackground, TextInput, Image, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook from React Navigation
import { Pages, Colors, Fonts } from '../constants';
import { useStripe, CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import { Feather } from '@expo/vector-icons';

const YOUR_CLIENT_ID = 'AZC-5Z6zhxR338bOISEchhRL13JfwG-JCGCmgsJPBpZzntabmjEsd9Ki-xlWK9YziV6CyfLW4-PTtgQj'; // this is our real Client ID from paypal

// Import the backgroundImageSource from StorePage
const backgroundImageSource = require('.././assets/Background.jpg');
const paypalimage = require('.././assets/paypalimage.png'); // Import the PayPal image
const API_URL = "http://172.16.62.62:3000";
const cardImage = require('.././assets/CardPaymentMasterCard.png');

const CheckoutPage = ({ route }) => {
  const [useSameAddress, setUseSameAddress] = useState(true); // Set the initial state to true
  const [deliveryAddress, setDeliveryAddress] = useState(''); // State for delivery address
  const [useCreditCard, setCreditCard] = useState (true);
  const stripe = useStripe();
  const [cardDetails, setCardDetails] = useState();
  const [email, setEmail] = useState();
  const { confirmPayment, loading } = useConfirmPayment();
  const navigation = useNavigation(); // Use the useNavigation hook here
  const createOrder = () => {
    navigation.navigate(Pages.Paypal);
  };

  const basicBundleImage = require('.././assets/Roll_basic.png');
  const standardBundleImage = require('.././assets/Roll_standard.png');
  const premiumBundleImage = require('.././assets/Roll_premium.png');
  const BG_linesSource = require('.././assets/BG_lines.png');

  const fetchPaymentIntentClientSecret = async () => {
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
      address: useSameAddress ? deliveryAddress : null, 
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

  };

  const handleGoBack = () => {
    navigation.goBack(); 
  };
  const handlePaypalCheckout = () => {
  };

  return (
    <ImageBackground source={backgroundImageSource} style={styles.backgroundContainer}>
      <Image source={BG_linesSource} style={styles.BG_lines} />
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
              <View style={styles.headerContainer2}>
                <Text style={styles.paymentmethod}>Shopping Cart</Text>
                <Feather name="shopping-cart" size={24} color="#2A4D69" />
                </View>
                <View style={styles.divider} />
                 {selectedBundle === 'basic' && (
                <View style={styles.bundle}>
                  <Text style={styles.bundleTitle}>1x </Text>
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
                  <Text style={styles.bundleTitle}>1x </Text>
                  <Image source={standardBundleImage} style={styles.bundleImage} />
                  <View style={styles.textContainer}>
                    <Text style={styles.bundleTitle}>Standard Bundle</Text>
                    <Text style={styles.bundleDescription}>For our regular snap enthusiasts.</Text>
                    <Text style={styles.bundleDescription}>+ with 27 Pictures </Text>
                    <Text style={styles.bundleDescription}>+ sustainable packaging </Text>
                    <Text style={styles.bundleDescription}>+ free Delivery</Text>
                    <Text style={styles.bundlePrice}>€5.99</Text>
                  </View>
                </View>
              )}
              {selectedBundle === 'premium' && (
                <View style={styles.bundle}>
                  <Text style={styles.bundleTitle}>1x </Text>
                  <Image source={premiumBundleImage} style={styles.bundleImage} />
                  <View style={styles.textContainer}>
                    <Text style={styles.bundleTitle}>Premium Bundle</Text>
                    <Text style={styles.bundleDescription}>The ultimate pick for photography lovers.</Text>
                    <Text style={styles.bundleDescription}>+ with 47 Pictures </Text>
                    <Text style={styles.bundleDescription}>+ sustainable packaging </Text>
                    <Text style={styles.bundleDescription}>+ free Delivery</Text>
                    <Text style={styles.bundlePrice}>€6.99</Text>
                  </View>
                </View>
              )}
            </View>
            <View>
              <View style={styles.paymentContainer}>
                <View style = {styles.headerContainer2}> 
                <Text style={styles.paymentmethod}>Delivery & Billing Address</Text>
                <Feather name="map-pin" size={24} color="#2A4D69" />
                </View>
                <View style={styles.divider} />
                <View style={styles.deliveryAddressContainer}>
                    <Text style={styles.subtitle}>Delivery Address</Text>
                    <TextInput
                      autoCapitalize="words"
                      placeholder="Full Name"
                      style={styles.input}
                    />
                    <TextInput
                      autoCapitalize="words"
                      placeholder="Street Address"
                      style={styles.input}
                    />
                    <TextInput
                      autoCapitalize="words"
                      placeholder="City"
                      style={styles.input}
                    />
                    <TextInput
                      keyboardType="numeric"
                      placeholder="Postal Code"
                      style={styles.input}
                    />
                    <TextInput
                      editable={false} 
                      autoCapitalize="words"
                      defaultValue="Germany" 
                      style={styles.input}
                    />
                  </View>
                  <View style={styles.addressContainer}>
                  <TouchableOpacity onPress={() => setUseSameAddress(!useSameAddress)} style={styles.checkbox}>
                    {useSameAddress ? <Icon name="check-square" size={24} color="#2A4D69"/> : <Icon name="square" size={24} color="black" />}
                  </TouchableOpacity>
                  <Text style={styles.ortext}>Use same address for delivery and billing?</Text>
                </View>
                {!useSameAddress && (
                  <View>
                    <Text style={styles.BillingAdressTitle}>Billing Address</Text>
                    <TextInput
                     autoCapitalize="words"
                     placeholder="Full Name"
                     style={styles.input}
                   />
                   <TextInput
                     autoCapitalize="words"
                     placeholder="Street Address"
                     style={styles.input}
                   />
                   <TextInput
                     autoCapitalize="words"
                     placeholder="City"
                     style={styles.input}
                   />
                   <TextInput
                     keyboardType="numeric"
                     placeholder="Postal Code"
                     style={styles.input}
                   />
                   <TextInput
                     autoCapitalize="words"
                     placeholder="Country" 
                     style={styles.input}
                   />
                  </View>
                )}
                
              </View>
              <View style = {styles.paymentContainer}>
              <View style = {styles.headerContainer2}>
              <Text style={styles.paymentmethod}>Payment Method</Text>
                <Feather name="credit-card" size={24} color="#2A4D69" />
                </View>
              <View style={styles.divider} />

              <View style={styles.addressContainer}>
              <TouchableOpacity onPress={() => setCreditCard(!useCreditCard)} style={styles.checkbox}>
                    {useCreditCard ? <Icon name="check-square" size={24} color="#2A4D69"/> : <Icon name="square" size={24} color="black" />}
                  </TouchableOpacity>
                  <Text style={styles.ortext}>Credit Card</Text>
                </View>
                
                <View>
              <Text style={styles.BillingAdressTitle}>Card Information</Text>
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
              <View style={styles.addressContainer}>
              <TouchableOpacity onPress={() => setCreditCard(!useCreditCard)} style={styles.checkbox}>
                    {useCreditCard ? <Icon name="check-square" size={24} color="#2A4D69"/> : <Icon name="square" size={24} color="black" />}
                  </TouchableOpacity>
                  <Text style={styles.ortext}>PayPal</Text>
              </View>
              <TouchableOpacity onPress={createOrder} style={styles.paypalImageContainer}>
              <Image source={paypalimage} style={styles.paypalImage} resizeMode="contain" />
              </TouchableOpacity>
              </View>
          </View>
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
    marginBottom: 15,
    fontFamily: Fonts.Subtitle,
    color: '#2A4D69',
  },
  card: {
    backgroundColor: "#efefefef",
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
    fontSize: 16,
    color: '#2A4D69',
    fontFamily: Fonts.Subtitle,
  },
  cardImageContainer: {
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
  },
  payButtonContainer: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderColor: '#2A4D69',
    backgroundColor: '#2A4D69',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  payButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.5,
    fontFamily: Fonts.Subtitle,
  },
  subtitle: {
    fontSize: 16,
    color: '#2A4D69',
    marginBottom: 5,
    left: 10,
    fontFamily: Fonts.Subtitle,
  },
  paymentmethod: {
    fontSize: 24,
    color: '#2A4D69',
    fontFamily: Fonts.Subtitle,
  },
  paymentContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2CAAE',
    marginVertical: 10,
    alignSelf: 'stretch',
  },
  bundle: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
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
    fontFamily: Fonts.Subtitle,
  },
  bundlePrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2ecc71',
    textAlign: 'right',
    fontFamily: Fonts.Subtitle,
  },
  bundleImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginRight: 10,
    flex: 1,
  },
  textContainer: {
    flex: 2,
    paddingRight: 10,
  },
  headerContainer: {
    paddingTop: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerContainer2:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    color: '#2A4D69',
    backgroundColor: '#E2CAAE',
    fontFamily: Fonts.Subtitle,
  },
  BG_lines: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  addressContainer: {
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Center items vertically
  },
  checkbox: {
    paddingRight: 5,
  },
 BillingAdressTitle: {
 paddingTop: 10,
 fontSize: 16,
 color: '#2A4D69',
 marginBottom: 5,
 left: 10,
 fontFamily: Fonts.Subtitle,
 },
  
});

export default CheckoutPage;