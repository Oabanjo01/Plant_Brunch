import {DarkColors} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import React from 'react';
import {ActivityIndicator, View} from 'react-native';

const LoadingIndicator = ({size}: {size: number}) => {
  return (
    <View
      style={{
        backgroundColor: DarkColors.screenColor,
        height: screenHeight,
        width: screenWidth,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator color={DarkColors.primary} size={size} />
    </View>
  );
};

export default LoadingIndicator;
