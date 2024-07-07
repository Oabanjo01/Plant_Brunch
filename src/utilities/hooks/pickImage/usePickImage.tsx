import {ScreenProps} from '@app/navigation/navigation';
import {showToast} from '@app/utilities/toast';
import {useLoadingIndicator} from '../../../../App';
import {useState} from 'react';
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';

export const UsePickImage = ({navigation}: ScreenProps) => {
  const [selectedImages, setSelectedImages] = useState<Asset[]>([]);
  const [transferred, setTransferred] = useState(0);
  const {isLoading, setIsLoading} = useLoadingIndicator();

  const selectImage = async () => {
    setIsLoading(true);

    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 5,
      includeBase64: true,
    };

    try {
      await launchImageLibrary(options, response => {
        if (response.didCancel) {
          showToast({
            type: 'info',
            text1: 'Cancelled',
            text2: 'Cancelled image selection process',
            position: 'bottom',
          });
        } else if (response.errorCode === 'camera_unavailable') {
          showToast({
            type: 'error',
            text1: 'Error',
            text2: 'Camera is unavailable',
            position: 'bottom',
          });
        } else if (response.errorCode === 'permission') {
          showToast({
            type: 'error',
            text1: 'Error',
            text2: 'Permission not granted',
            position: 'bottom',
          });
        } else if (response.errorCode === 'others') {
          showToast({
            type: 'error',
            text1: 'Error',
            text2: 'An error occurred, please try again later',
            position: 'bottom',
          });
        } else if (response.assets) {
          setSelectedImages(response.assets);
          if (response.assets.length > 0) {
            navigation.navigate('PhotoView', {photo: response.assets});
          }
        }
      });
    } catch (error) {
      setIsLoading(false);
      showToast({
        type: 'error',
        text1: 'Error',
        text2: 'An error occurred, please try again later',
        position: 'bottom',
      });
    } finally {
      setIsLoading(false);
    }
  };
  return {
    selectedImages,
    selectImage,
    isLoading,
    setIsLoading,
  };
};
