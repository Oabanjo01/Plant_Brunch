import {Colors} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import {Plant} from '@app/redux/types';
import {ActivityIndicator} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp, ScreenProps} from '@app/navigation/navigation';
import {Routes} from '@app/constants';
import {Fonts} from '@app/constants/fonts';

export const SeparatorComponent = () => {
  return <View style={{width: screenWidth * 0.05}} />;
};

const RenderPlantPictures = (
  item: Plant,
  pictureIsLoading: boolean,
  pictureLoadingStarts: () => void,
  pictureLoadingEnds: () => void,
  navigation: RootStackNavigationProp,
) => {
  console.log(item);
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
        onLoad={pictureLoadingEnds}
        onLoadStart={pictureLoadingStarts}
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
        <Text
          style={{
            fontFamily: Fonts.Regular,
            color: Colors.primaryTextColor,
          }}>
          # {item.common_name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RenderPlantPictures;
