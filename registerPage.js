import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Alert, ImageBackground, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import AppPresentationScreen from './AppPresentationScreen'; // Import the new screen component
<<<<<<< HEAD
import TermsAndConditions from './TermsAndConditions';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
=======
>>>>>>> parent of 7b808c5 (failed to connect a terms and conditions page)

export default function RegisterScreen() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [fullname, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreeChecked, setAgreeChecked] = useState(false);
  
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();

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
    if(agreeChecked){
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);      
      console.log(response);
      Alert.alert('Congratulations!', 'You have successfully registered with Snapster. Welcome to our community of photo enthusiasts! 🎉')
      navigation.navigate('Home');

    } catch(error){
      console.log(error)
      alert("Sign in failed: " + error);
    } finally {
      setLoading(false);
    }
  }
  else{
    Alert("You must agree to the T&C to continue")
  }
  };

  const backgroundImageSource = require('./assets/Background.jpg');

  if (!fontLoaded) {
    return null; // Wait for the font to load
  }

  return (
    <ImageBackground source={backgroundImageSource} style={styles.backgroundImage} resizeMode="cover">
      
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.title}>Snapster</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="white"
          value={fullname}
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
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="white"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <View style={styles.termsContainer}>
          <TouchableOpacity onPress={() => setAgreeChecked(!agreeChecked)}>
            <Icon
              name={agreeChecked ? 'check-square-o' : 'square-o'}
              size={18}
              color="white"
              style={styles.checkbox}
            />
          </TouchableOpacity>
          <Text style={styles.agreeText}>Agree with </Text>
<<<<<<< HEAD

          <TouchableOpacity onPress={handleTermsAndConditions}>
            <Text style={styles.termsText}>Terms and Conditions</Text>
          </TouchableOpacity>
        {loading ? <Text>LOADING</Text> : 
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
        }
=======
          <Text style={styles.termsText}>Terms and Conditions</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
>>>>>>> parent of 7b808c5 (failed to connect a terms and conditions page)
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
    fontFamily: 'neucha-regular', // Apply the custom font
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center', // Center the title horizontally
    marginTop: 40, // Adjust the marginTop value as needed
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
    marginTop: 10, // Adjust the marginTop value as needed
  },
  agreeText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    paddingBottom: 15,
  },
  termsText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    textDecorationLine: 'underline',
    paddingBottom: 15,
  },
  checkbox: {
    marginRight: 5,
  },
});