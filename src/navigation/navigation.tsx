import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import OnboardingScreens from '@app/screens/onboarding';
import LoginScreen from '@app/screens/login';
import {Colors, Routes} from '@app/constants';

export type RootStackParamList = {
  Onboarding: any;
  Login: any;
  SignUp: any;

  Home: any;
  Profile: any;

  ItemDetail: any;
  Species: any;
  PlantList: any;
  Articles: any;
  ArticleDetails: any;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const ScreenStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={Routes.Onboarding} component={OnboardingScreens} />
      <Stack.Screen name={Routes.Login} component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default ScreenStack;
