import {Colors, getThemeColor} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {RootStackNavigationProp} from '@app/navigation/navigation';
import {RootState} from '@app/redux/store';
import {PlantDiseaseType} from '@app/redux/types';
import WText from '@app/utilities/customText';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';

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

  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);
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
          resizeMode={'cover'}
          onLoadEnd={loadedPicture}
          onLoadStart={loadingPicture}
        />
        <View style={styles.itemStyle}>
          <WText style={styles.itemNameStyle}># {nametag}</WText>
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
            ₦ {plantDisease.price ? plantDisease.price.slice(0, 6) : 0.0}
          </WText>
        </View>
        {loading && (
          <ActivityIndicator
            color={Colors.primary}
            style={styles.indicatorStyle}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemStyle: {
    backgroundColor: Colors.whiteColor,
    position: 'absolute',
    left: 0,
    bottom: 20,
    opacity: 0.8,
    padding: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  indicatorStyle: {
    alignItems: 'center',
    height: '100%',
    alignSelf: 'center',
    position: 'absolute',
  },
  itemNameStyle: {
    color: Colors.primaryTextColor,
  },
});
