import {Colors} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {Fonts} from '@app/constants/fonts';
import {RootStackNavigationProp} from '@app/navigation/navigation';
import {PlantDiseaseType} from '@app/redux/types';
import WText from '@app/utilities/customText';
import React from 'react';
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
  pictureIsLoading: boolean,
  pictureLoadingStarts: () => void,
  pictureLoadingEnds: () => void,
  pictureLoading: boolean,
) => {
  const image = plantDisease.images[0];
  const nametag = plantDisease.common_name;
  console.log(pictureIsLoading, pictureLoading);
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('PlantDiseaseDetail', {
          item: plantDisease,
        })
      }>
      <FastImage
        source={{
          uri: image?.regular_url,
        }}
        resizeMode={Platform.OS === 'android' ? 'cover' : 'contain'}
        onLoadEnd={pictureLoadingEnds}
        onLoadStart={pictureLoadingStarts}
        style={{
          width: screenWidth * 0.4,
          height: screenHeight * 0.25,
          borderRadius: 10,
        }}
      />
      {plantDisease &&
        !pictureIsLoading &&
        (pictureLoading ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: screenWidth * 0.4,
              height: screenHeight * 0.25,
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
        ) : null)}
      <View
        style={{
          backgroundColor: Colors.whiteColor,
          position: 'absolute',
          bottom: 20,
          opacity: 0.8,
          padding: 5,
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
        }}>
        <WText
          style={{
            color: Colors.primaryTextColor,
            fontFamily: Fonts.Regular,
          }}>
          # {nametag}
        </WText>
      </View>
    </TouchableOpacity>
  );
};
