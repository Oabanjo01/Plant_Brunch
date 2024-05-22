import {getThemeColor} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {RootState} from '@app/redux/store';
import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useSelector} from 'react-redux';

const LoadingIndicator = ({size}: {size: number}) => {
  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);
  return (
    <View
      style={{
        backgroundColor: Colors.screenColor,
        height: screenHeight,
        width: screenWidth,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator color={Colors.primary} size={size} />
    </View>
  );
};

export default LoadingIndicator;
