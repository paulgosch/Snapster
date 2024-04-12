import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Font from 'expo-font';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomePage from './2_App_Pages/WelcomePage';
import LoginPage from './1_Account_Pages/LoginPage';
import RegisterPage from './1_Account_Pages/RegisterPage';
import FirstScreen from './2_App_Pages/FirstScreen';
import AppPresentationScreen from './2_App_Pages/AppPresentationScreen';
import HomeScreen from './2_App_Pages/HomeScreen'; // Import the new screen component
import SettingsPage from './2_App_Pages/SettingsPage';
import SupportPage from './4_Legal_&_Support_Pages/Supportpage';
import PrivacyPolicyPage from './4_Legal_&_Support_Pages/PrivacyPolicyPage';
import StorePage from './3_Store_&_Payment_Pages/StorePage';
import CheckoutPage from './3_Store_&_Payment_Pages/CheckoutPage';
import ForgotPasswordPage from './1_Account_Pages/ForgotPasswordPage';
import CreateNewPasswordPage from './1_Account_Pages/CreateNewPasswordPage';
import AccountPage from './1_Account_Pages/AccountPage';
import MyPicturesPage from './1_Account_Pages/MyPicturesPage';
import MyOrdersPage from './1_Account_Pages/MyOrdersPage';
import PaymentSuccessPage from './3_Store_&_Payment_Pages/PaymentSuccessPage';
import { Provider } from 'react-redux';
import { store } from './reduxStore';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StripeProvider } from '@stripe/stripe-react-native'
import { Pages, Colors, Fonts } from './constants';


import TermsAndConditionsScreen from './4_Legal_&_Support_Pages/TermsAndConditions';
import Paypal from './3_Store_&_Payment_Pages/Paypal';

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
    <StripeProvider publishableKey="pk_test_51Ns6QXHzXDpjYI6L16I1XG8xTTP9pqSkRNHZKgs7bWdFEDuUhs1cfTIEXXmio6pB3suP9ES6X6jMbszfHnENLvy500Wgyem90b" merchantIdentifier="merchantId">
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
                gestureEnabled: false,
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
            <Stack.Screen
              name={Pages.Paypal}
              component={Paypal}
              options={{
                headerShown: false, // Hide the header for the new screen if needed
              }}
            />
            <Stack.Screen
              name={Pages.ForgotPasswordPage}
              component={ForgotPasswordPage}
              options={{
                headerShown: false, // Hide the header for the new screen if needed
              }}
            />
            <Stack.Screen
              name={Pages.CreateNewPasswordPage}
              component={CreateNewPasswordPage}
              options={{
                headerShown: false, // Hide the header for the new screen if needed
              }}
            />
            <Stack.Screen
              name={Pages.AccountPage}
              component={AccountPage}
              options={{
                headerShown: false, // Hide the header for the new screen if needed
              }}
            />
            <Stack.Screen
              name={Pages.MyPicturesPage}
              component={MyPicturesPage}
              options={{
                headerShown: false, // Hide the header for the new screen if needed
              }}
            />
            <Stack.Screen
              name={Pages.MyOrdersPage}
              component={MyOrdersPage}
              options={{
                headerShown: false, // Hide the header for the new screen if needed
              }}
            />
            <Stack.Screen
              name={Pages.PaymentSuccessPage}
              component={PaymentSuccessPage}
              options={{
                headerShown: false, // Hide the header for the new screen if needed
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </StripeProvider>

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
    fontFamily: Fonts.Title,
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
  header: {
    backgroundColor: 'transparent', // Make the header background transparent
    elevation: 0, // Remove the shadow for Android
  },
  headerTitle: {
    fontFamily: Fonts.Title,
    fontSize: 24,
    color: 'white',
  },
  backIcon: {
    marginLeft: 10,
  },
});

export default App;