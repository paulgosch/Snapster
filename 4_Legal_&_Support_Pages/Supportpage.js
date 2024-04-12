import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Image } from 'react-native'; // Import ScrollView
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Linking } from 'react-native';
import { Pages, Colors, Fonts } from '../constants';

const BG_linesSource = require('.././assets/BG_lines.png');

export default function SupportScreen() {
  const navigation = useNavigation(); // Use the useNavigation hook here

  const [showAnswers, setShowAnswers] = useState({});

  const handleGoBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  const handleMoreQuestions = () => {
    // Open the default email app with the specified recipient
    Linking.openURL('mailto:snapster.germany@gmail.com');
  };

  const questionsAndAnswers = [
    {
      question: "How does Snapster turn digital photos into hardcopy prints?",
      answer:
        "Snapster's revolutionary app uses advanced digital printing technology to transform your digital photos into beautiful hardcopy prints. Simply snap a picture using the app, and we'll take care of the rest, ensuring that each print captures the essence and quality of your original photo.",
    },
    {
      question: "What types of prints can I create with Snapster?",
      answer:
        "At the moment, we offer the popular 10x15 centimeter size for prints. However, we are actively working on introducing additional sizes and formats to provide more options and cater to your preferences. Stay tuned for updates as we expand our printing capabilities to offer an even wider range of choices for our valued customers.",
    },
    {
      question: "How long does it take to receive my printed photos?",
      answer:
        "The delivery time for your printed photos may vary depending on your location and the type of print you choose. We strive to deliver your orders as quickly as possible!",
    },
    {
      question: "Is my personal information and photos secure with Snapster?",
      answer:
        "Yes, we take the security and privacy of your personal information very seriously. Snapster employs robust security measures to protect your data, and we do not share your photos or personal information with any third parties. For more detailed information about our privacy practices, you can visit our Privacy Policy page, where we outline how we collect, use, and safeguard your data.",
    },
    {
      question: "Can I send printed photos as gifts to my friends and family?",
      answer:
        "Absolutely! Snapster makes it easy to send printed photos as gifts to your loved ones. Simply add the recipient's address in the settingspage, click on 'Add second recipient', and we'll take care of the rest. It's a thoughtful and personalized way to show you care.",
    },
    {
      question: "What payment methods are accepted on Snapster?",
      answer:
        "Currently, we only accept PayPal. We're working to add more payment methods soon. Thank you for your patience!",
    },
    {
      question: "Are there any discounts or promotions available on Snapster?",
      answer:
        "Yes, Snapster often runs promotions and offers discounts to our valued customers. Keep an eye on the app's notifications and website for the latest deals and special offers.",
    },
    {
      question: "What if I have an issue with my order?",
      answer:
        "If you encounter any issues with your order or have questions about our services, please don't hesitate to contact our customer support team. We're here to assist you and ensure your satisfaction with our app and products.",
    },
  ];

  const handleToggleAnswer = (index) => {
    setShowAnswers((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <ImageBackground
      source={require('.././assets/Background.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <Image source={BG_linesSource} style={styles.BG_lines} />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Support Page</Text>

          <View style={styles.whiteContainer}>
            {questionsAndAnswers.map((qa, index) => (
              <View key={index} style={styles.questionContainer}>
                <TouchableOpacity onPress={() => handleToggleAnswer(index)}>
                  <View style={styles.questionHeader}>
                    <Icon
                      name={showAnswers[index] ? 'minus-circle' : 'plus-circle'}
                      size={24}
                      color="black"
                    />
                    <Text style={styles.question}>{qa.question}</Text>
                  </View>
                </TouchableOpacity>
                {showAnswers[index] && <Text style={styles.answer}>{qa.answer}</Text>}
              </View>
            ))}

            {/* Additional text and contact buttons in the same row */}
            <View style={styles.additionalContainer}>
              <View style={styles.rowContainer}>
                <Text style={styles.moreQuestionsText}>More Questions?</Text>
                <TouchableOpacity onPress={handleMoreQuestions}>
                  <View style={styles.contactButton}>
                    <Text style={styles.contactButtonText}>Contact us here!</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.rowContainer}>
                <Text style={styles.moreQuestionsText}>Feedback?</Text>
                <TouchableOpacity onPress={handleMoreQuestions}>
                  <View style={styles.contactButton}>
                    <Text style={styles.contactButtonText}>Contact us here!</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    padding: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.PrimaryColor,
    top: 50,
    marginBottom: 20,
    fontFamily: Fonts.Title,
  },
  question: {
    fontFamily: Fonts.BodyText,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    left: '25%',
    marginRight: 5,
  },
  answer: {
    fontFamily: Fonts.BodyText,
    fontSize: 16,
    color: Colors.TertiaryColor,
    marginBottom: 10,
  },
  questionContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    top: 50,
    padding: 10,
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  moreQuestionsContainer: {
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
    marginTop: 5,
  },
  moreQuestionsText: {
    fontFamily: Fonts.Footer,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.PrimaryColor,
    top: 50,
  },
  rowContainer: {
    flexDirection: 'row', // Display items in the same row
    justifyContent: 'center', // Center the content horizontally
    alignItems: 'center', // Center the content vertically
    marginTop: 5,
  },
  contactButtonText: {
    fontFamily: Fonts.Footer,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.PrimaryColor,
    marginHorizontal: 5,
    textDecorationLine: 'underline',
    textDecorationStyle: 'dotted',
    top: 50,
  },
  scrollContainer: {
    flex: 1, // Ensure ScrollView takes the full height of the container
    marginBottom: 20, // Add margin to the bottom to prevent content from being covered by the navigation bar
  },
  additionalContainer: {
    marginBottom: 50
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