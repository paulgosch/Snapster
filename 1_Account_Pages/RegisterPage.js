import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Alert, ImageBackground, KeyboardAvoidingView, ActivityIndicator,Image } from 'react-native';
import * as Font from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import AppPresentationScreen from '../2_App_Pages/AppPresentationScreen'; // Import the new screen component

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../firebaseConfig';
import { sendEmailVerification } from "firebase/auth";
import { Pages, Colors, Fonts } from '../constants';
import { useSelector, useDispatch } from 'react-redux';

const BG_linesSource = require('.././assets/BG_lines.png');

const isPasswordStrongEnough = (password) => {
  // Password must have at least 6 characters, one number, and one uppercase letter
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
  return passwordRegex.test(password);
};

export default function RegisterScreen() {
  const dispatch = useDispatch();
  const { userName, email, fullName, address } = useSelector((state) => state.user);

  const [fontLoaded, setFontLoaded] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('')
  const [loading, setLoading] = useState(false);
  const [agreeChecked, setAgreeChecked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();
  const handleTermsAndConditions = () => {
    navigation.navigate(Pages.TermsAndConditions); // Navigate to the 'TermsAndConditions' screen
  };

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'neucha-regular': require('.././assets/Neucha-Regular.otf'),
      });
      setFontLoaded(true);
    }
    loadFont();
  }, []);

  const handleRegister = async () => {
    if ( !userName) {
      // Show an alert if the name or username is missing
      Alert.alert('Name and Username are required fields');
      return;
    }

    if (agreeChecked) {
      setLoading(true);

      if (password !== confirmPassword) {
        // Show an alert if the password and confirm password fields don't match
        Alert.alert('Password and Confirm Password fields must match');
        setLoading(false);
        return;
      }
      if (!isPasswordStrongEnough(password)) {
        // Show an alert if the password is not strong enough
        Alert.alert(
          'Password Requirements',
          'Password must have at least 6 characters, one number, and one uppercase letter'
        );
        setLoading(false);
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Get the user from the userCredential object
        const currentUser = userCredential.user;

        // Check if the user object exists and send the verification email
        if (currentUser) {
          await sendEmailVerification(currentUser);
          Alert.alert('Verification email sent!', 'Please check your email and verify your account.');
        } else {
          console.error("Unable to send verification email. Current user not found.");
          Alert.alert('Error', 'Unable to send verification email. Please contact support.');
        }

        // Navigate to a different screen (e.g., AppPresentationScreen) after sending the verification email
        navigation.navigate(Pages.AppPresentationScreen);
      } catch (error) {
        console.log(error);
        alert('Sign up failed: ' + error);
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert('You must agree to the T&C to continue');
    }
  };

  const backgroundImageSource = require('.././assets/Background.jpg');

  if (!fontLoaded) {
    return null; // Wait for the font to load
  }

  return (
    <ImageBackground source={backgroundImageSource} style={styles.backgroundImage} resizeMode="cover">
      <Image source={BG_linesSource} style={styles.BG_lines} />
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.whiteContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Snapster</Text>
          </View>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#2A4D69"
          value={userName}
          onChangeText={text => dispatch({
            type: 'SET_USERNAME',
            payload: text,
          })}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#2A4D69"
          value={email}
          onChangeText={text => dispatch({
            type: 'SET_EMAIL',
            payload: text,
          })}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#2A4D69"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.eyeIconContainer}
          >
            <Icon name={passwordVisible ? 'eye' : 'eye-slash'} size={18} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm Password"
            placeholderTextColor="#2A4D69"
            secureTextEntry={!confirmPasswordVisible}
            value={confirmPassword}
            onChangeText={setconfirmPassword}
          />
          <TouchableOpacity
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            style={styles.eyeIconContainer}
          >
            <Icon name={confirmPasswordVisible ? 'eye' : 'eye-slash'} size={18} color="white" />
          </TouchableOpacity>
        </View>

        {/* Wrap the checkbox, "Agree with", and "Terms and Conditions" in a view container */}
        <View style={styles.termsContainer}>
          <TouchableOpacity onPress={() => setAgreeChecked(!agreeChecked)}>
            <Icon
              name={agreeChecked ? 'check-square-o' : 'square-o'}
              size={18}
              color="white"
              style={styles.checkbox}
            />
          </TouchableOpacity>
          <Text style={styles.agreeText}>Agree with</Text>
          <TouchableOpacity onPress={handleTermsAndConditions}>
            <Text style={styles.termsText}>Terms and Conditions</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="white" />
          </View>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Sign-up</Text>
          </TouchableOpacity>
        )}
    </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}



const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  container: {
    marginTop: 20,
    justifyContent: 'center',
    padding: 20,
    marginTop: '50%',
  },
  whiteContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontFamily: Fonts.Title,
    fontSize: 40,
    fontWeight: 'bold',
    color: '#2A4D69', // Changed color to blue
    textAlign: 'center',
  },
  titleContainer: {
    alignItems: 'center', // Center the title horizontally within the container
    marginBottom: 10,
    
  },
  input: {
    height: 40,
    borderColor: '#2A4D69',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 10,
    color: Colors.PrimaryColor,
    
  },
  button: {
    borderWidth: 1,
    borderColor: '#2A4D69',
    backgroundColor: '#2A4D69',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignSelf: 'center', // Center the button horizontally
    width: '30%', // Make the button half as wide as the parent
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: Fonts.Button,
  },
  termsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', // Align items vertically
    marginTop: 10,
    paddingBottom: 15,
    
  },
  agreeText: {
    fontSize: 14,
    color: '#2A4D69',
    marginLeft: 5, // Add some space between the checkbox and "Agree with"
    fontFamily: Fonts.BodyText,
  },
  termsText: {
    fontSize: 14,
    color: '#2A4D69',
    textDecorationLine: 'underline',
    textDecorationStyle: 'dotted',
    marginLeft: 5, // Add some space between "Agree with" and "Terms and Conditions"
    fontFamily: Fonts.Button,
  },
  checkbox: {
    marginRight: 5, // Add some space between "Terms and Conditions" and the checkbox
    color: '#2A4D69',
  },
  loadingContainer: {
    height: 40, // Fixed height to keep the container from expanding
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  loadingText: {
    color: '#2A4D69',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Fonts.Button,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#2A4D69',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 10,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    color: Colors.PrimaryColor,
  },
  eyeIconContainer: {
    padding: 10,
    color: '#2A4D69',
   
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
});