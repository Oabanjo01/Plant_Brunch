import {getThemeColor} from '@app/constants/colors';
import {screenWidth} from '@app/constants/dimensions';
import {RootState} from '@app/redux/store';
import CustomLogo from '@assets/images/CustomLogo.svg';
import React, {useEffect, useRef} from 'react';
import {ActivityIndicator, Animated, View} from 'react-native';
import {useSelector} from 'react-redux';

const LoadingIndicator = ({
  size,
  showIcon,
  visible,
}: {
  size: number;
  showIcon?: boolean;
  visible?: boolean;
}) => {
  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);

  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const bounceAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );

    bounceAnimation.start();

    return () => bounceAnimation.stop();
  }, [bounceAnim]);

  const bounceInterpolation = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20], // Adjust this value to control bounce height
  });

  if (!visible) return null;
  return (
    <View
      pointerEvents="none"
      style={{
        backgroundColor: Colors.screenColor,
        height: '100%',
        width: screenWidth,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {showIcon ? (
        <Animated.View
          style={[
            {
              transform: [{translateY: bounceInterpolation}],
              backgroundColor: Colors.screenColor,
            },
          ]}>
          {showIcon ? (
            <CustomLogo />
          ) : (
            <ActivityIndicator color={Colors.primary} size={size} />
          )}
        </Animated.View>
      ) : (
        <ActivityIndicator color={Colors.primary} size={size} />
      )}
    </View>
  );
};

export default LoadingIndicator;
