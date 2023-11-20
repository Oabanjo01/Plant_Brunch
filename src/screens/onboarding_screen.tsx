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

type OnboardingProps = {
  bodyText: string;
  titleText: string;
  index?: number;
};

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

const OnboardingScreen = ({bodyText, titleText, index}: OnboardingProps) => {
  let svgToRender;
  switch (index) {
    case 0:
      <Onboarding1 width="80%" height="50%" />;
      break;
    case 1:
      <Onboarding2 width="80%" height="50%" />;
      break;
    case 2:
      <Onboarding3 width="80%" height="50%" />;
      break;

    default:
      break;
  }
  return (
    <View style={styles.parentContainer}>
      {svgToRender}
      <Text style={styles.titleTextStyle}>{titleText}</Text>
      <Text style={styles.bodyTextStyle}>{bodyText}</Text>
      <TouchableOpacity activeOpacity={0.8}>
        <View style={styles.buttonContainerStyle}>
          <Text style={styles.buttonTextStyle}>Next</Text>
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
export default OnboardingScreen;
