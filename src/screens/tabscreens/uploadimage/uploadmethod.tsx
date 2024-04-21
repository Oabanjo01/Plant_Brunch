import {Colors, Routes} from '@app/constants';
import {ScreenProps} from '@app/navigation/navigation';
import WText from '@app/utilities/customText';
import {showToast} from '@app/utilities/toast';
import React from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useCameraPermission} from 'react-native-vision-camera';

const CameraPage = ({navigation}: ScreenProps) => {
  const {hasPermission, requestPermission} = useCameraPermission();

  const handlePhoneVersion = () => {
    return (Platform.OS === 'ios' && parseInt(Platform.Version, 10) >= 12) ||
      (Platform.OS === 'android' && Platform.Version >= 26)
      ? handlePermission()
      : showToast({
          text1: 'Denied',
          text2: 'You cannot access this feature',
          type: 'info',
        });
  };

  const handlePermission = async () => {
    if (hasPermission) {
      navigation.push(Routes.Camera);
    } else {
      await requestPermission()
        .then(permissionStatus => {
          if (!permissionStatus) {
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
      style={{
        justifyContent: 'space-evenly',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      {
        <TouchableOpacity
          onPress={handlePhoneVersion}
          style={{
            borderWidth: 2,
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
          <WText style={{color: Colors.primaryTextColor}}>Camerapage</WText>
        </TouchableOpacity>
      }
      <TouchableOpacity
        onPress={() => {}}
        style={{
          borderWidth: 2,
          padding: 10,
          borderRadius: 20,
          borderColor: Colors.tabBarTextColor,
        }}>
        <Ionicons
          name={'image-outline'}
          size={50}
          style={{
            alignSelf: 'center',
            marginBottom: 5,
          }}
          onPress={() => {}}
          color={Colors.primary}
        />
        <WText style={{color: Colors.primaryTextColor}}>Access Files</WText>
      </TouchableOpacity>
    </View>
  );
};

export default CameraPage;

const styles = StyleSheet.create({});
