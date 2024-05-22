import {getThemeColor} from '@app/constants/colors';
import {Fonts} from '@app/constants/fonts';
import {RootState} from '@app/redux/store';
import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import {useSelector} from 'react-redux';

const WText = (props: TextProps) => {
  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);
  const styles = StyleSheet.create({
    text: {
      color: Colors.primaryTextColor,
      fontFamily: Fonts.Regular,
    },
  });
  return <Text style={[styles.text, props.style]}>{props.children}</Text>;
};

export default WText;
