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
import {ImageBackground, StyleSheet, View} from 'react-native';
import CameraPage from '@app/screens/Camera/camerapage';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const HomeTabNavigator = () => (
  <ImageBackground
    source={require('../../assets/images/Union.jpg')}
    style={{flex: 1, zIndex: 9999, width: '100%', height: 60}}>
    <TabStack.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.inActiveUnderlineTextInputColor,
        tabBarBackgroundImage: () => (
          <ImageBackground
            source={require('../../assets/images/Book.svg')}
            style={{
              flex: 1,
              width: '100%',
              height: 100,
              zIndex: 9999,
              position: 'absolute',
              justifyContent: 'center',
            }}
            resizeMode="cover"
          />
        ),
        tabBarStyle: {
          height: screenHeight * 0.08,
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          paddingTop: 10,
          paddingBottom: 10,
        },
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          let iconColor;
          if (route.name === Tabs.Home) {
            iconColor = Colors.primary;
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === Tabs.Profile) {
            iconColor = Colors.primary;
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === Tabs.CameraButton) {
            iconName = focused ? 'camera' : 'camera-outline';
          }
          return (
            <View>
              <Ionicons name={iconName} size={size} color={iconColor} />
            </View>
          );
        },
      })}
      initialRouteName={Tabs.Home}>
      <TabStack.Screen name={Tabs.Home} component={HomePage} />
      <TabStack.Screen
        name={Tabs.CameraButton}
        component={CameraPage}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, focused}) => {
            return (
              <View
                style={{
                  position: 'absolute',
                  top: -40, // space from bottombar
                  height: screenWidth * 0.2,
                  width: screenWidth * 0.2,
                  borderWidth: focused ? 0 : 0.5,
                  borderColor: focused ? 'transparent' : Colors.primary,
                  backgroundColor: focused
                    ? Colors.addPhotoButtonColor
                    : Colors.whiteColor,
                  borderRadius: (screenWidth * 0.2) / 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Ionicons
                  name="camera"
                  size={30}
                  color={
                    focused ? Colors.whiteColor : Colors.addPhotoButtonColor
                  }
                />
              </View>
            );
          },

          // tabBarButton: props => <CustomImagePickerButton onPress={null} />,
        }}
      />
      <TabStack.Screen name={Tabs.Profile} component={ProfilePage} />
      {/* Add more screens as needed */}
    </TabStack.Navigator>
  </ImageBackground>
);

const ScreenStack = () => {
  const [onboarded, setOnboarded] = useState<string | null>('false');

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
  useEffect(() => getData(), [onboarded]);
  console.log(onboarded);
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

const styles = StyleSheet.create({
  // customTabBarStyle: {
  //   activeTintColor: '#0091EA',
  //   inactiveTintColor: 'gray',
  //   style: {backgroundColor: 'white' },
  // }
});

export default ScreenStack;
