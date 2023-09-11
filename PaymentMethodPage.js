import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, TextInput } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Colors } from './constants';
import { useNavigation } from '@react-navigation/native';

const backgroundImageSource = require('./assets/Background.jpg');
const cardImage = require('C:/Users/paulg/Desktop/App1/App1/assets/CardPaymentMasterCard.png');

export default function PaymentPage() {
    const navigation = useNavigation();
  
    const handleBack = () => {
      navigation.goBack();
    };
  
    const handleAddCard = () => {
      navigation.navigate('NewCardPage'); // Navigate to NewCardPage when Add Card is clicked
    };
  

  return (
    <ImageBackground source={backgroundImageSource} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <FeatherIcon name="arrow-left" size={24} color={Colors.PrimaryColor} />
        </TouchableOpacity>
        <Text style={styles.title}>Payment Method</Text>
      </View>

      <View style={styles.cardManagementContainer}>
      <Text style={styles.cardManagementTitle}>Card Management</Text>
      <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
        <Text style={styles.addButtonText}>Add Card</Text>
      </TouchableOpacity>
    </View>

      <View style={styles.cardImageContainer}>
        <Image source={cardImage} style={styles.cardImage} resizeMode="contain" />
      </View>

      <View>
      <Text style={styles.cardManagementTitle}>My Payment Information</Text>
    </View>

      <View style={styles.cardDetailsContainer}>
      <TextInput 
          style={styles.textInput2}
          placeholder="Cardholder Name"
          placeholderTextColor="#aaa"
        />
        <TextInput 
          style={styles.textInput}
          placeholder="Paul Henrik Gosch" 
          placeholderTextColor="#aaa"
        />
        <TextInput 
          style={styles.textInput2}
          placeholder="Card Number"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
        />
        <TextInput 
          style={styles.textInput}
          placeholder="**** **** **** *347"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    top: '10%',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    color: 'white',
  },
  cardManagementContainer: {
    top: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  cardManagementTitle: {
    fontSize: 18,
    color: 'white',
  },
  addButton: {
    padding: 10,
    borderRadius: 4,
  },
  addButtonText: {
    color: 'red',
    fontSize: 16,
  },
  cardImageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  cardImage: {
    width: 300, // Adjust the width as necessary
    height: 190, // Adjust the height as necessary
  },
  cardDetailsContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 16,
  },
  textInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  textInput2: {
    height: 40,
  },
});