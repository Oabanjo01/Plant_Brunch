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
import Articles from '@app/screens/subtopics/articles';
import LoginScreen from '@app/screens/auth/login';
import SignUpScreen from '@app/screens/auth/signup';
import CameraScreen from '@app/screens/camera';
import CartScreen from '@app/screens/cartandSummary/cart';
import TransactionSummary from '@app/screens/cartandSummary/summary';
import OnboardingScreens from '@app/screens/onboarding';
import PlantDiseaseDetail from '@app/screens/plantdetail/plantDiseaseDetail';
import PlantListDetail from '@app/screens/plantdetail/plantListDetail';
import HomePage from '@app/screens/tabscreens/homepage/homepage';
import ProfilePage from '@app/screens/tabscreens/profile/profile';
import CameraPage from '@app/screens/tabscreens/uploadimage/uploadmethod';
import {KeyboardAvoidingView, Platform, View} from 'react-native';
import {useSelector} from 'react-redux';
import {DarkColors} from '@app/constants/colors';
import {Asset} from 'react-native-image-picker';
import PhotoView from '@app/screens/photo';
import PlantList from '@app/screens/subtopics/scientificNames';
import AddNewItem from '@app/screens/addNewPlantPhoto/addNewItem';
import PlantPhotoType from '@app/screens/addNewPlantPhoto/plantPhotoType';

// TODO: Add a settings page containing Delete account, log out, change password/Email/displayname tiles
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

  CameraScreen: any;
  CartScreen: any;
  TransactionSummary: {itemNo: number} | undefined;
  PhotoView: {photo: Asset[]} | undefined;
  PlantPhotoType: {uri: (string | undefined)[] | undefined};
  AddNewItem: {
    photoType: 'plantPhotograph' | 'plantDisease';
    uri: (string | undefined)[];
  };
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.select({ios: 0, android: -150})}
      style={{
        flex: 1,
        width: screenWidth,
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
            backgroundColor: DarkColors.tertiaryTextColor,
            height: screenHeight * 0.08,
          },
        })}
        initialRouteName={Tabs.Home}>
        <TabStack.Screen name={Tabs.Home} component={HomePage} />
        <TabStack.Screen name={Tabs.CameraButton} component={CameraPage} />
        <TabStack.Screen name={Tabs.Profile} component={ProfilePage} />
      </TabStack.Navigator>
    </KeyboardAvoidingView>
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
      <Stack.Screen name={Routes.CameraScreen} component={CameraScreen} />
      <Stack.Screen name={Routes.Articles} component={Articles} />
      <Stack.Screen name={Routes.CartScreen} component={CartScreen} />
      <Stack.Screen
        name={'TransactionSummary'}
        component={TransactionSummary}
      />
      <Stack.Screen name={'PhotoView'} component={PhotoView} />
      <Stack.Screen name={'PlantList'} component={PlantList} />
      <Stack.Screen name={'AddNewItem'} component={AddNewItem} />
      <Stack.Screen name={'PlantPhotoType'} component={PlantPhotoType} />
    </Stack.Navigator>
  );
};

export default ScreenStack;
