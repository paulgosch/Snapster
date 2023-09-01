import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, ImageBackground, KeyboardAvoidingView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Pages, Colors } from './constants';

export default function VerificationPage() {
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeValid, setIsCodeValid] = useState(false);
  const navigation = useNavigation();

  // Simulated email verification logic --> this is still missing
  const verifyCode = () => {     
      navigation.navigate(Pages.CreateNewPasswordPage);
  };

  const backgroundImageSource = require('./assets/Background.jpg');

  return (
    <ImageBackground source={backgroundImageSource} style={styles.backgroundImage} resizeMode="cover">
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.title}>Verification</Text>
        <Text style={styles.description}>
          Please enter the verification code sent to your email:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Verification Code"
          placeholderTextColor={Colors.PrimaryColor}
          value={verificationCode}
          onChangeText={setVerificationCode}
        />
        {isCodeValid ? (
          <View style={styles.loadingContainer}>
            <View style={styles.loadingContent}>
              <Text style={styles.loadingText}>Verification successful!</Text>
            </View>
          </View>
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={verifyCode}>
              <Text style={styles.buttonText}>Verify Code</Text>
            </TouchableOpacity>
            {verificationCode !== '' && (
              <Text style={styles.errorText}>Invalid verification code. Please try again.</Text>
            )}
          </>
        )}
        <TouchableOpacity onPress={() => navigation.navigate(Pages.LoginPage)}>
          <Text style={styles.backText}>Back to Login</Text>
        </TouchableOpacity>
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
  },
  description: {
    fontSize: 16,
    color: Colors.PrimaryColor,
    textAlign: 'center',
    marginBottom: 20,
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
  },
  backText: {
    color: Colors.PrimaryColor,
    fontSize: 16,
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop: 20,
  },
});