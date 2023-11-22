import {Colors} from '@app/constants/colors';
import React from 'react';
import {Dimensions, StyleSheet, View, ViewStyle} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

interface IndicatorDotProps {
  dotStyle: ViewStyle;
}
const IndicatorDot: React.FC<IndicatorDotProps> = (
  props: IndicatorDotProps,
) => {
  const {dotStyle} = props;
  return <View style={[styles.dotStyle, dotStyle]} />;
};

const styles = StyleSheet.create({
  dotStyle: {
    marginRight: '2.5%',
    borderRadius: Math.round(height + width) / 2,
    width: width * 0.03,
    height: width * 0.03,
  },
});

export default IndicatorDot;
