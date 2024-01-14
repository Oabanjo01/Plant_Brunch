import React, {useEffect, useState} from 'react';

import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import OnboardingScreens from '@app/screens/onboarding';
import LoginScreen from '@app/screens/auth/login';
import {Colors, Routes} from '@app/constants';
import SignUpScreen from '@app/screens/auth/signup';
import HomePage from '@app/screens/homepage/homepage';
import ProfilePage from '@app/screens/profile/profile';
import {Tabs} from '@app/constants/routes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import CameraPage from '@app/screens/camera/camerapage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabBarStyle from '@app/components/tabbar/tabbarstyle';
import PlantDetail from '@app/screens/plantdetail/plantdetail';
import {RootState} from '@app/redux/store/store';
import {useSelector} from 'react-redux';

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type ScreenProps = {navigation: RootStackNavigationProp};

export type RootStackParamList = {
  Onboarding: any;
  Login: any;
  SignUp: any;

  Home: any;
  Profile: any;

  PlantDetail: any;
  Species: any;
  PlantList: any;
  Articles: any;
  ArticleDetails: any;
};

export type TabParamList = {
  Home: any;
  Profile: any;
  CameraButton: any;
};
const Stack = createNativeStackNavigator<RootStackParamList>();
const TabStack = createBottomTabNavigator<TabParamList>();

const HomeTabNavigator: React.FC = () => (
  <TabStack.Navigator
    tabBar={props => {
      return (
        <TabBarStyle
          {...props}
          screenHeight={screenHeight}
          screenWidth={screenWidth}
        />
      );
    }}
    screenOptions={({route}) => ({
      headerShown: false,
      tabBarActiveTintColor: Colors.primary,
      tabBarInactiveTintColor: Colors.inActiveUnderlineTextInputColor,
      tabBarStyle: {
        shadowColor: 'grey',
        shadowOpacity: 0.4,
        shadowOffset: {width: -1, height: -1},
        elevation: 4,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: Colors.whiteColor,
        height: screenHeight * 0.08,
      },
    })}
    initialRouteName={Tabs.Home}>
    <TabStack.Screen name={Tabs.Home} component={HomePage} />
    <TabStack.Screen name={Tabs.CameraButton} component={CameraPage} />
    <TabStack.Screen name={Tabs.Profile} component={ProfilePage} />
  </TabStack.Navigator>
);

const ScreenStack = () => {
  const onboardingStatus = useSelector((state: RootState) => state.auth.status);
  console.log(onboardingStatus);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={onboardingStatus ? Routes.Login : Routes.Onboarding}>
      <Stack.Screen name={Routes.Onboarding} component={OnboardingScreens} />
      <Stack.Screen name={Routes.Login} component={LoginScreen} />
      <Stack.Screen name={Routes.SignUp} component={SignUpScreen} />
      <Stack.Screen name={Routes.PlantDetail} component={PlantDetail} />
      <Stack.Screen name={Routes.Home} component={HomeTabNavigator} />
    </Stack.Navigator>
  );
};

export default ScreenStack;
