import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import {Colors} from '@app/constants/colors';
import OnboardingScreen from '@app/components/onboarding/screens';

let screenWidth = Dimensions.get('window').width;

const randomData = [
  {
    id: '1',
    titleText: 'Identify Plants',
    bodyText: "You can identify the plants you don't know through your camera",
  },
  {
    id: '2',
    titleText: 'Learn Many Plants Species',
    bodyText:
      "Let's learn about the many plant species that exist in this world",
  },
  {
    id: '3',
    titleText: 'Read Many Articles About Plant',
    bodyText:
      "Let's learn more about beautiful plants and read many articles about plants and gardening",
  },
];
const App = () => {
  return (
    <View style={styles.parentContainer}>
      <FlatList
        data={randomData}
        keyExtractor={item => item.id}
        renderItem={items => {
          return (
            <OnboardingScreen
              bodyText={items.item.bodyText}
              titleText={items.item.titleText}
            />
          );
        }}
        horizontal
        pagingEnabled
      />
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
  },
  titleTextStyle: {
    color: '#36455A',
    fontSize: 19,
    fontFamily: 'OpenSans-SemiBold',
    marginBottom: '7%',
    marginTop: '16%',
  },
  bodyTextStyle: {
    opacity: 0.8,
    fontFamily: 'OpenSans-Regular',
    fontSize: 13,
    color: Colors.secondaryTextColor,
    marginHorizontal: '10%',
    textAlign: 'center',
  },
  buttonContainerStyle: {
    paddingVertical: '2%',
    backgroundColor: Colors.primary,
    marginTop: '14%',
    marginHorizontal: 100,
    borderRadius: 3,
    width: screenWidth * 0.95,
  },
  buttonTextStyle: {
    textAlign: 'center',
    fontFamily: 'OpenSans-Bold',
    fontSize: 15,
    color: Colors.lightTextColor,
  },
});
export default App;
