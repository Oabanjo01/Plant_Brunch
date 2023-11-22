import React, {useRef} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {Colors} from '@app/constants/colors';
import OnboardScreen from '@app/components/onboarding/onboarding';

type ItemProps = {
  id: string;
  titleText: string;
  bodyText: string;
};

const randomData: ItemProps[] = [
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
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

const OnboardingScreens = () => {
  const currentIndex = React.useRef(0);
  const screenFlatListRef = React.useRef<FlatList>();
  const handleNextPress = () => {
    console.log(currentIndex.current);
    if (currentIndex.current < randomData.length) {
      currentIndex.current += 1;
      screenFlatListRef.current?.scrollToIndex({
        index: currentIndex.current,
        animated: true,
      });
    }
  };
  return (
    <View style={styles.parentContainer}>
      <FlatList
        ref={() => screenFlatListRef}
        data={randomData}
        keyExtractor={item => item.id}
        renderItem={items => {
          return (
            <OnboardScreen
              bodyText={items.item.titleText}
              titleText={items.item.titleText}
              index={items.index}
              onPress={handleNextPress}
            />
          );
        }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    height: screenHeight,
    width: screenWidth,
    backgroundColor: Colors.screenColor,
    alignItems: 'center',
    justifyContent: 'center',
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

export default OnboardingScreens;
