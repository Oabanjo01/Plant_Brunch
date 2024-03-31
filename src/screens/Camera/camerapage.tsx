import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useCameraPermission} from 'react-native-vision-camera';
import {showToast} from '@app/utilities/toast';

const CameraPage = () => {
  const {hasPermission, requestPermission} = useCameraPermission();

  const handlePermission = async () => {
    if (hasPermission) {
      console.log('Camera permission granted');
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
  return (
    <View
      style={{justifyContent: 'space-around', flex: 1, alignItems: 'center'}}>
      <TouchableOpacity onPress={handlePermission}>
        <Text>Camerapage</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePermission}>
        <Text>Access Files</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CameraPage;

const styles = StyleSheet.create({});
