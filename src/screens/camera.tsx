import {Colors} from '@app/constants';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {ScreenProps} from '@app/navigation/navigation';
import {showToast} from '@app/utilities/toast';
import {useAppState} from '@react-native-community/hooks';
import {useIsFocused} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {Camera, PhotoFile, useCameraDevice} from 'react-native-vision-camera';

const CameraScreen = ({navigation}: ScreenProps) => {
  const [photo, setPhoto] = useState<PhotoFile>();
  const [flashActive, setFlashactive] = useState<boolean>(false);

  const camera = useRef<Camera>(null);
  const device = useCameraDevice('back', {
    physicalDevices: [
      'ultra-wide-angle-camera',
      'telephoto-camera',
      'wide-angle-camera',
    ],
  });
  const isFocused = useIsFocused();
  const appState = useAppState();
  const isActive = isFocused && appState === 'active';

  const onTakePicture = async () => {
    const photo = await camera.current?.takePhoto({
      flash: flashActive ? 'on' : 'off',
    });
    setPhoto(photo);
  };

  const handleNoCameraDevice = () => {
    return showToast({
      text1: 'No camera device',
      text2: 'Could not find camera device',
      type: 'info',
    });
  };

  return !device ? (
    handleNoCameraDevice()
  ) : (
    <View style={{flex: 1, backgroundColor: Colors.primaryTextColor}}>
      {photo ? (
        <>
          <View style={{flex: 1}}>
            <Image
              source={{uri: `file://${photo.path}`}}
              style={{
                flex: 1,
                resizeMode: 'cover',
              }}
            />
            <View style={{position: 'absolute', top: 20, right: 20}}>
              <Ionicons
                name={'close-outline'}
                size={30}
                onPress={() => {
                  navigation.goBack();
                }}
                color={Colors.whiteColor}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 20,
              height: screenHeight * 0.2,
              width: screenWidth,
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              style={{
                width: 55,
                height: 55,
                borderRadius: 55 / 2,
                borderColor: Colors.whiteColor,
                borderWidth: 3,
                marginLeft: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                setPhoto(undefined);
              }}>
              <Ionicons
                name={'close-outline'}
                size={30}
                color={Colors.favouriteButtonColor}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: 55,
                height: 55,
                borderRadius: 55 / 2,
                borderColor: Colors.whiteColor,
                borderWidth: 3,
                marginRight: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {}}>
              <Ionicons
                name={'checkmark-outline'}
                style={{alignSelf: 'center'}}
                size={30}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          {/* <View></View> */}
          <Camera
            ref={camera}
            device={device}
            isActive={isActive}
            style={{flex: 1}}
            photo={true}
          />
          <View
            style={{
              width: screenWidth,
              flexDirection: 'row',
              justifyContent: 'center',
              height: screenHeight * 0.2,
              alignItems: 'center',
            }}>
            {Platform.OS === 'ios' ? (
              <>
                <Ionicons
                  name={flashActive ? 'flash-outline' : 'flash-off-outline'}
                  style={{position: 'absolute', left: screenWidth * 0.15}}
                  onPress={() => setFlashactive(!flashActive)}
                  size={30}
                  color={Colors.primary}
                />
                <TouchableOpacity
                  onPress={() => {
                    onTakePicture();
                  }}>
                  <View style={styles.cameraButton}></View>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Ionicons
                  name={flashActive ? 'flash-outline' : 'flash-off-outline'}
                  style={{position: 'absolute', left: screenWidth * 0.15}}
                  onPress={() => setFlashactive(flashActive => !flashActive)}
                  size={30}
                  color={Colors.primary}
                />
                <TouchableNativeFeedback
                  onPress={() => {
                    onTakePicture();
                  }}>
                  <View style={styles.cameraButton}></View>
                </TouchableNativeFeedback>
              </>
            )}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cameraButton: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.whiteColor,
    borderWidth: 3,
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
  },
});
export default CameraScreen;
