import {Colors} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {RootStackNavigationProp} from '@app/navigation/navigation';
import {PlantDiseaseType} from '@app/redux/types';
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
  // loading: boolean,
) => {
  const image = plantDisease.images[0];
  const nametag = plantDisease.common_name;

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('PlantDiseaseDetail', {
          item: plantDisease,
        })
      }>
      <View>
        {/* {loading && (
          <ActivityIndicator color={Colors.primary}></ActivityIndicator>
        )} */}
        <FastImage
          source={{
            uri: image?.regular_url,
          }}
          resizeMode={Platform.OS === 'android' ? 'cover' : 'contain'}
          onLoadEnd={() => {
            console.log('onloadend');
          }}
          onLoadStart={() => console.log('onloadstart')}
          style={{
            width: screenWidth * 0.4,
            height: screenHeight * 0.25,
            borderRadius: 10,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};
