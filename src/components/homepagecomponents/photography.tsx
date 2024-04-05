import {Colors} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {
  ActivityIndicator,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackNavigationProp} from '@app/navigation/navigation';
import {Routes} from '@app/constants';
import {PlantProps} from '@app/constants/data/homepage';
import {PlantDiseaseType} from '@app/redux/types';
import FastImage from 'react-native-fast-image';

export const SeparatorComponent = () => {
  return <View style={{width: screenWidth * 0.05}} />;
};

export const _renderPhotography = (
  navigation: RootStackNavigationProp,
  plantDisease: PlantDiseaseType,
  pictureIsLoading: boolean,
  pictureLoadingStarts: () => void,
  pictureLoadingEnds: () => void,
) => {
  const image = plantDisease.images;
  const nametag = plantDisease.common_name;
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(Routes.PlantDetail, {
          image: image,
        })
      }>
      <FastImage
        source={{
          uri: plantDisease.images[0].original_url,
        }}
        resizeMode={Platform.OS === 'android' ? 'cover' : 'contain'}
        onLoad={pictureLoadingEnds}
        onLoadStart={pictureLoadingStarts}
        style={{
          width: screenWidth * 0.4,
          height: screenHeight * 0.25,
          borderRadius: 10,
        }}
      />
      {(pictureIsLoading || !plantDisease) && (
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
          bottom: 20,
          opacity: 0.8,
          padding: 5,
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
        }}>
        <Text
          style={{
            color: Colors.primaryTextColor,
          }}>
          # {nametag}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
