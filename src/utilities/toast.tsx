import {Platform, ToastAndroid} from 'react-native';
import Toast from 'react-native-toast-message';

export const showToast = () => {
  // if (Platform.OS === 'android') {
  //   ToastAndroid.showWithGravityAndOffset(
  //     'This is some something 👋',
  //     ToastAndroid.LONG,
  //     ToastAndroid.BOTTOM,
  //     25,
  //     50,
  //   );
  // } else {
  Toast.show({
    type: 'success',
    text1: 'Hello',
    text2: 'This is some something 👋',
  });
  // }
};
