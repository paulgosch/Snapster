import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Pages, Colors, Fonts } from './constants';

const backgroundImageSource = require('./assets/Background.jpg');

export default function MyOrdersPage() {
  const { orders } = useSelector((state) => state.user); // Assuming 'orders' is an array of order objects in your Redux state
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground source={backgroundImageSource} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.title}>My Orders</Text>
        </View>
        <ScrollView style={styles.ordersContainer}>
          {orders ? orders.map((order, index) => (
            <View key={index} style={styles.orderCard}>
              <Text style={styles.orderTitle}>{order.title}</Text>
              <Text style={styles.orderDetail}>Order Number: {order.orderNumber}</Text>
              <Text style={styles.orderDetail}>Bundle Type: {order.bundleType}</Text>
              <Text style={styles.orderDetail}>Date: {order.date}</Text>
              <Text style={styles.orderDetail}>Status: {order.status}</Text>
              <Text style={styles.orderDetail}>Subtotal: ${order.subtotal}</Text>
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
});

