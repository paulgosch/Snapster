import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Font from 'expo-font';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomePage from './WelcomePage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import FirstScreen from './FirstScreen';
import AppPresentationScreen from './AppPresentationScreen';
import AppPresentationScreen2 from './AppPresentationScreen2'; // Import the new screen components
import AppPresentationScreen3 from './AppPresentationScreen3'; // Import the new screen components
import HomeScreen from './HomeScreen'; // Import the new screen component
import SettingsPage from './SettingsPage';
import SupportPage from './Supportpage';
import PrivacyPolicyPage from './PrivacyPolicyPage';
import StorePage from './StorePage';
import CheckoutPage from './CheckoutPage';
import { Provider } from 'react-redux';
import { store } from './reduxStore'; 
import { GestureHandlerRootView } from 'react-native-gesture-handler';


import {Pages} from './constants';
import TermsAndConditionsScreen from './TermsAndConditions';
const backgroundImageSource = require('./assets/Background.jpg');
const customFont = require('./assets/Neucha-Regular.otf');

const Stack = createStackNavigator();

function BackIcon() {
  const navigation = useNavigation();
  const route = useRoute();

  // Show the back icon only if the current route is not FirstScreen or WelcomePage
  if (route.name === Pages.FirstScreen || route.name === Pages.WelcomePage) {
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
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Pages.HomeScreen} headerMode="screen">
        <Stack.Screen
          name={Pages.FirstScreen}
          component={FirstScreen}
          options={{
            headerShown: false, // Hide the header for FirstScreen
          }}
        />
        <Stack.Screen
          name={Pages.WelcomePage}
          component={WelcomePage}
          options={{
            headerShown: false, // Hide the header for Welcome
          }}
        />
        <Stack.Screen
          name={Pages.LoginPage}
          component={LoginPage}
          options={{
            headerTransparent: true, // Make the header background transparent
            headerLeft: () => <BackIcon />, // Show the back icon
            headerTitleStyle: styles.headerTitle,
          }}
        />
        <Stack.Screen
          name={Pages.RegisterPage}
          component={RegisterPage}
          options={{
            headerTransparent: true, // Make the header background transparent
            headerLeft: () => <BackIcon />, // Show the back icon
            headerTitleStyle: styles.headerTitle,
          }}
        />
        <Stack.Screen
          name={Pages.AppPresentationScreen}
          component={AppPresentationScreen}
          options={{
            headerShown: false, // Hide the header for the new screen if needed
          }}
        />
        <Stack.Screen
          name={Pages.AppPresentationScreen2}
          component={AppPresentationScreen2}
          options={{
            headerShown: false, // Hide the header for the new screen if needed
          }}
        />
        <Stack.Screen
          name={Pages.AppPresentationScreen3}
          component={AppPresentationScreen3}
          options={{
            headerShown: false, // Hide the header for the new screen if needed
          }}
        />
        <Stack.Screen
          name={Pages.HomeScreen}
          component={HomeScreen}
          options={{
            headerShown: false, // Hide the header for the new screen if needed
          }}
        />
         <Stack.Screen
          name={Pages.TermsAndConditions}
          component={TermsAndConditionsScreen}
          options={{
            headerShown: false, // Hide the header for the new screen if needed
          }}
        />
         <Stack.Screen
          name={Pages.PrivacyPolicyPage}
          component={PrivacyPolicyPage}
          options={{
            headerShown: false, // Hide the header for the new screen if needed
          }}
        />
        <Stack.Screen
          name={Pages.SupportPage}
          component={SupportPage}
          options={{
            headerShown: false, // Hide the header for the new screen if needed
          }}
          
        />
        <Stack.Screen
          name={Pages.SettingsPage}
          component={SettingsPage}
          options={{
            headerShown: false, // Hide the header for the new screen if needed
          }}
        />
        <Stack.Screen
          name={Pages.StorePage}
          component={StorePage}
          options={{
            headerShown: false, // Hide the header for the new screen if needed
          }}
        />
        <Stack.Screen
          name={Pages.CheckoutPage}
          component={CheckoutPage}
          options={{
            headerShown: false, // Hide the header for the new screen if needed
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
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