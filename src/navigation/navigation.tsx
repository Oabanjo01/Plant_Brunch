import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import TabBarStyle from '@app/components/tabbar/tabbarstyle';
import {Colors, Routes} from '@app/constants';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {Tabs} from '@app/constants/routes';
import {RootState} from '@app/redux/store';
import {Plant, PlantDiseaseType} from '@app/redux/types';
import Articles from '@app/screens/articles/articles';
import LoginScreen from '@app/screens/auth/login';
import SignUpScreen from '@app/screens/auth/signup';
import OnboardingScreens from '@app/screens/onboarding';
import PlantDiseaseDetail from '@app/screens/plantdetail/plantDiseaseDetail';
import PlantListDetail from '@app/screens/plantdetail/plantListDetail';
import HomePage from '@app/screens/tabscreens/homepage/homepage';
import ProfilePage from '@app/screens/tabscreens/profile/profile';
import CameraPage from '@app/screens/tabscreens/uploadimage/uploadmethod';
import {View} from 'react-native';
import {useSelector} from 'react-redux';

export type RootStackParamList = {
  Onboarding: any;
  Login: any;
  SignUp: any;

  Home: any;
  Profile: any;

  PlantListDetail: {item: Plant} | undefined;
  PlantDiseaseDetail: {item: PlantDiseaseType} | undefined;
  Species: any;
  PlantList: any;
  Articles: any;
  ArticleDetails: any;

  Camera: any;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type ScreenProps = {navigation: RootStackNavigationProp};

const Stack = createNativeStackNavigator<RootStackParamList>();
const TabStack = createBottomTabNavigator<TabParamList>();

export type TabParamList = {
  Home: any;
  Profile: any;
  CameraButton: any;
};

const HomeTabNavigator: React.FC = () => {
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
        <TabStack.Screen name={Tabs.CameraButton} component={CameraPage} />
        <TabStack.Screen name={Tabs.Profile} component={ProfilePage} />
      </TabStack.Navigator>
    </View>
  );
};

const ScreenStack = () => {
  const onboardingStatus = useSelector(
    (state: RootState) => state.onboarding.onboardingStatus,
  );
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={onboardingStatus ? Routes.Login : Routes.Onboarding}>
      <Stack.Screen name={Routes.Onboarding} component={OnboardingScreens} />
      <Stack.Screen name={Routes.Login} component={LoginScreen} />
      <Stack.Screen name={Routes.SignUp} component={SignUpScreen} />
      <Stack.Screen name={'PlantListDetail'} component={PlantListDetail} />
      <Stack.Screen
        name={'PlantDiseaseDetail'}
        component={PlantDiseaseDetail}
      />
      <Stack.Screen name={Routes.Home} component={HomeTabNavigator} />
      <Stack.Screen name={Routes.Camera} component={CameraPage} />
      <Stack.Screen name={Routes.Articles} component={Articles} />
    </Stack.Navigator>
  );
};

export default ScreenStack;
