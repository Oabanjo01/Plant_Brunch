import {Colors} from '@app/constants';
import {screenWidth} from '@app/constants/dimensions';
import {Platform, Text, ToastAndroid, View} from 'react-native';

import Toast, {
  BaseToast,
  ErrorToast,
  ToastPosition,
} from 'react-native-toast-message';
import WText from './customText';
import React from 'react';

interface ToastProps {
  text1: string;
  text2: string;
  type: 'success' | 'info' | 'error';
  position?: ToastPosition;
}

export const toastConfig = {
  success: ({props}: {props: ToastProps}) =>
    customToasts({props: props, backgroundColor: Colors.primary}),
  error: ({props}: {props: ToastProps}) =>
    customToasts({props: props, backgroundColor: Colors.favouriteButtonColor}),

  info: ({props}: {props: ToastProps}) =>
    customToasts({props: props, backgroundColor: Colors.addPhotoButtonColor}),
};

const customToasts = ({
  backgroundColor,
  props,
}: {
  backgroundColor: string;
  props: ToastProps;
}) => {
  return (
    <View
      style={{
        padding: 15,
        // marginHorizontal: 20,
        width: screenWidth * 0.8,
        backgroundColor: backgroundColor,
        opacity: 0.8,
        borderRadius: 15,
      }}>
      <WText
        style={{
          color: Colors.tertiaryTextColor,
          fontWeight: '600',
          fontSize: 18,
        }}>
        {props.text1}
      </WText>
      <WText
        style={{
          color: Colors.tertiaryTextColor,
          fontWeight: '400',
          fontSize: 14,
        }}>
        {props.text2}
      </WText>
    </View>
  );
};

export const showToast = ({type, text1, text2, position}: ToastProps) => {
  Toast.hide();
  Toast.show({
    type: type,
    props: {text1: text1, text2: text2},
    position: position || 'bottom',
    visibilityTime: 5000,
    bottomOffset: 20,
    text1: text1,
    text2: text2,
  });
};
