import {Routes} from '@app/constants';
import {RootStackNavigationProp, ScreenProps} from '@app/navigation/navigation';
import {showToast} from '@app/utilities/toast';
import {Platform} from 'react-native';
import {useCameraPermission} from 'react-native-vision-camera';

const useCameraDevice = () => {
  const {hasPermission, requestPermission} = useCameraPermission();

  const handlePermission = async (navigation: RootStackNavigationProp) => {
    if (hasPermission) {
      navigation.push(Routes.CameraScreen);
    } else {
      const permissionStatus = await requestPermission();
      try {
        if (!permissionStatus) {
          showToast({
            text1: 'Camera permission denied',
            text2: 'Grant camera permission',
            type: 'info',
          });
          return;
        }
        if (permissionStatus) {
          navigation.push(Routes.CameraScreen);
        }
      } catch (error) {
        showToast({
          text1: 'Error',
          text2: 'An error occurred while opening camera',
          type: 'error',
        });
      }
    }
  };

  const handlePhoneVersion = (navigation: RootStackNavigationProp) => {
    return (Platform.OS === 'ios' && parseInt(Platform.Version, 10) >= 12) ||
      (Platform.OS === 'android' && Platform.Version >= 26)
      ? handlePermission(navigation)
      : showToast({
          text1: 'Denied',
          text2: 'You cannot access this feature',
          type: 'info',
        });
  };

  return {
    handlePhoneVersion,
    handlePermission,
  };
};

export default useCameraDevice;
