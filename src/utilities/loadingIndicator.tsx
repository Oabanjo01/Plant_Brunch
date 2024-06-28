import {getThemeColor} from '@app/constants/colors';
import {screenWidth} from '@app/constants/dimensions';
import {RootState} from '@app/redux/store';
import CustomLogo from '@assets/images/CustomLogo.svg';
import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useSelector} from 'react-redux';

const LoadingIndicator = ({
  size,
  showIcon,
}: {
  size: number;
  showIcon?: boolean;
}) => {
  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);
  return (
    <View
      style={{
        backgroundColor: Colors.screenColor,
        height: '100%',
        width: screenWidth,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {showIcon ? (
        <CustomLogo />
      ) : (
        <ActivityIndicator color={Colors.primary} size={size} />
      )}
    </View>
  );
};

export default LoadingIndicator;
