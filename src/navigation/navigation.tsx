import React, {useEffect, useState} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import OnboardingScreens from '@app/screens/onboarding';
import LoginScreen from '@app/screens/Auth/login';
import {Colors, Routes} from '@app/constants';
import SignUpScreen from '@app/screens/Auth/signup';
import HomePage from '@app/screens/Homepage/homepage';
import ProfilePage from '@app/screens/Profile/profile';
import {Tabs} from '@app/constants/routes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CameraPage from '@app/screens/Camera/camerapage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabBarStyle from '@app/components/tabbar/tabbarstyle';

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

// const CustomImagePickerButton = (onPress: any) => (
//   <TouchableOpacity
//     onPress={onPress}
//     style={{top: -25, justifyContent: 'center', alignItems: 'center'}}>
//     <View
//       style={{
//         width: screenWidth * 0.15,
//         height: screenWidth * 0.15,
//         borderRadius: (screenWidth * 0.15) / 2,
//         // backgroundColor: Colors.addPhotoButtonColor,
//       }}>
//       {/* {children} */}
//     </View>
//     {/* // <Ionicons name={'add'} color={Colors.primary} />; */}
//   </TouchableOpacity>
// );

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
  const [onboarded, setOnboarded] = useState<string | null>('true');

  const getData = () => {
    getUserOnboarded();
  };

  const getUserOnboarded = async () => {
    try {
      let onboardedValue = await AsyncStorage.getItem('userOnboarded');
      setOnboarded(onboardedValue);
      console.log('Onboarded value:', onboardedValue);
    } catch (error) {
      console.error('Error storing boolean value:', error);
    }
  };

  useEffect(() => getData(), []);

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={
        onboarded === 'true' ? Routes.Login : Routes.Onboarding
      }>
      <Stack.Screen name={Routes.Onboarding} component={OnboardingScreens} />
      <Stack.Screen name={Routes.Login} component={LoginScreen} />
      <Stack.Screen name={Routes.SignUp} component={SignUpScreen} />
      <Stack.Screen name={Routes.Home} component={HomeTabNavigator} />
    </Stack.Navigator>
  );
};

export default ScreenStack;
