import {Dimensions, FlatList, StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import OnboardingScreens from '@app/screens/onboarding';
import LoginScreen from '@app/screens/Auth/login';
import ScreenStack from '@app/navigation/navigation';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Wrapper from '@app/utilities/wrapper';

const App = () => {
  return (
    <>
      <PaperProvider>
        <SafeAreaView style={{flex: 1}}>
          <NavigationContainer>
            <ScreenStack />
          </NavigationContainer>
        </SafeAreaView>
        <StatusBar barStyle="dark-content" />
      </PaperProvider>
    </>
  );
};

export default App;
