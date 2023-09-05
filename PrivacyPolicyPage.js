import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import Icon from 'react-native-vector-icons/Feather';
import { Pages, Colors } from './constants';

export default function PrivacyPolicyPage() {
  const navigation = useNavigation(); // Use the useNavigation hook here

  const handleGoBack = () => {
    navigation.goBack(); // Navigate back to the previous screen (LoginPage)
  };

  const privacyPolicyText = `
  Privacy Policy 
  
  Last Updated: September 01, 2023
  
  Introduction
  
  This Privacy Policy outlines the policies and procedures governing the collection, usage, and disclosure of your information when you interact with our services. It also explains your privacy rights and the legal protections in place.
  
  By using our services, you consent to the collection and usage of your information in accordance with this Privacy Policy. This document has been carefully crafted to ensure compliance with privacy regulations.
  
  Definitions
  
  Account: A unique account created for you to access our services.
  Affiliate: An entity connected through common ownership and control, where "control" means ownership of 50% or more of the shares, equity, or voting securities.
  Application: Refers to "Snapster," the software provided by Snapster UG, located at Kuheidsberg 12, 24784 Westerrönfeld, Germany.
  Company: Refers to "Snapster UG," "we," "us," or "our" in this agreement, with its registered office in Schleswig-Holstein, Germany.
  Country: Refers to Schleswig-Holstein, Germany.
  Device: Any device enabling access to our services, such as a computer, cellphone, or tablet.
  Personal Data: Information relating to an identifiable individual.
  Service: Refers to the Snapster application.
  Service Provider: Any entity, natural or legal, processing data on behalf of the Company. This includes third-party entities employed to facilitate the service, provide services on our behalf, perform service-related tasks, or assist in analyzing service usage.
  Usage Data: Data collected automatically, generated either by service use or the service infrastructure itself.
  Collecting and Using Your Personal Data
  
  Types of Data Collected
  
  Personal Data
  
  While using our service, we may request certain personally identifiable information to enable us to contact or identify you. This information may include, but is not limited to:
  
  Email address
  First and last name
  Phone number
  Address, state, province, ZIP/postal code, city
  Usage Data
  
  Usage Data is automatically collected during service use. It may include information such as your device's IP address, browser type, the pages you visit, date and time of visits, duration on pages, unique device identifiers, and other diagnostic data.
  
  Information Collected while Using the Application
  
  While using our application, we may collect information, subject to your prior permission:
  
  Location information
  Pictures and data from your device's camera and photo library
  This information enables us to provide and enhance our service. It may be stored on our servers or with a Service Provider or solely on your device. You have control over access to this information through your device settings.
  
  Use of Your Personal Data
  
  We may use your Personal Data for various purposes, including but not limited to:
  
  Providing and maintaining our service
  Managing your account
  Executing contractual obligations
  Contacting you
  Providing news and updates
  Managing your requests
  Business transfers
  Other legitimate purposes
  Sharing Your Personal Information
  
  We may share your personal information under the following circumstances:
  
  With Service Providers
  For business transfers
  With Affiliates
  With business partners
  With other users (public areas)
  With your consent
  Retention of Your Personal Data
  
  We will retain your Personal Data only as long as necessary for the purposes outlined in this Privacy Policy. Usage Data may be retained for a shorter period, except when required by law.
  
  Transfer of Your Personal Data
  
  Your information, including Personal Data, may be processed outside your jurisdiction, but we will ensure adequate security measures and data protection compliance.
  
  Deleting Your Personal Data
  
  You have the right to delete or request assistance in deleting Personal Data we've collected about you. You can update, amend, or delete your information by signing into your account, if applicable, or by contacting us.
  
  Disclosure of Your Personal Data
  
  We may disclose your Personal Data under legal circumstances, such as law enforcement requests or other legal requirements.
  
  Security of Your Personal Data
  
  While we employ commercially acceptable security measures, please be aware that no method of data transmission over the internet or electronic storage is entirely secure.
  
  Children's Privacy
  
  Our service is not intended for users under the age of 13. We do not knowingly collect personally identifiable information from such users.
  
  Links to Other Websites
  
  Our service may contain links to third-party websites. We encourage you to review the privacy policies of these websites, as we have no control over their content or practices.
  
  Changes to this Privacy Policy
  
  We may update this Privacy Policy periodically. Notification of changes will be provided through email or prominent notices on our service.
  
  Contact Us
  
  If you have questions about this Privacy Policy, please contact us:
  
  By email: snapster.germany@gmail.com
  `;

  return (
    <ImageBackground
      source={require('./assets/Background.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Privacy Policy</Text>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.privacyPolicyText}>{privacyPolicyText}</Text>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 0.85,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 120,
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    paddingTop: 30,
  },
  backButtonText: {
    fontFamily: 'neucha-regular',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    fontFamily: 'neucha-regular',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Add a semi-transparent background color
  },
  privacyPolicyText: {
    fontSize: 16,
    padding: 20,
  },
});