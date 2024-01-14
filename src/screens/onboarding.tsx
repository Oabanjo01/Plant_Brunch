import React, {useRef, useState} from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';

import {Colors} from '@app/constants/colors';
import OnboardScreen from '@app/components/onboarding/onboardingScreen';
import {useNavigation} from '@react-navigation/native';
import {
  RootStackNavigationProp,
  RootStackParamList,
} from '@app/navigation/navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Routes} from '@app/constants';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {Alert} from 'react-native';
import {combineReducers} from 'redux';
import {useDispatch, useSelector} from 'react-redux';
import {onboardingAction} from '@app/redux/actions/actions';
import {RootState} from '@app/redux/store/store';

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

const OnboardingScreens = () => {
  const [visibleIndex, setVisibleIndex] = useState<number>(0);

  const navigation = useNavigation<RootStackNavigationProp>();
  const currentIndex = React.useRef(0);
  const screenFlatListRef = React.useRef<FlatList<ItemProps>>(null);
  const dispatch = useDispatch();
  const onboardingStatus = useSelector((state: RootState) => state.auth.status);
  // const setUserOnboarded = async () => {
  //   try {
  //     await AsyncStorage.setItem('userOnboarded', 'false');
  //   } catch (error) {
  //     Alert.alert('Error storing boolean value:');
  //   }
  // };

  const handleGetIndex = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    let offsetX = e.nativeEvent.contentOffset.x;
    setVisibleIndex(Math.round(offsetX / screenWidth));
    currentIndex.current = visibleIndex;
  };

  const handleNextPress = () => {
    if (currentIndex.current < randomData.length - 1) {
      currentIndex.current += 1;
      screenFlatListRef.current?.scrollToIndex({
        index: currentIndex.current,
        animated: true,
      });

      return;
    }
    console.log(onboardingStatus);
    dispatch(onboardingAction(true));
    goToLoginScreen();
  };

  const goToLoginScreen = () => {
    navigation.navigate(Routes.Login);
  };
  return (
    <View style={styles.parentContainer}>
      <FlatList
        ref={screenFlatListRef}
        data={randomData}
        keyExtractor={item => item.id}
        onMomentumScrollEnd={handleGetIndex}
        renderItem={items => {
          return (
            <OnboardScreen
              bodyText={items.item.bodyText}
              titleText={items.item.titleText}
              index={items.index}
              onPress={handleNextPress}
              skip={() => navigation.navigate(Routes.Login)}
              activeIndex={(items.index += 1)}
            />
          );
        }}
        horizontal
        pagingEnabled
        // scrollEnabled={false}
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
