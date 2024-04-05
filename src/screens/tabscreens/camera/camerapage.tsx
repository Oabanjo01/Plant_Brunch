import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {showToast} from '@app/utilities/toast';

const CameraPage = () => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);

  const handlePermission = async () => {
    if (hasPermission) {
      return (
        <Camera
          ref={camera}
          device={device}
          isActive={true}
          style={{flex: 1}}
        />
      );
      // Proceed with using the camera
    } else {
      // Request camera permission if it has not been granted or denied yet
      await requestPermission()
        .then(permissionStatus => {
          if (permissionStatus) {
            console.log('Camera permission granted');
            // Proceed with using the camera
          } else {
            showToast({
              text1: 'Camera permission denied',
              text2: 'Grant camera permission',
              type: 'info',
            });
          }
        })
        .catch(error => {
          console.error('Error requesting camera permission:', error);
        });
    }
  };
  return (Platform.OS === 'ios' && parseInt(Platform.Version, 10) >= 12) ||
    (Platform.OS === 'android' && Platform.Version >= 26) ? (
    !hasPermission ? (
      <View
        style={{justifyContent: 'space-around', flex: 1, alignItems: 'center'}}>
        <TouchableOpacity onPress={handlePermission}>
          <Text>Camerapage</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePermission}>
          <Text>Access Files</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <Camera ref={camera} device={device} isActive={true} style={{flex: 1}} />
    )
  ) : (
    <Text>You need a better phone bro</Text>
  );
};

export default CameraPage;

const styles = StyleSheet.create({});
