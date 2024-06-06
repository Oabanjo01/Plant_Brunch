import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from './redux/store';
import {StatusBar, useColorScheme} from 'react-native';
import ScreenStack from './navigation/navigation';

const ThemeProvider: React.FC = () => {
  const userTheme = useSelector((state: RootState) => state.theme);
  const theme = useColorScheme();
  console.log(theme, 'themee');
  return (
    <>
      <StatusBar
        networkActivityIndicatorVisible
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor="transparent"
        translucent
        animated
      />
      <ScreenStack />
    </>
  );
};

export default ThemeProvider;
