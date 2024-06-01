import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewProps,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {Colors} from '@app/constants/colors';
import WText from './customText';
import {Fonts} from '@app/constants/fonts';
import {Pressable} from 'react-native';

const ConfirmButton = ({
  newStyle,
  onPress,
  buttonText,
}: {
  newStyle?: ViewStyle;
  onPress: any;
  buttonText: string;
}) => {
  return (
    <Pressable style={{...styles.buttonStyle, ...newStyle}} onPress={onPress}>
      <WText
        style={{
          color: Colors.secondaryTextColor,
          fontSize: 16,
          fontFamily: Fonts.semiBold,
        }}>
        {/* Proceed to Buy */}
        {buttonText}
      </WText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: screenHeight * 0.05,
    marginBottom: screenHeight * 0.025,
    // position: 'absolute',
    // bottom: screenHeight * 0.02,
    backgroundColor: Colors.primary,
    borderRadius: 15,
    height: screenHeight * 0.06,
    width: screenWidth * 0.8,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ConfirmButton;
