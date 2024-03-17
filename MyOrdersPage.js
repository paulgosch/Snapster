import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground,Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Pages, Colors, Fonts } from './constants';
import { reference, storage } from './firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';

const backgroundImageSource = require('./assets/Background.jpg');
const BG_linesSource = require('./assets/BG_lines.png');

export default function MyOrdersPage() {
  const [data, setData] = useState([]);
  const { purchaseHistory, userName } = useSelector((state) => state.user);

  const navigation = useNavigation();
  useEffect(() => {
  //   setTimeout(() => {
  //   database.ref('purchaseHistory/').on('value', function (snapshot) {
  //     setData(snapshot.val());
  //     console.log("HERE")
  //     console.log(snapshot.val())
  //   });
  // }, 1000);
  console.log(userName)
  });
  
 
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground source={backgroundImageSource} style={styles.background}>
      <Image source={BG_linesSource} style={styles.BG_lines} />
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.title}>My Orders</Text>
        </View>
        <ScrollView style={styles.ordersContainer}>
          {purchaseHistory ? purchaseHistory.map((order, index) => (
            <View key={index} style={styles.orderCard}>
              <Text style={styles.orderTitle}>{order.title}</Text>
              <Text style={styles.orderDetail}>Bundle Type: {order.bundleType}</Text>
              <Text style={styles.orderDetail}>Date: {order.purchaseDate}</Text>
              <Text style={styles.orderDetail}>Size: ${order.totalPictures}</Text>
            </View>
          )) : <Text style={styles.noOrdersText}>No orders found</Text>}
        </ScrollView>
      </View> 
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 16,
    marginTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: Fonts.Title,
  },
  ordersContainer: {
    flex: 1,
  },
  orderCard: {
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: Fonts.Subtitle,
  },
  orderDetail: {
    fontSize: 16,
    color: 'grey',
    marginBottom: 4,
    fontFamily: Fonts.Text,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    padding: 10,
  },
  noOrdersText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
    fontFamily: Fonts.BodyText,
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

