import {ItemProps} from '@app/constants/homepagedata/homepage';
import {Colors} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Svg, {ClipPath, Defs, Path, Rect} from 'react-native-svg';

export const SeparatorComponent = () => {
  return <View style={{width: screenWidth * 0.05}} />;
};

export const _renderPhotography = () => {
  return (
    <View
      style={{
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}>
      <Image
        source={require('@assets/images/sampleplant2.jpg')}
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
        <Text>#Mine</Text>
      </View>
    </View>
  );
};
