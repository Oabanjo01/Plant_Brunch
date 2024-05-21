import React, {useState} from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';

import OnboardScreen from '@app/components/onboarding/onboardingScreen';
import {Routes} from '@app/constants';
import {Colors} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {ScreenProps} from '@app/navigation/navigation';
import {onboardingAction} from '@app/redux/actions/actions';
import {RootState} from '@app/redux/store';
import {useDispatch, useSelector} from 'react-redux';

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

const OnboardingScreens = ({navigation}: ScreenProps) => {
  const [visibleIndex, setVisibleIndex] = useState<number>(0);

  // const navigation = useNavigation<RootStackNavigationProp>();
  const currentIndex = React.useRef(0);
  const screenFlatListRef = React.useRef<FlatList<ItemProps>>(null);
  const dispatch = useDispatch();
  const onboardingStatus = useSelector(
    (state: RootState) => state.onboarding.onboardingStatus,
  );

  const handleGetIndex = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    let offsetX = e.nativeEvent.contentOffset.x;
    setVisibleIndex(Math.round(offsetX / screenWidth));
    currentIndex.current = visibleIndex;
  };

  const handleNextPress = () => {
    if (currentIndex.current < randomData.length - 1) {
      console.log('got here', 1);
      currentIndex.current += 1;
      screenFlatListRef.current?.scrollToIndex({
        index: currentIndex.current,
        animated: true,
      });
    } else {
      console.log('got here', currentIndex.current, randomData.length);
      dispatch(onboardingAction(true));
      goToLoginScreen();
    }
  };

  const goToLoginScreen = () => {
    console.log('got here');
    navigation.navigate(Routes.Login);
  };

  return (
    <View style={styles.parentContainer}>
      <FlatList
        ref={screenFlatListRef}
        data={randomData}
        keyExtractor={item => item.id}
        onMomentumScrollEnd={handleGetIndex}
        renderItem={({item, index}) => {
          console.log(index);
          return (
            <OnboardScreen
              bodyText={item.bodyText}
              titleText={item.titleText}
              index={index}
              onPress={handleNextPress}
              skip={() => {
                dispatch(onboardingAction(true));
                navigation.navigate(Routes.Login);
              }}
              activeIndex={(index += 1)}
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
    color: Colors.tertiaryTextColor,
  },
});

export default OnboardingScreens;
