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
import {Colors, getThemeColor} from '@app/constants/colors';
import WText from './customText';
import {Fonts} from '@app/constants/fonts';
import {Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '@app/redux/store';

const ConfirmButton = ({
  newStyle,
  onPress,
  buttonText,
}: {
  newStyle?: ViewStyle;
  onPress: any;
  buttonText: string;
}) => {
  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);
  return (
    <View style={{width: screenWidth, backgroundColor: Colors.screenColor}}>
      <Pressable style={{...styles.buttonStyle, ...newStyle}} onPress={onPress}>
        <WText
          style={{
            color: Colors.secondaryTextColor,
            fontSize: 16,
            fontFamily: Fonts.semiBold,
          }}>
          {buttonText}
        </WText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: screenHeight * 0.025,
    marginBottom: screenHeight * 0.025,
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
