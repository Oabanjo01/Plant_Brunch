import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import OnboardingScreens from '@app/screens/onboarding';
import LoginScreen from '@app/screens/Auth/login';
import {Colors, Routes} from '@app/constants';
import SignUpScreen from '@app/screens/Auth/signup';
import HomePage from '@app/screens/Homepage/homepage';
import ProfilePage from '@app/screens/Profile/profile';
import {Tabs} from '@app/constants/routes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {screenHeight} from '@app/constants/dimensions';

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

export type TabParamList = {
  Home: any;
  Profile: any;
  CameraButton: any;
};
const Stack = createNativeStackNavigator<RootStackParamList>();
const TabStack = createBottomTabNavigator<TabParamList>();

const CustomImagePickerButton = () => {};

const HomeTabNavigator = () => (
  <TabStack.Navigator
    screenOptions={({route}) => ({
      headerShown: false,
      tabBarActiveTintColor: Colors.primary,
      tabBarInactiveTintColor: Colors.inActiveUnderlineTextInputColor,
      tabBarStyle: {
        height: screenHeight * 0.08,
        paddingBottom: 10,
        paddingTop: 10,
        elevation: 0,
        backgroundColor: Colors.whiteColor,
      },
      tabBarIcon: ({focused, size, color}) => {
        let iconName;
        if (route.name === Tabs.Home) {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === Tabs.Profile) {
          iconName = focused ? 'person' : 'person-outline';
        }
        return <Ionicons name={iconName} size={size} color={Colors.primary} />;
      },
    })}
    initialRouteName={Tabs.Home}>
    <TabStack.Screen
      name={Tabs.Home}
      component={HomePage}
      // options={{
      //   ic
      // }}
    />
    {/* <TabStack.Screen name={Tabs.CameraButton} component={HomePage} /> */}
    <TabStack.Screen name={Tabs.Profile} component={ProfilePage} />
    {/* Add more screens as needed */}
  </TabStack.Navigator>
);

const ScreenStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={Routes.Onboarding} component={OnboardingScreens} />
      <Stack.Screen name={Routes.Login} component={LoginScreen} />
      <Stack.Screen name={Routes.SignUp} component={SignUpScreen} />
      <Stack.Screen name={Routes.Home} component={HomeTabNavigator} />
    </Stack.Navigator>
  );
};

export default ScreenStack;
