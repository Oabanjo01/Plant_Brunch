import {Colors} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import {RootStackNavigationProp} from '@app/navigation/navigation';
import {Routes} from '@app/constants';
import {PlantProps} from '@app/constants/data/homepage';

export const SeparatorComponent = () => {
  return <View style={{width: screenWidth * 0.05}} />;
};

export const _renderPhotography = (
  navigation: RootStackNavigationProp,
  plantItem: PlantProps,
) => {
  const image = plantItem.imagePath;
  const imageTag = plantItem.description1;
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(Routes.PlantDetail, {
          image: image,
        })
      }>
      {/* <View
        style={{
          backgroundColor: Colors.addPhotoButtonColor,
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}> */}
      <Image
        source={image}
        style={{
          width: screenWidth * 0.4,
          height: screenHeight * 0.25,
          borderRadius: 10,
          resizeMode: Platform.OS === 'android' ? 'contain' : 'cover',
        }}
      />
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
          # {imageTag}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
