import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import BackButton from '@assets/images/BackButton.svg';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {RootStackParamList} from '@app/navigation/navigation';
import {Colors} from '@app/constants';
import {Plant, PlantDiseaseType} from '@app/redux/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FontSize, Fonts} from '@app/constants/fonts';
import {
  capitalize,
  createSentenceFromArray,
} from '@app/utilities/sentenceHelpers';

type Props = NativeStackScreenProps<RootStackParamList, 'PlantListDetail'>;

const PlantListDetail = ({route, navigation}: Props) => {
  const item = route.params?.item;
  const {
    default_image,
    common_name,
    scientific_name,
    other_name,
    cycle,
    watering,
    sunlight,
  } = item as Plant;

  const {regular_url} = default_image;

  console.log(default_image.original_url, 'default image');
  const goBack = () => {
    navigation.goBack();
  };

  console.log(item);

  const renderStarIcons = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <Ionicons
            key={i}
            name={'star'}
            size={16}
            color={Colors.ratingIconColor}
            onPress={() => {}}
          />,
        );
      } else {
        stars.push(
          <Ionicons
            key={i}
            name={'star-outline'}
            size={16}
            color={Colors.ratingIconColor}
            onPress={() => {}}
          />,
        );
      }
    }
    return stars;
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
          <View style={styles.favouriteButton}>
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
          paddingLeft: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text style={styles.tagTextStyle}>Danger</Text>
          <Text style={styles.tagTextStyle}>Danger</Text>
        </View>
        <Text style={{fontSize: 25, fontFamily: Fonts.semiBold}}>
          {common_name}
        </Text>
        <View style={{flexDirection: 'row'}}>
          {renderStarIcons(4)}
          <Text style={{fontSize: FontSize.normalText, paddingLeft: 4}}>
            4.1
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View style={{marginRight: 20}}>
            <Text style={{marginBottom: 10}}>KINGDOM</Text>
            <Text>Plantae</Text>
          </View>
          <View>
            <Text style={{marginBottom: 10}}>FAMILY</Text>
            <Text>Cactacae</Text>
          </View>
        </View>
        <Text style={{marginTop: 10, marginBottom: 5}}>DESCRIPTION</Text>
        <Text>
          Common name: {capitalize(common_name)}
          {`\n`}
          Scientific name: {createSentenceFromArray(scientific_name)}
          {`\n`}
          Other name: {createSentenceFromArray(other_name)}
          {`\n`}
          Cycle: {capitalize(cycle)} {`\n`}
          Watering: {capitalize(watering)}
          {`\n`}
          Sunlight: {`${createSentenceFromArray(sunlight, false)}`}
          {`\n`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tagTextStyle: {
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 4,
    marginRight: 5,
    opacity: 0.5,
    borderRadius: 5,
    backgroundColor: Colors.addPhotoButtonColor,
    color: Colors.addPhotoButtonColor,
    fontFamily: 'OpenSans-SemiBold',
  },
  favouriteButton: {
    position: 'absolute',
    backgroundColor: Colors.favouriteButtonColor,
    width: screenWidth * 0.15,
    height: screenWidth * 0.15,
    borderRadius: (screenWidth * 0.15) / 2,
    bottom: -((screenWidth * 0.15) / 2),
    right: screenWidth * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PlantListDetail;
