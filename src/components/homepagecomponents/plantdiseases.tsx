import {Colors} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {Fonts} from '@app/constants/fonts';
import {RootStackNavigationProp} from '@app/navigation/navigation';
import {PlantDiseaseType} from '@app/redux/types';
import WText from '@app/utilities/customText';
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
) => {
  const image = plantDisease.images;
  const nametag = plantDisease.common_name;
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('PlantDiseaseDetail', {
          item: plantDisease,
        })
      }>
      <FastImage
        source={{
          uri: image[0].regular_url,
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
      {(pictureIsLoading || !plantDisease) && (
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
