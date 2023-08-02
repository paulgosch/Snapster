import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {WebView} from 'react-native-webview';

export default function TermsAndConditionsScreen() {

  const pdfUrl = "https://drive.google.com/uc?export=download&id=1vlelO-YcMg4zPprmgOszatYTVTQOpiOa";

  return (
      <WebView
      source={{ uri: pdfUrl }}
      style={styles.webView}
      onError={(error) => console.log(error)}
 />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontFamily: 'neucha-regular',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  webView: {
    flex: 1
  },
});