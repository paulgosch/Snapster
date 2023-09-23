import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const backgroundImageSource = require('./assets/Background.jpg');
const userIconPlaceholder = require('./assets/user-icon-image-placeholder.jpg');

export default function ProfilePage() {
  const { userName, email, fullName, address, userBundle } = useSelector((state) => state.user);

  const handleChangeFullName = () => {
    // Implement logic to navigate to the screen where the user can change their full name
  };

  const handleChangePassword = () => {
    navigation.navigate('ForgotPasswordPage');
    // Implement logic to change the password
  };

  const navigation = useNavigation(); // Use the useNavigation hook here

  const handleGoBack = () => {
    navigation.goBack(); // Define a function to handle going back
  };

  const handleMyPicturesPage = () => {
    navigation.navigate('MyPicturesPage');
  };

  const handleMyOrdersPage = () => {
    navigation.navigate('MyOrdersPage');
  };

  const handleaddAdress = () => {
    navigation.navigate();
  };
  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        { 
          text: "Delete", 
          onPress: async () => {
            // Send a POST request to the Google Script
            try {
              const response = await fetch('https://script.google.com/macros/s/AKfycbzUAcoyzw-N9foLLYnqA5peLsJIXu6DmjKowlNVAWotXQIU_VLbny7GTrqsbhTsRUfy/exec', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: email // Assuming 'email' is the user's email from the state or redux store
                }),
              });
  
              if (response.ok) {
                // Handle successful email sending here
                console.log('Email sent successfully');
                
                // Inform the user about the 48-hour delay
                Alert.alert(
                  "Account Deletion in Progress",
                  "Your account deletion request has been received. Please note that it can take up to 48 hours to delete your account.",
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        // Navigate to the WelcomeScreen after the user acknowledges the alert
                        navigation.navigate('WelcomeScreen');
                      }
                    }
                  ]
                );
              } else {
                console.error('Failed to send email');
              }
            } catch (error) {
              console.error('Error sending email:', error);
            }
          } 
        }
      ]
    );
  };

  return (
    <ImageBackground source={backgroundImageSource} style={styles.background}>
      <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>
        <View style={styles.profileImageContainer}>
        <Image source={userIconPlaceholder} style={styles.profileImage} />
        </View>
        <View style={styles.accountContainer}>
          <Text style={styles.accountHeaderText}>My Account</Text>
          <View style={styles.accountDetails}>
            <View style={styles.accountRow}>
              <Text style={[styles.accountText, styles.accountLabel]}>Name:</Text>
              <Text style={[styles.accountTextGrey, styles.accountValue]}>{fullName}</Text>
              <TouchableOpacity onPress={handleChangeFullName}>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.accountRow}>
              <Text style={[styles.accountText, styles.accountLabel]}>Password:</Text>
              <Text style={[styles.accountTextGrey, styles.accountValue]}>********</Text>
              <TouchableOpacity onPress={handleChangePassword}>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.accountRow}>
              <Text style={[styles.accountText, styles.accountLabel]}>Username:</Text>
              <Text style={[styles.accountTextGrey, styles.accountValue]}>{userName}</Text>
            </View>

            <View style={styles.accountRow}>
              <Text style={[styles.accountText, styles.accountLabel]}>Email:</Text>
              <Text style={[styles.accountTextGrey, styles.accountValue]}>{email}</Text>
            </View>

            <View style={styles.accountRow}>
              <Text style={[styles.centeredText, styles.accountLabel]}>My Adress</Text>
            </View>
            <View style={styles.accountRow}>
          <Text style={styles.accountText}>Address: {address}</Text>
          <TouchableOpacity onPress={handleaddAdress}>
          <Text style={styles.addAddressText}>add address</Text>
         </TouchableOpacity>
</View>
          
          </View>
        </View>

        <View style={styles.accountContainer}>
          <Text style={styles.accountHeaderText}>My Pictures</Text>
          <View style={styles.accountDetails}>
          <TouchableOpacity style={styles.myPictures} onPress={handleMyPicturesPage}>
          <Text style={styles.myPicturesText}>My Snap-Bundles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.myPictures} onPress={handleMyOrdersPage}>
          <Text style={styles.myPicturesText}>My Orders</Text>
        </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={handleDeleteAccount} style={styles.deleteAccountButton}>
        <Text style={styles.changeText}>Delete Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
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
      marginTop: 40, // Add top margin to lower all elements
    },
    header: {
      alignItems: 'center',
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
    profileImageContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    profileImage: {
      width: 125,
      height: 125,
      borderRadius: 75,
    },
    detailsContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      color: 'grey',
      marginBottom: 4,
    },
    value: {
      fontSize: 18,
      color: 'grey',
      marginBottom: 16,
    },
    accountContainer: {
        width: '100%', // Adjust the width as needed
        marginVertical: 10,
        padding: 20,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        backgroundColor: 'white',
        alignItems: 'center',
      },
    accountHeaderText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',
      marginBottom: 10,
    },
    accountDetails: {
      width: '100%', // Adjusted to cover 100% of the accountContainer width
    },
    accountRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between', // Add this line
      marginBottom: 5,
    },
    accountText: {
      fontSize: 16,
      color: 'black',
    },
    accountTextGrey: {
      color: 'grey',
    },
    accountLabel: {
      flex: 1,
    },
    accountValue: {
      flex: 2,
    },
    changeText: {
      color: '#FF9817',
    },
    button: {
      backgroundColor: '#FF9817',
      padding: 12,
      borderRadius: 4,
      alignItems: 'center',
      marginBottom: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
    backButton: {
      position: 'absolute',
      top: 40,
      left: 20,
      zIndex: 1, // Ensure the back button is above other elements
      padding: 10,
    },
    deleteAccountButton: {
      alignSelf: 'center', // Center the button horizontally
      paddingBottom: 10, // Add bottom padding
    },
    deleteAccountText: {
      color: '#FF9817', // Use the same orange color as the "Change" text
      fontSize: 16, // Set a font size for the text
    },
    centeredText: {
      textAlign: 'center',
      fontSize: 14, // Adjust the font size to be slightly smaller
      fontWeight: 'bold',
      color: 'black',
      paddingTop: 10,
    },
    myPictures: {
      marginBottom: 20,
      padding: 10,
      borderWidth: 1,
      borderColor: 'orange',
      borderRadius: 8,
      alignItems: 'center',
    },
    myPicturesText: {
      color: 'orange',
      fontSize: 14,
    },
    addAddressText: {
      color: '#FF9817', // Use the same orange color as the "Change" text
      fontSize: 16, // Set a font size for the text
    },
  });