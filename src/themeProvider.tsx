import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import ScreenStack from './navigation/navigation';
import {RootState} from './redux/store';

const ThemeProvider: React.FC = () => {
  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const systemTheme = useColorScheme();
  console.log(theme, 'themee');
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar
        networkActivityIndicatorVisible
        barStyle={
          theme === 'light' || (systemTheme === 'light' && theme === 'system')
            ? 'dark-content'
            : 'light-content'
        }
        backgroundColor="transparent"
        translucent
        animated
      />
      <ScreenStack />
    </GestureHandlerRootView>
  );
};

export default ThemeProvider;
