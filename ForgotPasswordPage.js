import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, ImageBackground, KeyboardAvoidingView, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Pages, Colors, Fonts } from './constants';
import { FIREBASE_AUTH } from './firebaseConfig'; // Adjust the path as necessary
import { sendPasswordResetEmail } from 'firebase/auth'; // Import the function from the auth package

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleResetPassword = async () => {
    setLoading(true);

    try {
      await sendPasswordResetEmail(FIREBASE_AUTH, email); // Use the function with your FIREBASE_AUTH instance
      alert(`A password reset link has been sent to ${email}`);
    } catch (error) {
      console.error(error);
      alert("Error sending password reset email. Please try again.");
    }

    setLoading(false);
    navigation.navigate(Pages.VerificationPage);
  };

  const backgroundImageSource = require('./assets/Background.jpg');
  const BG_linesSource = require('./assets/BG_lines.png');

  return (
    <ImageBackground source={backgroundImageSource} style={styles.backgroundImage} resizeMode="cover">
      <Image source={BG_linesSource} style={styles.BG_lines} />
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.description}>
          Enter your email address, and we'll send you a password reset link.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={Colors.PrimaryColor}
          value={email}
          onChangeText={setEmail}
        />
        {loading ? (
          <View style={styles.loadingContainer}>
            <View style={styles.loadingContent}>
              <Text style={styles.loadingText}>Sending...</Text>
            </View>
          </View>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Reset Password</Text>
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
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.PrimaryColor,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: Fonts.Title,
  },
  description: {
    fontSize: 16,
    color: Colors.PrimaryColor,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: Fonts.BodyText,
  },
  input: {
    height: 40,
    borderColor: Colors.PrimaryColor,
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    color: Colors.PrimaryColor,
    borderRadius: 8,
  },
  button: {
    backgroundColor: Colors.SecondaryColor,
    borderWidth: 1,
    borderColor: Colors.SecondaryColor,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignSelf: 'center',
    width: '50%',
  },
  buttonText: {
    color: Colors.PrimaryColor,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: Fonts.Button,
  },
  loadingContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  loadingText: {
    color: Colors.PrimaryColor,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Fonts.Button,
  },
  backText: {
    color: Colors.PrimaryColor,
    fontSize: 16,
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop: 20,
    fontFamily: Fonts.Button,
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