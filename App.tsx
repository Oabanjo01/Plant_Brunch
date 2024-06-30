import React, {createContext, useContext, useState} from 'react';
import {Platform, StatusBar, StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';

import {persistor, store} from '@app/redux/store';
import BootSplash from 'react-native-bootsplash';
import ThemeProvider from '@app/themeProvider';
import {toastConfig} from '@app/utilities/toast';
import Toast from 'react-native-toast-message';
import {PersistGate} from 'redux-persist/integration/react';
import LoadingIndicator from '@app/utilities/loadingIndicator';

const LoadingContext = createContext({
  isLoading: false,
  setIsLoading: (value: boolean) => {},
});
const App = () => {
  // [ ]: Fix theming using system default settings

  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <PaperProvider>
            <LoadingContext.Provider value={{isLoading, setIsLoading}}>
              <NavigationContainer
                onReady={() => BootSplash.hide({fade: true})}>
                <ThemeProvider />
              </NavigationContainer>
              <Toast config={toastConfig} />
              <LoadingIndicator showIcon size={30} visible={isLoading} />
            </LoadingContext.Provider>
          </PaperProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

export const generalStyles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
export const useLoadingIndicator = () => useContext(LoadingContext);
export default App;

{
  /* <StatusBar
                barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
                backgroundColor="transparent"
                translucent
                animated
              />
              <View style={generalStyles.safeAreaStyle}>
              <SafeAreaView
                style={{flex: 1, backgroundColor: Colors.screenColor}}>
              <ScreenStack />
              </SafeAreaView>
              </View> */
}
