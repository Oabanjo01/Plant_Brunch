import React, {createContext, useContext, useState} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import ScreenStack from './navigation/navigation';
import {RootState} from './redux/store';

const VisibilityContext = createContext({
  isBottomSheetVisible: false,
  setBottomSheetVisible: (visible: boolean) => {},
});

export const VisibilityProvider: React.FC = ({children}) => {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  return (
    <VisibilityContext.Provider
      value={{isBottomSheetVisible, setBottomSheetVisible}}>
      {children}
    </VisibilityContext.Provider>
  );
};

const ThemeProvider: React.FC = () => {
  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const systemTheme = useColorScheme();
  console.log(theme, 'themee');

  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

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
      <VisibilityContext.Provider
        value={{isBottomSheetVisible, setBottomSheetVisible}}>
        <ScreenStack />
      </VisibilityContext.Provider>
    </GestureHandlerRootView>
  );
};

export const useVisibility = () => useContext(VisibilityContext);

export default ThemeProvider;
