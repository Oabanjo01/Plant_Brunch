import {Colors} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {RootStackNavigationProp} from '@app/navigation/navigation';
import {PlantDiseaseType} from '@app/redux/types';
import WText from '@app/utilities/customText';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';

export const SeparatorComponent = () => {
  return <View style={{width: screenWidth * 0.05}} />;
};

export const RenderDiseasePicture = (
  navigation: RootStackNavigationProp,
  plantDisease: PlantDiseaseType,
  loadedPicture: () => void,
  loading: boolean,
) => {
  const image = plantDisease.images[0];
  const nametag = plantDisease.common_name;
  console.log(loading);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('PlantDiseaseDetail', {
          item: plantDisease,
        })
      }>
      <View>
        <FastImage
          style={{
            width: screenWidth * 0.4,
            height: screenHeight * 0.3,
            borderRadius: 10,
          }}
          source={{
            uri: image?.regular_url,
          }}
          resizeMode={Platform.OS === 'android' ? 'cover' : 'contain'}
          onLoadEnd={() => {
            loadedPicture();
            console.log('loaded');
          }}
        />
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
            # {nametag}
          </WText>
        </View>
        {loading && (
          <ActivityIndicator
            color={Colors.primary}
            style={{
              alignItems: 'center',
              height: '100%',
              alignSelf: 'center',
              position: 'absolute',
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};
