import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import OnboardingScreens from '@app/screens/onboarding';
import LoginScreen from '@app/screens/Auth/login';
import ScreenStack from '@app/navigation/navigation';
import {PaperProvider} from 'react-native-paper';

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <ScreenStack />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
