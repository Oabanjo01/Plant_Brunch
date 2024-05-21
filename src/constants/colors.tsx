interface ColorProps {
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
}
export const Colors: ColorProps = {
  screenColor: '#E5E5E5',
  primaryTextColor: '#000000',
  lighterBlack: '#CCCCCC',
  secondaryTextColor: '#6A6F7D',
  tertiaryTextColor: '#FFFFFF',
  tabColor: '#FFFFFF',
  // fixed colors
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

type ColorKey = keyof ColorProps; // represents the union of all keys in the ColorProps interface

export const DarkColors: ColorProps = {
  primaryTextColor: '#FFFFFF',
  tertiaryTextColor: '#1E1E1E',
  secondaryTextColor: '#F5F5F5',
  screenColor: '#1B1C1E',
  lighterBlack: '#777777',
  tabColor: '#FFFFFF',

  // screenColor: '#1B1B1B',
  // secondaryTextColor: '#C0C0C0',
  // primaryTextColor: '#FFFFFF',
  // tertiaryTextColor: '#FFFFFF',
  // fixed colors
  ratingIconColor: '#FFCD00',
  primary: '#2DDA93',
  disabledButtonColor: '#AAAAAA',
  lightPrimaryColor: '#61D2C4',
  onboardingInactiveIconColor: '#DBDBDB',
  inActiveUnderlineTextInputColor: '#A7A7A7',
  tabBarTextColor: '#D2D2D2',
  whiteColor: '#FFFFFF',
  favouriteButtonColor: '#FF6262',
  addPhotoButtonColor: '#48A2F5',
};

const themes = {
  lightTheme: {...Colors},
  darkTheme: {...DarkColors},
};

export const getThemeColor = (
  theme: 'lightTheme' | 'darkTheme' = 'lightTheme',
) => {
  const themeMode = themes[theme];
  return themeMode;
};
