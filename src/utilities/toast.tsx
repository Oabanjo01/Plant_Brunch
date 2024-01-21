import {Colors} from '@app/constants';
import {screenWidth} from '@app/constants/dimensions';
import {Platform, Text, ToastAndroid, View} from 'react-native';

import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';

interface ToastProps {
  text1: string;
  text2: string;
  type: string;
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
      <Text
        style={{color: Colors.lightTextColor, fontWeight: '600', fontSize: 18}}>
        {props.text1}
      </Text>
      <Text
        style={{color: Colors.lightTextColor, fontWeight: '400', fontSize: 14}}>
        {props.text2}
      </Text>
    </View>
  );
};

export const showToast = ({type, text1, text2}: ToastProps) => {
  console.log('type', type, 'text1', text1, 'text2', text2);
  Toast.show({
    type: type,
    props: {text1: text1, text2: text2},
    position: 'bottom',
    visibilityTime: 5000,
    bottomOffset: 20,
    text1: text1,
    text2: text2,
  });
};
