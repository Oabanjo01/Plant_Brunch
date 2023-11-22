import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Onboarding1 from '@assets/images/Onboarding1.svg';
import Onboarding2 from '@assets/images/Onboarding2.svg';
import Onboarding3 from '@assets/images/Onboarding3.svg';
import {Colors} from '@app/constants/colors';
import IndicatorDot from './indicatorDots';

type OnboardingProps = {
  bodyText: string;
  titleText: string;
  index?: number;
  onPress?: () => void;
  activeIndex: number;
};

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
let svgToRender: JSX.Element;

const OnboardScreen = ({
  bodyText,
  titleText,
  index,
  onPress,
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

  // add active indicators here

  // const Dots = () => {
  //   return (
  //     <View style={{alignItems: 'center', width: '30%'}}>
  //       <View style={{}}>

  //       </View>
  //     </View>
  //   )
  // }
  return (
    <View style={styles.parentContainer}>
      {svgToRender}
      <Text style={styles.titleTextStyle}>{titleText}</Text>
      <Text style={styles.bodyTextStyle}>{bodyText}</Text>
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
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View style={styles.buttonContainerStyle}>
          <Text style={styles.buttonTextStyle}>
            {index === 2 ? 'Get Started' : 'Next'}
          </Text>
        </View>
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
    color: Colors.lightTextColor,
  },
  dotContainer: {
    alignItems: 'center',
    marginTop: '4%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default OnboardScreen;
