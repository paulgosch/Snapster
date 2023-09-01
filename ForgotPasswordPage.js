import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, ImageBackground, KeyboardAvoidingView, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Pages, Colors } from './constants';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleResetPassword = async () => {
    // Implement your password reset logic here
    setLoading(true);

    // Simulate a delay for demonstration purposes
    setTimeout(() => {
      setLoading(false);
      alert(`A password reset link has been sent to ${email}`);
    }, 2000);
  };

  const backgroundImageSource = require('./assets/Background.jpg');

  return (
    <ImageBackground source={backgroundImageSource} style={styles.backgroundImage} resizeMode="cover">
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