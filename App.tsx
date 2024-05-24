import React from 'react';
import {Platform, StatusBar, StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';

import {persistor, store} from '@app/redux/store';
import ThemeProvider from '@app/themeProvider';
import {toastConfig} from '@app/utilities/toast';
import Toast from 'react-native-toast-message';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <PaperProvider>
            {/* <Toast. */}
            <NavigationContainer>
              <ThemeProvider />
            </NavigationContainer>
            <Toast config={toastConfig} />
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
