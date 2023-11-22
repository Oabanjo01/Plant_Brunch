import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import OnboardingScreens from '@app/screens/onboarding';
import LoginScreen from '@app/screens/login';

const Stack = createNativeStackNavigator();

const ScreenStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OnboardingScreens"
        component={OnboardingScreens}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ScreenStack;
