import {
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import BackButton from '@assets/images/BackButton.svg';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {
  RootStackNavigationProp,
  RootStackParamList,
} from '@app/navigation/navigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {toggleName} from '@app/redux/actions/actions';
import {Colors, Routes} from '@app/constants';
import {RootState} from '@app/redux/store';
import {Plant} from '@app/redux/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import  from ;

// type PlantDetailsRouteProps = ;

// type PlantDetailsProps = {
//   route: PlantDetailsRouteProps;
// };

type Props = NativeStackScreenProps<RootStackParamList, 'PlantDetail'>;

const PlantDetail = ({route, navigation}: Props) => {
  const item = route.params?.item;
  const {default_image, common_name, scientific_name} = item as Plant;
  const {original_url, regular_url} = default_image;
  console.log(default_image.original_url, 'default image');
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{flex: 1}}>
      <View style={{marginBottom: (screenWidth * 0.15) / 2}}>
        <View>
          <FastImage
            source={{
              uri: regular_url,
              priority: FastImage.priority.normal,
            }}
            resizeMode={Platform.OS === 'android' ? 'cover' : 'contain'}
            style={{
              height: screenHeight * 0.4,
            }}
          />
          <View
            style={{
              position: 'absolute',
              backgroundColor: Colors.favouriteButtonColor,
              width: screenWidth * 0.15,
              height: screenWidth * 0.15,
              borderRadius: (screenWidth * 0.15) / 2,
              bottom: -((screenWidth * 0.15) / 2),
              right: screenWidth * 0.05,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ionicons
              name={'heart-outline'}
              size={28}
              color={Colors.whiteColor}
              onPress={() => {}}
            />
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            top: screenHeight * 0.025,
            left: screenWidth * 0.05,
          }}>
          <TouchableOpacity onPress={() => goBack()}>
            <BackButton />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          opacity: 0.5,
          flexDirection: 'row',
          paddingLeft: 20,
        }}>
        <Text style={styles.tagTextStyle}>Danger</Text>
        <Text style={styles.tagTextStyle}>Danger</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tagTextStyle: {
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 4,
    opacity: 0.5,
    borderRadius: 5,
    backgroundColor: Colors.addPhotoButtonColor,
    color: Colors.addPhotoButtonColor,
    fontFamily: 'OpenSans-SemiBold',
  },
});

export default PlantDetail;
