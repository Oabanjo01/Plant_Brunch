import {Colors} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {RootStackNavigationProp} from '@app/navigation/navigation';
import {Plant} from '@app/redux/types';
import WText from '@app/utilities/customText';
import React from 'react';
import {Platform, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ActivityIndicator} from 'react-native-paper';

export const SeparatorComponent = () => {
  return <View style={{width: screenWidth * 0.05}} />;
};

const RenderPlantPictures = (
  item: Plant,
  pictureIsLoading: boolean,
  navigation: RootStackNavigationProp,
) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('PlantListDetail', {
          item: item,
        });
      }}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <FastImage
        onLoad={() => console.log('onloadend')}
        onLoadStart={() => console.log('onloadend')}
        source={{
          uri: item.default_image.regular_url,
          priority: FastImage.priority.normal,
        }}
        resizeMode={Platform.OS === 'android' ? 'cover' : 'contain'}
        style={{
          borderRadius: 10,
          width: screenWidth * 0.73,
          height: screenHeight * 0.22,
        }}
      />
      {(pictureIsLoading || !item) && (
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}>
          <ActivityIndicator
            color={Colors.primary}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              borderRadius: 5,
              padding: 10,
            }}
          />
        </View>
      )}

      <View
        style={{
          backgroundColor: Colors.whiteColor,
          position: 'absolute',
          left: 0,
          bottom: 20,
          opacity: 0.8,
          padding: 5,
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
        }}>
        <WText
          style={{
            color: Colors.primaryTextColor,
          }}>
          # {item.common_name}
        </WText>
      </View>
    </TouchableOpacity>
  );
};

export default RenderPlantPictures;
