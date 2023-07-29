import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Font from 'expo-font';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomePage from './WelcomePage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import FirstScreen from './FirstScreen';

const backgroundImageSource = require('./assets/Background.jpg');
const customFont = require('./assets/Neucha-Regular.otf');

const Stack = createStackNavigator();

function BackIcon() {
  const navigation = useNavigation();
  const route = useRoute();

  // Show the back icon only if the current route is not FirstScreen or Welcome
  if (route.name === 'FirstScreen' || route.name === 'Welcome') {
    return null;
  }

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name="arrow-left" size={24} color="white" style={styles.backIcon} />
    </TouchableOpacity>
  );
}

function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'neucha-regular': customFont,
      });
      setFontLoaded(true);
    }
    loadFont();
  }, []);

  if (!fontLoaded) {
    return null; // Wait for the font to load
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FirstScreen" headerMode="screen">
        <Stack.Screen
          name="FirstScreen"
          component={FirstScreen}
          options={{
            headerShown: false, // Hide the header for FirstScreen
          }}
        />
        <Stack.Screen
          name="Welcome"
          component={WelcomePage}
          options={{
            headerShown: false, // Hide the header for Welcome
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{
            headerTransparent: true, // Make the header background transparent
            headerLeft: () => <BackIcon />, // Show the back icon
            headerTitleStyle: styles.headerTitle,
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterPage}
          options={{
            headerTransparent: true, // Make the header background transparent
            headerLeft: () => <BackIcon />, // Show the back icon
            headerTitleStyle: styles.headerTitle,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
    alignItems: 'center',
  },
  upperHalf: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    marginBottom: 5,
    color: 'white',
  },
  title: {
    fontFamily: 'neucha-regular', // Apply the custom font
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
  header: {
    backgroundColor: 'transparent', // Make the header background transparent
    elevation: 0, // Remove the shadow for Android
  },
  headerTitle: {
    fontFamily: 'neucha-regular', // Apply the custom font to the header title
    fontSize: 24,
    color: 'white',
  },
  backIcon: {
    marginLeft: 10,
  },
});

export default App;