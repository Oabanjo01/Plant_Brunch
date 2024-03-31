import {ItemProps, PlantProps} from '@app/constants/data/homepage';
import {Colors} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Svg, {ClipPath, Defs, Path, Rect} from 'react-native-svg';
import {Plant} from '@app/redux/types';
import {ActivityIndicator} from 'react-native-paper';

export const SeparatorComponent = () => {
  return <View style={{width: screenWidth * 0.05}} />;
};

export const _renderPlantTypes = (
  item: Plant,
  pictureIsLoading: boolean,
  pictureLoadingStarts: () => void,
  pictureLoadingEnds: () => void,
) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        onLoad={pictureLoadingEnds}
        onLoadStart={pictureLoadingStarts}
        source={{
          uri: item.default_image.regular_url,
        }}
        style={{
          borderRadius: 5,
          width: screenWidth * 0.73,
          height: screenHeight * 0.25,
          resizeMode: 'cover',
        }}
      />
      {/* {(pictureIsLoading || !item) && (
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
      )} */}

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
            color: Colors.primaryTextColor,
          }}>
          # {item.common_name}
        </Text>
      </View>
    </View>
  );
};
