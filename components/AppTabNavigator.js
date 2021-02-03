import * as React from 'react';
import { Text, View, StyleSheet, Image} from 'react-native';
import DonateScreen from '../screens/DonateScreen';
import RequestScreen from '../screens/RequestScreen';
import { createBottomTabNavigator } from 'react-navigation-tabs';

export const AppTabNavigator = createBottomTabNavigator(
  {
    Request: {
      screen: RequestScreen,
      navigationOptions: {
        tabBarIcon: <Image source={require('../assets/request-icon.png')} style={{width: 32, height: 32.5, marginBottom: -2}}/>,
        tabBarLabel: 'Request'
      }
    },
    Donate: {
      screen: DonateScreen,
      navigationOptions: {
        tabBarIcon: <Image source={require('../assets/donate-icon.png')} style={{width: 32, height: 30.5, marginBottom: -2}}/>,
        tabBarLabel: 'Donate'
      }
    },
  }
)