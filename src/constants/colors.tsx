import {RootState} from '@app/redux/store';
import {ColorSchemeName, useColorScheme} from 'react-native';
import {useSelector} from 'react-redux';

type ColorKey = keyof ColorProps; // represents the union of all keys in the ColorProps interface
export interface ColorProps {
  screenColor: string;
  primary: string;
  primaryTextColor: string;
  lighterBlack: string;
  secondaryTextColor: string;
  inActiveUnderlineTextInputColor: string;
  tertiaryTextColor: string;
  whiteColor: string;
  lightPrimaryColor: string;
  favouriteButtonColor: string;
  addPhotoButtonColor: string;
  ratingIconColor: string;
  disabledButtonColor: string;
  onboardingInactiveIconColor: string;
  tabBarTextColor: string;
  tabColor: string;
  gradientColor: string;
}
export const Colors: ColorProps = {
  screenColor: '#E5E5E5',
  primaryTextColor: '#000000',
  lighterBlack: '#FFFFFF',
  secondaryTextColor: '#FFFFFF',
  tertiaryTextColor: '#FFFFFF',
  gradientColor: '#61D2C4',
  tabColor: '#FFFFFF',
  ratingIconColor: '#FFCD00',
  primary: '#2DDA93',
  disabledButtonColor: '#AAAAAA',
  onboardingInactiveIconColor: '#DBDBDB',
  inActiveUnderlineTextInputColor: '#A7A7A7',
  lightPrimaryColor: '#61D2C4',
  tabBarTextColor: '#D2D2D2',
  whiteColor: '#FFFFFF',
  favouriteButtonColor: '#FF6262',
  addPhotoButtonColor: '#48A2F5',
};

export const DarkColors: ColorProps = {
  primaryTextColor: '#FFFFFF',
  tertiaryTextColor: '#1E1E1E',
  secondaryTextColor: '#F5F5F5',
  screenColor: '#1B1C1E',
  lighterBlack: '#777777',
  tabColor: '#FFFFFF',

  ratingIconColor: '#FFCD00',
  primary: '#2DDA93',
  disabledButtonColor: '#AAAAAA',
  lightPrimaryColor: '#61D2C4',
  gradientColor: '#1B1C1E',
  onboardingInactiveIconColor: '#DBDBDB',
  inActiveUnderlineTextInputColor: '#A7A7A7',
  tabBarTextColor: '#D2D2D2',
  whiteColor: '#FFFFFF',
  favouriteButtonColor: '#FF6262',
  addPhotoButtonColor: '#48A2F5',
};

const themes = {
  light: {...Colors},
  dark: {...DarkColors},
};

export const getThemeColor = (theme: 'light' | 'dark' = 'light') => {
  const systemTheme = useColorScheme() || 'light';
  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme: storedTheme} = userTheme;
  let themeMode;

  if (storedTheme === 'system') {
    const themeMode = themes[systemTheme];
    return themeMode;
  } else {
    const themeMode = themes[theme];
    return themeMode;
  }
};
