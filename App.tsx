import {StatusBar} from 'react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import ScreenStack from '@app/navigation/navigation';
import {PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';

import {persistor, store} from '@app/redux/store/store';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="rgba(255, 255, 255, 0.7)"
            translucent
          />
          <PaperProvider>
            {/* <SafeAreaView style={{flex: 1}}> */}
            <NavigationContainer>
              <ScreenStack />
            </NavigationContainer>
            {/* </SafeAreaView> */}
          </PaperProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
