import {Routes} from '@app/constants';
import {getThemeColor} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {ScreenProps} from '@app/navigation/navigation';
import {RootState} from '@app/redux/store';
import WText from '@app/utilities/customText';
import useCameraDevice from '@app/utilities/hooks/camera/useCamera';
import {UsePickImage} from '@app/utilities/hooks/pickImage/usePickImage';
import LoadingIndicator from '@app/utilities/loadingIndicator';
import {useLoadingIndicator} from 'App';
import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
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
        {
          <TouchableOpacity
            onPress={() => handlePhoneVersion(navigation)}
            style={{
              borderWidth: 2,
              width: screenWidth * 0.3,
              alignItems: 'center',
              padding: 10,
              borderRadius: 20,
              borderColor: Colors.tabBarTextColor,
            }}>
            <Ionicons
              name={'camera-outline'}
              size={50}
              style={{
                alignSelf: 'center',
                marginBottom: 5,
              }}
              color={Colors.primary}
            />
            <WText style={{color: Colors.primaryTextColor}}>Camera</WText>
          </TouchableOpacity>
        }
        <TouchableOpacity
          onPress={() => {}}
          style={{
            borderWidth: 2,
            padding: 10,
            borderRadius: 20,
            borderColor: Colors.tabBarTextColor,
            alignItems: 'center',
            width: screenWidth * 0.3,
          }}>
          <Ionicons
            name={'image-outline'}
            size={50}
            style={{
              alignSelf: 'center',
              marginBottom: 5,
            }}
            onPress={() => {
              selectImage();
            }}
            color={Colors.primary}
          />
          <WText style={{color: Colors.primaryTextColor}}>Access Files</WText>
        </TouchableOpacity>
      </View>
    );
  }
};

export default CameraPage;

const styles = StyleSheet.create({});
