interface ColorProps {
  screenColor: string;
  primary: string;
  primaryTextColor: string;
  lightPrimaryTextColor: string;
  secondaryTextColor: string;
  inActiveUnderlineTextInputColor: string;
  lightTextColor: string;
  whiteColor: string;
  favouriteButtonColor: string;
  addPhotoButtonColor: string;
  ratingIconColor: string;
  disabledButtonColor: string;
  onboardingInactiveIconColor: string;
  tabBarTextColor: string;
}
export const Colors: ColorProps = {
  screenColor: '#E5E5E5',
  primary: '#2DDA93',
  primaryTextColor: '#000000',
  lightPrimaryTextColor: '#777777',
  secondaryTextColor: '#6A6F7D',
  inActiveUnderlineTextInputColor: '#A7A7A7',
  lightTextColor: '#FFFFFF',
  whiteColor: '#FFFFFF',
  favouriteButtonColor: '#FF6262',
  addPhotoButtonColor: '#48A2F5',
  ratingIconColor: '#FFCD00',
  disabledButtonColor: '#AAAAAA',
  onboardingInactiveIconColor: '#DBDBDB',
  tabBarTextColor: '#D2D2D2',
};

type ColorKey = keyof ColorProps; // represents the union of all keys in the ColorProps interface

export const DarkColors: ColorProps = {
  screenColor: '#1B1C1E',
  primary: '#2DDA93',
  primaryTextColor: '#FFFFFF',
  lightPrimaryTextColor: '#E0E0E0',
  secondaryTextColor: '#C0C0C0',
  inActiveUnderlineTextInputColor: '#A7A7A7',
  lightTextColor: '#FFFFFF',
  whiteColor: '#FFFFFF',
  favouriteButtonColor: '#FF6262',
  addPhotoButtonColor: '#48A2F5',
  ratingIconColor: '#FFCD00',
  disabledButtonColor: '#AAAAAA',
  onboardingInactiveIconColor: '#DBDBDB',
  tabBarTextColor: '#D2D2D2',
};

const themes = {
  lightTheme: {...Colors},
  darkTheme: {...DarkColors},
};

export const getThemeColor = (
  color: ColorKey,
  theme: 'lightTheme' | 'darkTheme' = 'lightTheme',
) => {
  const themeMode = themes[theme][color];
  return themeMode;
};
