import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Alert, ImageBackground, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import AppPresentationScreen from './AppPresentationScreen'; // Import the new screen component
import TermsAndConditions from './TermsAndConditions';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';
import { Pages } from './constants';

export default function RegisterScreen() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('')
  const [email, setEmail] = useState('');
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
        'neucha-regular': require('./assets/Neucha-Regular.otf'),
      });
      setFontLoaded(true);
    }
    loadFont();
  }, []);

  const handleRegister = async () => {
    if (agreeChecked) {
      setLoading(true);
  
      if (password !== confirmPassword) {
        // Show an alert if the password and confirm password fields don't match
        Alert.alert('Password and Confirm Password fields must match');
        setLoading(false);
        return;
      }
  
      try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        console.log(response);
  
        // Pass the user data as parameters to the SettingsPage
        navigation.navigate(Pages.AppPresentationScreen, {
          fullName: fullName,
          username: username,
          email: email,
        });
      } catch (error) {
        console.log(error);
        alert('Sign in failed: ' + error);
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert('You must agree to the T&C to continue');
    }
  };

  const backgroundImageSource = require('./assets/Background.jpg');

  if (!fontLoaded) {
    return null; // Wait for the font to load
  }

  return (
    <ImageBackground source={backgroundImageSource} style={styles.backgroundImage} resizeMode="cover">
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Snapster</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="white"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="white"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="white"
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="white"
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
            placeholderTextColor="white"
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
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        )}
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
    marginTop: 100,
  },
  title: {
    fontFamily: 'neucha-regular', // Apply the custom font
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center', // Center the title horizontally
    marginTop: 60, // Adjust the marginTop value as needed
  },
  titleContainer: {
    alignItems: 'center', // Center the title horizontally within the container
    marginTop: 40, // Adjust the marginTop value to move only the title "Snapster"
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    color: 'white',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'white',
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
    color: 'white',
    marginLeft: 5, // Add some space between the checkbox and "Agree with"
  },
  termsText: {
    fontSize: 14,
    color: 'white',
    textDecorationLine: 'underline',
    textDecorationStyle: 'dotted',
    marginLeft: 5, // Add some space between "Agree with" and "Terms and Conditions"
  },
  checkbox: {
    marginRight: 5, // Add some space between "Terms and Conditions" and the checkbox
  },
  loadingContainer: {
    height: 40, // Fixed height to keep the container from expanding
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparent background for the text container
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    color: 'white',
  },
  eyeIconContainer: {
    padding: 10,
  },
});