import React, {useState} from 'react';
import {Platform, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ActivityIndicator} from 'react-native-paper';
import {Colors} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {RootStackNavigationProp} from '@app/navigation/navigation';
import {Plant} from '@app/redux/types';
import WText from '@app/utilities/customText';

export const SeparatorComponent = () => {
  return <View style={{width: screenWidth * 0.05}} />;
};

const RenderPlantPictures = ({
  item,
  navigation,
}: {
  item: Plant;
  navigation: RootStackNavigationProp;
}) => {
  const [loading, setLoading] = useState(true);

  const loadedPicture = () => {
    setLoading(false);
  };
  const loadingPicture = () => {
    setLoading(true);
  };
  // console.log(item.default_image.original_url, 'got herrree');
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
        onLoadStart={loadingPicture}
        onLoadEnd={loadedPicture}
        source={{
          uri: item.default_image.original_url,
          priority: FastImage.priority.normal,
        }}
        resizeMode={'cover'}
        style={{
          borderRadius: 10,
          width: screenWidth * 0.73,
          height: screenHeight * 0.22,
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
          # {item.common_name}
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
    </TouchableOpacity>
  );
};

export default RenderPlantPictures;
