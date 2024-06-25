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

export const RenderDiseasePicture = ({
  plantDisease,
  navigation,
}: {
  plantDisease: PlantDiseaseType;
  navigation: RootStackNavigationProp;
}) => {
  const image = plantDisease.images;
  const nametag = plantDisease.common_name;

  const [loading, setLoading] = useState(true);

  const loadedPicture = () => {
    setLoading(false);
  };
  const loadingPicture = () => {
    setLoading(true);
  };
  // console.log(plantDisease.description, 'plantDisease');
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
          source={
            image.length > 0
              ? {
                  uri: image[0]?.regular_url,
                }
              : require('../../../assets/images/Picture.png')
          }
          resizeMode={Platform.OS === 'android' ? 'cover' : 'contain'}
          onLoadEnd={loadedPicture}
          onLoadStart={loadingPicture}
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
