import {RootStackParamList, TabParamList} from '@app/navigation/navigation';

export const Routes: RootStackParamList = {
  Onboarding: 'Onboarding',
  Login: 'Login',
  SignUp: 'SignUp',

  Home: 'HomePage',
  Profile: 'Profile',
  PlantDiseaseDetail: undefined,

  PlantListDetail: undefined,
  Species: 'Species',
  PlantList: 'PlantList',
  Articles: 'Articles',
  ArticleDetails: 'ArticleDetails',
  CameraScreen: 'CameraScreen',
};

export const Tabs: TabParamList = {
  Home: 'Home',
  Profile: 'Profile',
  CameraButton: 'CameraButton',
};
