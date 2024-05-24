import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from './redux/store';
import {StatusBar} from 'react-native';
import ScreenStack from './navigation/navigation';

const ThemeProvider: React.FC = () => {
  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  console.log(theme);
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
