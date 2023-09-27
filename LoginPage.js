import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, ImageBackground, KeyboardAvoidingView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';
import { Pages, Colors, Fonts } from './constants';
import { useSelector, useDispatch } from 'react-redux';

export default function LoginPage() {
  const dispatch = useDispatch();
  const { userName } = useSelector((state) => state.user);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation(); // Use the useNavigation hook here
  const auth = FIREBASE_AUTH;

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, userName, password);
      console.log(response);
      navigation.navigate(Pages.HomeScreen);
      dispatch({ type: 'SET_USER', payload: { userName, email } });

    } catch (error) {
      console.log(error)
      alert("Sign in failed: " + error);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate(Pages.ForgotPasswordPage);
  };

  const backgroundImageSource = require('./assets/Background.jpg');


  return (
    <ImageBackground source={backgroundImageSource} style={styles.backgroundImage} resizeMode="cover">
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.title}>Snapster</Text>
        <TextInput
          style={styles.input}
          placeholder="Username or Email"
          placeholderTextColor="white"
          value={userName}
          onChangeText={text => dispatch({
            type: 'SET_USERNAME',
            payload: text,
          })}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="white"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Forgot Password</Text>
        </TouchableOpacity>
        {loading ? (
          <View style={styles.loadingContainer}>
            <View style={styles.loadingContent}>
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          </View>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
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
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: Colors.PrimaryColor,
    textAlign: 'center', // Center the title horizontally
    padding: 10,
    fontFamily: Fonts.Title,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    color: Colors.PrimaryColor,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignSelf: 'center',
    width: '30%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: Fonts.Button,
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
    color: Colors.PrimaryColor,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Fonts.Button,
  },
  forgotPassword: {
    color: Colors.PrimaryColor,
    fontSize: 16,
    textDecorationLine: 'underline', // Add underline style
    marginBottom: 10, // Add some spacing between "Forgot Password" and the login button
    textAlign: 'center',
    paddingTop: 10,
    marginBottom: 20,
    fontFamily: Fonts.Button,
  },
});