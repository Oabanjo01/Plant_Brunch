import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {Colors} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import WText from '@app/utilities/customText';
import Onboarding1 from '@assets/images/Onboarding1.svg';
import Onboarding2 from '@assets/images/Onboarding2.svg';
import Onboarding3 from '@assets/images/Onboarding3.svg';
import {LargeButton} from '../login/buttons';
import IndicatorDot from './indicatorDots';

type OnboardingProps = {
  bodyText: string;
  titleText: string;
  index: number;
  onPress?: () => void;
  skip?: () => void;
  activeIndex: number;
};

let svgToRender: JSX.Element;

const OnboardScreen = ({
  bodyText,
  titleText,
  index,
  onPress,
  skip,
  activeIndex,
}: OnboardingProps) => {
  switch (index) {
    case 0:
      svgToRender = <Onboarding1 width="80%" height="50%" />;
      break;
    case 1:
      svgToRender = <Onboarding2 width="80%" height="50%" />;
      break;
    case 2:
      svgToRender = <Onboarding3 width="80%" height="50%" />;
      break;

    default:
      break;
  }
  return (
    <View style={styles.parentContainer}>
      {svgToRender}
      <WText style={styles.titleTextStyle}>{titleText}</WText>
      <WText style={styles.bodyTextStyle}>{bodyText}</WText>
      <View style={styles.dotContainer}>
        <IndicatorDot
          dotStyle={
            activeIndex === 1 ? styles.activeDotColor : styles.inActiveDotColor
          }
        />
        <IndicatorDot
          dotStyle={
            activeIndex === 2 ? styles.activeDotColor : styles.inActiveDotColor
          }
        />
        <IndicatorDot
          dotStyle={
            activeIndex === 3 ? styles.activeDotColor : styles.inActiveDotColor
          }
        />
      </View>
      <LargeButton
        text={index === 2 ? 'Get Started' : 'Next'}
        onPress={onPress}
      />
      <TouchableOpacity style={{shadowColor: Colors.primary}} onPress={skip}>
        <WText style={{marginTop: '2%', color: Colors.primaryTextColor}}>
          {index < 2 ? 'Skip' : null}
        </WText>
      </TouchableOpacity>
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
  activeDotColor: {backgroundColor: Colors.primary},
  inActiveDotColor: {backgroundColor: Colors.onboardingInactiveIconColor},
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
  skipContainerstyle: {
    marginTop: '3%',
  },
  skipTextstyle: {
    color: 'grey',
  },
  buttonContainerStyle: {
    paddingVertical: '2%',
    backgroundColor: Colors.primary,
    marginTop: '14%',
    borderRadius: 3,
    width: screenWidth * 0.89,
  },
  buttonTextStyle: {
    textAlign: 'center',
    fontFamily: 'OpenSans-Bold',
    fontSize: 15,
    color: Colors.tertiaryTextColor,
  },
  dotContainer: {
    alignItems: 'center',
    marginTop: '4%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default OnboardScreen;
