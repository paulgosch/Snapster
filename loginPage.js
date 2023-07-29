import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, ImageBackground, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); // Use the useNavigation hook here

  const handleLogin = () => {
    // Here, you can implement your login logic if needed

    // Assuming the 'HomeScreen' is a valid route in your navigation stack, navigate to it
    navigation.navigate('HomeScreen');
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
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="white"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
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
  title: {
    fontFamily: 'neucha-regular', // Apply the custom font
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center', // Center the title horizontally
    marginTop: 40, // Adjust the marginTop value as needed
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
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
});