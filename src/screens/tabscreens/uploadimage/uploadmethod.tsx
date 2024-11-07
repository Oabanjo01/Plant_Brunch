import {getThemeColor} from '@app/constants/colors';
import {screenWidth} from '@app/constants/dimensions';
import {ScreenProps} from '@app/navigation/navigation';
import {RootState} from '@app/redux/store';
import WText from '@app/utilities/customText';
import useCameraDevice from '@app/utilities/hooks/camera/useCamera';
import {UsePickImage} from '@app/utilities/hooks/pickImage/usePickImage';
import LoadingIndicator from '@app/utilities/loadingIndicator';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

const CameraPage = ({navigation}: ScreenProps) => {
  const {handlePermission, handlePhoneVersion} = useCameraDevice();
  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);

  const {selectImage, selectedImages, isLoading} = UsePickImage({navigation});
  // [ ]: Create an add product screen, that user is directed to, after taking image. Should contain every essential information.
  if (isLoading) {
    return <LoadingIndicator size={40} showIcon />;
  } else {
    return (
      <View
        style={{
          backgroundColor: Colors.screenColor,
          justifyContent: 'space-evenly',
          flex: 1,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        {uploadBoxIcon(
          () => {
            handlePhoneVersion(navigation);
          },
          'camera-outline',
          'Camera',
          Colors.tabBarTextColor,
          Colors.primary,
          Colors.primaryTextColor,
        )}
        {uploadBoxIcon(
          () => {
            selectImage();
          },
          'image-outline',
          'Access Files',
          Colors.tabBarTextColor,
          Colors.primary,
          Colors.primaryTextColor,
        )}
      </View>
    );
  }
};

export function uploadBoxIcon(
  onPress: () => void,
  iconName: string,
  boxName: string,
  borderColor: string,
  iconColor: string,
  boxNameColor: string,
) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderWidth: 2,
        width: screenWidth * 0.3,
        alignItems: 'center',
        padding: 10,
        borderRadius: 20,
        borderColor: borderColor,
      }}>
      <Ionicons
        name={iconName}
        size={50}
        style={{
          alignSelf: 'center',
          marginBottom: 5,
        }}
        color={iconColor}
      />
      <WText style={{color: boxNameColor}}>{boxName}</WText>
    </TouchableOpacity>
  );
}

export default CameraPage;

const styles = StyleSheet.create({});
