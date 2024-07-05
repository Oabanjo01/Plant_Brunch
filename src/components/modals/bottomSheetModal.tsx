import {getThemeColor} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {RootState} from '@app/redux/store';
import {useVisibility} from '@app/themeProvider';
import React, {useCallback, useImperativeHandle} from 'react';
import {StyleSheet, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {useSelector} from 'react-redux';

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

  const {setBottomSheetVisible, setForceCloseModal} = useVisibility();

  const bottomSheetFullHeight = -screenHeight + 100;

  const translationY = useSharedValue(screenHeight);
  const previousYaxisValue = useSharedValue({y: 0});

  const scrollTo = useCallback((scrollheight: number, damping: number) => {
    'worklet';
    translationY.value = withSpring(scrollheight, {damping: damping});
    if (scrollheight > 0) {
      runOnJS(setBottomSheetVisible)(false);
      runOnJS(setForceCloseModal)(false);
    }
  }, []);

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
        scrollTo(2000, 50);
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
    height: screenHeight * 1.2,
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
