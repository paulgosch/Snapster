import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import {Fonts } from '../constants';

const backgroundImageSource = require('.././assets/Background.jpg');
const userIconPlaceholder = require('.././assets/user-icon-image-placeholder.png');
const BG_linesSource = require('.././assets/BG_lines.png');


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
  
  const handleProfilPicture = () => {
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
          onPress: () => { },
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
                  "Your account deletion request has been received. Please note that it can take up to 48 hours to delete your account. We will notify you as soon as the process has been completed.",
                  [
                    {
                      text: "Okay",
                      onPress: () => {
                        navigation.navigate('WelcomePage');
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
        <Image source={BG_linesSource} style={styles.BG_lines} />
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.header}>
                <Text style={styles.title}>Profile Page</Text>
            </View>
            <View style={styles.profileImageContainer}>
                <Image source={userIconPlaceholder} style={styles.profileImage} />
                <TouchableOpacity style={styles.cameraIconContainer} onPress={handleProfilPicture}>
                    <Feather name="camera" size={24} color="#2A4D69" />
                </TouchableOpacity>
            </View>
            <View style={styles.accountContainer}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Account Information</Text>
                </View>
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
                        <Text style={styles.invisibleText}>Change</Text>
                    </View>

                    <View style={styles.accountRow}>
                        <Text style={[styles.accountText, styles.accountLabel]}>Email:</Text>
                        <Text style={[styles.accountTextGrey, styles.accountValue]}>{email}</Text>
                        <Text style={styles.invisibleText}>Change</Text>
                    </View>

                    <View style={styles.accountRow}>
                        <Text style={[styles.accountText, styles.accountLabel]}>My Adress:</Text>
                    </View>
                    <View style={styles.accountRow}>
                        <Text style={styles.accountTex}>{address}</Text>
                        <TouchableOpacity onPress={handleaddAdress}>
                            <Text style={styles.addAddressText}>add address</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                <View style={styles.divider}></View> 
                
                <View style={styles.subButton}>
                    <Text style={styles.subButtonText}>My Pictures</Text>
                </View>
                <View style={styles.accountDetails}>
                <TouchableOpacity style={styles.subMyPictures} onPress={handleMyPicturesPage}>
                        <Text style={styles.subMyPicturesText}>My Snap-Bundles</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subMyPictures} onPress={handleMyOrdersPage}>
                        <Text style={styles.subMyPicturesText}>My Orders</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.divider}></View> 
                <TouchableOpacity onPress={handleDeleteAccount} style={styles.deleteAccountButton}>
                <Text style={styles.deleteAccountText}>Delete Account</Text>
            </TouchableOpacity>
            </View>
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
    fontFamily: Fonts.Title,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#E2CAAE'
  },
  profileImageContainer: {
    flexDirection: 'row', // Ensure items are on the same row
    justifyContent: 'center', // Center items horizontally
    alignItems: 'center', // Center items vertically
    marginBottom: 20,
    position: 'relative', // Set to relative to allow absolute positioning of children
},
cameraIconContainer: {
    position: 'absolute',
    right: '35%',
    top: '65%',
    borderRadius: 8, // To make it circular
    padding: 5, // Padding around the icon
    backgroundColor: '#E6EAEA',
},
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 75,
    backgroundColor: 'white',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#707070',
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    color: '#707070',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  accountHeaderText: {
    fontFamily: Fonts.Subtitle,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2A4D69',
    marginBottom: 10,
  },
  accountDetails: {
    width: '100%', // Adjusted to cover 100% of the accountContainer width

  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'left',
    justifyContent: 'space-between', // Add this line
    marginBottom: 5,
  },
  accountText: {

    fontSize: 16,
    color: '#2A4D69',
    fontFamily: Fonts.BodyText,
    width: "75%",
    alignSelf: "left",
    alignItems: "left"
  },
  accountTextGrey: {
    color: '#707070',
    fontFamily: Fonts.BodyText,
    alignItems: "left",
    alignSelf: "left",

  },
  accountLabel: {
    flex: 1,
  },
  accountValue: {
    flex: 2,
    alignItems: "left",
    textAlign: 'left',
  },
  changeText: {
    color: '#2A4D69',
    fontFamily: Fonts.BodyText,

  },
  invisibleText: {
    color: '#2A4D69',
    opacity: "0",
    fontFamily: Fonts.BodyText,

  },
  button: {
    backgroundColor: '#2A4D69',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: Fonts.Button,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1, // Ensure the back button is above other elements
    padding: 10,
  },
  deleteAccountButton: {
    alignSelf: 'left', // Center the button horizontally
    paddingBottom: 10, // Add bottom padding
  },
  deleteAccountText: {
    fontSize: 16, // Set a font size for the text
    fontFamily: Fonts.Button,
    color: '#2A4D69',
  },
  centeredText: {
    textAlign: 'center',
    fontSize: 14, // Adjust the font size to be slightly smaller
    fontWeight: 'bold',
    color: '#2A4D69',
    paddingTop: 10,
    fontFamily: Fonts.BodyText,
  },
  myPictures: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#2A4D69',
    borderRadius: 8,
    alignItems: 'center',
  },
  myPicturesText: {
    color: '#2A4D69',
    fontSize: 14,
    fontFamily: Fonts.Button,
  },
  addAddressText: {
    color: '#2A4D69',
    fontSize: 16, // Set a font size for the text
    fontFamily: Fonts.BodyText,
  },
  BG_lines: {
    position: 'absolute', // Absolute position
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Cover the entire screen
  },
  divider: {
    height: 1, // height of the divider
    width: '90%', // width of the divider
    backgroundColor: '#E2CAAE', // color of the divider
    marginVertical: 20, // space above and below the divider
    alignSelf: 'center' // center the divider horizontally
  },
  subButton: {
    backgroundColor: 'rgba(42, 77, 105, 0.7)', 
    padding: 10, // Reduced padding
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
},
subButtonText: {
    color: '#fff',
    fontSize: 16, // Reduced font size
    fontFamily: Fonts.Button,
},
subAccountDetails: {
    width: '100%',
    padding: 10, // Reduced padding
},
subMyPictures: {
    marginBottom: 10, // Reduced margin
    padding: 8, // Reduced padding
    borderWidth: 0.5, // Reduced border width
    borderColor: 'rgba(42, 77, 105, 0.5)',
    borderRadius: 8,
    alignItems: 'center',
},
subMyPicturesText: {
    color: 'rgba(42, 77, 105, 0.5)',
    fontSize: 16, // Reduced font size
    fontFamily: Fonts.Button,
},
});
