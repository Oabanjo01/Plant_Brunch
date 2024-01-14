import {Colors} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {Image, Text, TouchableOpacity, View} from 'react-native';
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
      <View
        style={{
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}>
        <Image
          source={image}
          style={{
            borderRadius: 10,
            width: screenWidth * 0.45,
            height: screenHeight * 0.3,
            resizeMode: 'cover',
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
          <Text>{imageTag}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
