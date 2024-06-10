import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {useSelector} from 'react-redux';
import {RootState} from '@app/redux/store';
import {getThemeColor} from '@app/constants/colors';
import {useVisibility} from '@app/themeProvider';

const BottomSheetModal = () => {
  const {setBottomSheetVisible} = useVisibility();

  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);

  const bottomSheetFullHeight = -screenHeight + 100;

  const translationY = useSharedValue(0);
  const previousYaxisValue = useSharedValue({y: 0});

  const gesture = Gesture.Pan()
    .onStart(() => {
      previousYaxisValue.value = {y: translationY.value};
    })
    .onUpdate(event => {
      translationY.value = event.translationY + previousYaxisValue.value.y;
      translationY.value = Math.max(translationY.value, bottomSheetFullHeight);
    })
    .onEnd(() => {
      if (translationY.value > -screenHeight / 5) {
        translationY.value = withSpring(0, {damping: 50});
      } else if (translationY.value < -screenHeight / 1.5) {
        translationY.value = withSpring(bottomSheetFullHeight, {damping: 50});
      }
    });

  const rAnimatedBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translationY.value,
      [-screenHeight + 150, bottomSheetFullHeight],
      [40, 5],
      Extrapolation.CLAMP,
    );
    return {
      borderRadius,
      transform: [{translateY: translationY.value}],
    };
  });

  useEffect(() => {
    translationY.value = withSpring(-screenHeight / 2.5, {
      damping: 50,
    });
    setBottomSheetVisible(true);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: Colors.screenColor, zIndex: 9999}}>
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            styles.bottomSheetStyle,
            rAnimatedBottomSheetStyle,
            {backgroundColor: Colors.lighterBlack},
          ]}>
          <View
            style={{
              ...styles.bottomSheetLineAnchor,
              backgroundColor: Colors.screenColor,
            }}
          />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default BottomSheetModal;

const styles = StyleSheet.create({
  bottomSheetStyle: {
    position: 'absolute',
    height: screenHeight,
    width: screenWidth,
    top: screenHeight,
    alignItems: 'center',
    paddingTop: 10,
  },
  bottomSheetLineAnchor: {
    width: screenWidth * 0.2,
    height: 10,
    borderRadius: 10,
  },
});
