import {Colors} from '@app/constants/colors';
import {Fonts} from '@app/constants/fonts';
import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';

const WText = (props: TextProps) => {
  return <Text style={[styles.text, props.style]}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: Colors.primaryTextColor,
    fontFamily: Fonts.Regular,
  },
});

export default WText;
