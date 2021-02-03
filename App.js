import * as React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import WelcomeScreen from './screens/WelcomeScreen';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { AppTabNavigator } from './components/AppTabNavigator';

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaProvider>
        <AppContainer />
      </SafeAreaProvider>
    )
  }
}

const switchNavigator = createSwitchNavigator({
  welcomeScreen: {screen: WelcomeScreen},
  bottomTab: {screen: AppTabNavigator}
})

const AppContainer = createAppContainer(switchNavigator);