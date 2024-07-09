import React, {useState} from 'react';
import {
  Platform,
  TouchableOpacity,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Colors, getThemeColor} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {RootStackNavigationProp} from '@app/navigation/navigation';
import {Plant} from '@app/redux/types';
import WText from '@app/utilities/customText';
import {useSelector} from 'react-redux';
import {RootState} from '@app/redux/store';

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

  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);

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
      <>
        <FastImage
          onLoadStart={loadingPicture}
          onLoadEnd={loadedPicture}
          source={{
            uri: item.default_image[0].original_url,
            priority: FastImage.priority.normal,
          }}
          resizeMode={'cover'}
          style={styles.imageStyle}
        />
        <View style={styles.itemName}>
          <WText style={styles.itemTextStyle}># {item.common_name}</WText>
        </View>
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            marginTop: 5,
            marginRight: 5,
            backgroundColor: Colors.screenColor,
            borderRadius: 10,
          }}>
          <WText
            style={{
              fontSize: 20,
              padding: 5,
            }}>
            ₦ {item.price ? item.price : 0.0}
          </WText>
        </View>
      </>

      {loading && (
        <ActivityIndicator
          color={Colors.primary}
          style={styles.indicatorStyle}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  indicatorStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    width: screenWidth * 0.73,
    height: screenHeight * 0.22,
  },
  itemName: {
    backgroundColor: Colors.whiteColor,
    position: 'absolute',
    left: 0,
    bottom: 20,
    opacity: 0.8,
    padding: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  imageStyle: {
    borderRadius: 10,
    width: screenWidth * 0.73,
    height: screenHeight * 0.22,
  },
  itemTextStyle: {
    color: Colors.primaryTextColor,
  },
});

export default RenderPlantPictures;
