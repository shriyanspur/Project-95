import * as React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import RequestScreen from '../screens/RequestScreen';
import DonorDetailsScreen from '../screens/DonorDetailScreen';

export const AppStackNavigator = createStackNavigator({
  requestList: {
    screen: RequestScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  donorDetails: {
    screen: DonorDetailsScreen,
    navigationOptions: {
      headerShown: false
    }
  }
},
  {initialRouteName: 'requestList'}
)