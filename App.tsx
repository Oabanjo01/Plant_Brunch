import React from 'react';
import {Platform, StatusBar, StyleSheet} from 'react-native';

import ScreenStack from '@app/navigation/navigation';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';

import {persistor, store} from '@app/redux/store';
import {toastConfig} from '@app/utilities/toast';
import Toast from 'react-native-toast-message';
import {PersistGate} from 'redux-persist/integration/react';
import {fetchHomeData} from '@app/redux/actions/actions';

const App = () => {
  store.dispatch(fetchHomeData);
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
