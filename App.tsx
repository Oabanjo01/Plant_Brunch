import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import ScreenStack from '@app/navigation/navigation';
import {PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';

import {persistor, store} from '@app/redux/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import {toastConfig} from '@app/utilities/toast';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '@app/constants';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          {/* <StatusBar
            barStyle="dark-content"
            backgroundColor="rgba(255, 255, 255, 0.7)"
            translucent
          /> */}
          <PaperProvider>
            {/* <Toast. */}
            <NavigationContainer>
              {/* <View style={generalStyles.safeAreaStyle}> */}
              {/* <SafeAreaView
                style={{flex: 1, backgroundColor: Colors.screenColor}}> */}
              <ScreenStack />
              {/* </SafeAreaView> */}
              {/* </View> */}
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
