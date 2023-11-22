import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import OnboardingScreens from '@app/screens/onboarding';
import LoginScreen from '@app/screens/login';
import ScreenStack from '@app/navigation';

const App = () => {
  return (
    <NavigationContainer>
      <ScreenStack />
    </NavigationContainer>
  );
};

export default App;
