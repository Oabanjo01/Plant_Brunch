import {StatusBar} from 'react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import ScreenStack from '@app/navigation/navigation';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '@app/constants';

const App = () => {
  return (
    <>
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
    </>
  );
};

export default App;
