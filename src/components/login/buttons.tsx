import {Colors} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import WText from '@app/utilities/customText';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface LargeButtonProps {
  extraStyle?: ViewStyle;
  text: string;
  onPress?: () => void;
}
export const LargeButton = (prop: LargeButtonProps) => {
  const {extraStyle, text, onPress} = prop;
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={[styles.buttonContainerStyle, extraStyle]}>
        <WText style={styles.buttonTextStyle}>{text}</WText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainerStyle: {
    height: screenHeight * 0.05,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '14%',
    borderRadius: 3,
    width: screenWidth * 0.85,
  },
  buttonTextStyle: {
    textAlign: 'center',
    fontFamily: 'OpenSans-Bold',
    fontSize: 15,
    color: Colors.tertiaryTextColor,
  },
});
