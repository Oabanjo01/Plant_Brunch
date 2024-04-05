import React, {useEffect, useRef} from 'react';

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
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import CameraPage from '@app/screens/camera/camerapage';
import TabBarStyle from '@app/components/tabbar/tabbarstyle';
import PlantDetail from '@app/screens/plantdetail/plantdetail';
import {RootState} from '@app/redux/store';
import {useSelector} from 'react-redux';
import {View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {showToast} from '@app/utilities/toast';

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

const HomeTabNavigator: React.FC = () => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);

  const handlePermission = async () => {
    // if (hasPermission) {
    //   return <Camera device={device} isActive={true} />;
    // } else {
    //   try {
    //     const permissionStatus = await requestPermission();
    //     permissionStatus
    //       ? showToast({
    //           text1: 'Permission granted',
    //           text2: 'You can now take some pictures of your favourite plants!',
    //           type: 'success',
    //         })
    //       : showToast({
    //           text1: 'Camera permission denied',
    //           text2: 'Grant camera permission in your settings',
    //           type: 'info',
    //         });
    //   } catch (error) {
    //     console.error('Error requesting camera permission:', error);
    //   }
    // }
  };

  return (
    <View
      style={{
        // flex: 1,
        width: screenWidth,
        height: screenHeight,
      }}>
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
            shadowOpacity: 0.4,
            shadowOffset: {width: -1, height: -1},
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: Colors.whiteColor,
            height: screenHeight * 0.08,
          },
        })}
        initialRouteName={Tabs.Home}>
        <TabStack.Screen name={Tabs.Home} component={HomePage} />
        <TabStack.Screen
          name={Tabs.CameraButton}
          component={CameraPage}
          listeners={{
            tabPress: () => {
              handlePermission();
            },
          }}
        />
        <TabStack.Screen name={Tabs.Profile} component={ProfilePage} />
      </TabStack.Navigator>
    </View>
  );
};

const ScreenStack = () => {
  const onboardingStatus = useSelector((state: RootState) => state.auth.status);
  console.log(onboardingStatus, 'onboardingStatus');
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
