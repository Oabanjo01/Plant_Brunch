import {screenHeight} from '@app/constants/dimensions';
import WText from '@app/utilities/customText';
import React from 'react';
import {TextStyle, View} from 'react-native';

export const RenderCartedItemDetails = ({
  title,
  specifics,
  titleStyle,
}: {
  title: string;
  specifics: string | number;
  titleStyle?: TextStyle;
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: screenHeight * 0.005,
      }}>
      <WText style={titleStyle}>{title}</WText>
      <WText>{specifics}</WText>
    </View>
  );
};
