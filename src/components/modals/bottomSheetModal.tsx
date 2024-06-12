import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useImperativeHandle} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  runOnJS,
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
import WText from '@app/utilities/customText';

type BottomSheetProps = {
  children: React.ReactNode;
};
export type BottomSheetRefProps = {
  scrollTo: (scrollheight: number, damping: number) => void;
};

const BottomSheetModal = React.forwardRef<
  BottomSheetRefProps,
  BottomSheetProps
>((props, ref) => {
  const {children} = props;
  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);

  const {setBottomSheetVisible, isBottomSheetVisible} = useVisibility();

  const bottomSheetFullHeight = -screenHeight + 100;

  const translationY = useSharedValue(0);
  const previousYaxisValue = useSharedValue({y: 0});

  const scrollTo = useCallback((scrollheight: number, damping: number) => {
    'worklet';
    translationY.value = withSpring(scrollheight, {damping: damping});
    if (scrollheight === 0) {
      runOnJS(setBottomSheetVisible)(false);
    }
  }, []);

  // const closeBottomSheet = useCallback(() => {
  //   'worklet';
  //   // setTimeout(() => {
  //   scrollTo(0, 50);
  //   // }, 1000);

  // }, []);

  // exposes the ref to the parent component, i.e dropdown in this case
  useImperativeHandle(ref, () => ({scrollTo}), [scrollTo]);

  const gesture = Gesture.Pan()
    .onStart(() => {
      previousYaxisValue.value = {y: translationY.value};
    })
    .onUpdate(event => {
      translationY.value = event.translationY + previousYaxisValue.value.y;
      translationY.value = Math.max(translationY.value, bottomSheetFullHeight);
    })
    .onEnd(() => {
      if (translationY.value > -screenHeight / 3) {
        scrollTo(0, 50);
      } else if (translationY.value < -screenHeight / 1.5) {
        scrollTo(bottomSheetFullHeight, 50);
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
          {children}
        </Animated.View>
      </GestureDetector>
    </View>
  );
});

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
