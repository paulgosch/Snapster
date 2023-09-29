import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, ImageBackground, KeyboardAvoidingView, View,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Pages, Colors, Fonts } from './constants';

export default function CreateNewPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleCreateNewPassword = async () => {
    // Implement your password reset logic here
    setLoading(true);

    // Simulate a delay for demonstration purposes
    setTimeout(() => {
      setLoading(false);
      alert('Password successfully changed.');

      // Navigate to the LoginPage or any other page as needed
      navigation.navigate(Pages.LoginPage);
    }, 2000);
  };

  const backgroundImageSource = require('./assets/Background.jpg');
  const BG_linesSource = require('./assets/BG_lines.png');

  return (
    <ImageBackground source={backgroundImageSource} style={styles.backgroundImage} resizeMode="cover">
      <Image source={BG_linesSource} style={styles.BG_lines} />
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.title}>Create New Password</Text>
        <TextInput
          style={styles.input}
          placeholder="New Password"
          placeholderTextColor={Colors.PrimaryColor}
          secureTextEntry={true}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor={Colors.PrimaryColor}
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {loading ? (
          <View style={styles.loadingContainer}>
            <View style={styles.loadingContent}>
              <Text style={styles.loadingText}>Changing Password...</Text>
            </View>
          </View>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleCreateNewPassword}>
            <Text style={styles.buttonText}>Change Password</Text>
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
    fontFamily: Fonts.Title,
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