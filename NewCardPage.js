import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, TextInput } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Colors } from './constants';
import { useNavigation } from '@react-navigation/native';

const backgroundImageSource = require('./assets/Background.jpg');
const cardImage = require('C:/Users/paulg/Desktop/App1/App1/assets/CardPaymentMasterCard.png');

export default function NewCardPage() {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground source={backgroundImageSource} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <FeatherIcon name="arrow-left" size={24} color={Colors.PrimaryColor} />
        </TouchableOpacity>
        <Text style={styles.title}>Payment Method</Text>
      </View>

      <View style={styles.cardImageContainer}>
        <Image source={cardImage} style={styles.cardImage} resizeMode="contain" />
      </View>

        <View style={styles.cardManagementContainer}>
        <Text style={styles.cardManagementTitle}>Add Card Information</Text>
      </View>
      <View style={styles.cardDetailsContainer}>
        <TextInput 
          style={styles.textInput2}
          placeholder="Cardholder Name"
          placeholderTextColor="#aaa"
        />
        <TextInput 
          style={styles.textInput}
          placeholder="Max Mustermann" 
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
          placeholder="**** **** **** ****"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
        />
        <TextInput 
          style={styles.textInput2}
          placeholder="Validity Date (MM/YY)"
          placeholderTextColor="#aaa"
        />
        <TextInput 
          style={styles.textInput}
          placeholder="**/**"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
        />
        <TextInput 
          style={styles.textInput2}
          placeholder="Security Number"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
        />
        <TextInput 
          style={styles.textInput}
          placeholder="***"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
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
    paddingVertical: 10,
  },
  cardImageContainer: {
    alignItems: 'center',
    top: '5%',
  },
  cardImage: {
    width: 300, 
    height: 190, 
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
  saveButtonContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  saveButton: {
    padding: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});