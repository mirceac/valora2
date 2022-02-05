import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { useSelector } from 'react-redux';
import React, {Component} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function HomeScreen({ navigation }) {
  const wallet = useSelector((state: any) => state);

  // We make sure to handle instances where a user tries to navigate to this page without connecting the app to their wallet by making sure to navigate back to the loginscreen if a connection to the wallet hasn't been made yet
  React.useEffect(() => {
    if (wallet.failed) {
      navigation.navigate('Root');
    }
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Address: {wallet.address}</Text>
      <Text style={styles.title1}>cUSD: {wallet.cUsd}</Text>
      <Text style={styles.title1}>Celo: {wallet.celo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'red'
  },
  title1: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'green'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

