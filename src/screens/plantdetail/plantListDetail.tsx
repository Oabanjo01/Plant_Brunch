import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
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
import WText from '@app/utilities/customText';
import {SubTopics} from './plantDiseaseDetail';
import {Divider} from 'react-native-paper';

type Props = NativeStackScreenProps<RootStackParamList, 'PlantListDetail'>;

const PlantListDetail = ({route, navigation}: Props) => {
  const [showDescription, setShowDescription] = useState<boolean>(true);
  const [isFavourited, setIsFavourited] = useState<boolean>(true);
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

  const goBack = () => {
    navigation.goBack();
  };

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

  const otherName = other_name?.map(item => {
    return (
      <WText style={{...styles.tagTextStyle, marginRight: 10}}>{item}</WText>
    );
  });

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
              name={isFavourited ? 'heart' : 'heart-outline'}
              size={28}
              color={Colors.whiteColor}
              onPress={() => {
                setIsFavourited(!isFavourited);
              }}
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
        <View
          style={{
            position: 'absolute',
            top: screenHeight * 0.025,
            right: screenWidth * 0.04,
          }}>
          <TouchableOpacity onPress={() => goBack()}>
            <Ionicons
              name="ellipsis-vertical-outline"
              color={Colors.addPhotoButtonColor}
              size={24}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={{
          paddingHorizontal: 20,
          marginBottom: screenHeight * 0.06,
        }}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
          }}>
          <WText
            key={'scientific name'}
            style={{
              ...styles.tagTextStyle,
              backgroundColor: Colors.favouriteButtonColor,
              color: Colors.whiteColor,
              marginBottom: 4,
            }}>
            {scientific_name}
          </WText>
          {(otherName?.length > 0 || !otherName) && otherName}
        </View>
        <WText style={{fontSize: 25, fontFamily: Fonts.semiBold}}>
          {common_name}
        </WText>
        <View style={{flexDirection: 'row'}}>
          {renderStarIcons(4)}
          <WText style={{fontSize: FontSize.normalText, paddingLeft: 4}}>
            4.1
          </WText>
        </View>
        <>
          <SubTopics
            topic="DESCRIPTION"
            showNote={showDescription}
            toggleShowNote={() => {
              setShowDescription(!showDescription);
            }}
          />
          <Divider horizontalInset style={{marginBottom: 10}} bold />
        </>
        {showDescription && (
          <WText>
            Common name: {capitalize(common_name)}
            {`\n\n`}
            Scientific name: {createSentenceFromArray(scientific_name)}
            {`\n\n`}
            Other name: {createSentenceFromArray(other_name)}
            {`\n\n`}
            Cycle: {capitalize(cycle)} {`\n\n`}
            Watering: {capitalize(watering)}
            {`\n\n`}
            Sunlight: {`${createSentenceFromArray(sunlight, false)}`}
            {`\n\n`}
          </WText>
        )}
      </ScrollView>
      <View
        style={{
          bottom: 20,
          position: 'absolute',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: '100%',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            width: screenWidth * 0.12,
            height: screenWidth * 0.12,
            borderRadius: (screenWidth * 0.12) / 2,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            opacity: 0.9,
          }}>
          <Ionicons
            name="bookmark-outline"
            size={20}
            color={Colors.whiteColor}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            borderRadius: 20,
            height: screenHeight * 0.05,
            width: screenWidth * 0.5,
            alignSelf: 'center',
            justifyContent: 'center',
            opacity: 0.9,
          }}>
          <WText
            style={{
              color: Colors.lightTextColor,
              fontFamily: Fonts.semiBold,
              fontSize: 16,
              textAlign: 'center',
              textAlignVertical: 'center',
            }}>
            Buy This Picture
          </WText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            width: screenWidth * 0.12,
            height: screenWidth * 0.12,
            borderRadius: (screenWidth * 0.12) / 2,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            opacity: 0.9,
          }}>
          <Ionicons name="cart-outline" size={20} color={Colors.whiteColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  tagTextStyle: {
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 4,
    marginRight: 5,
    borderRadius: 5,
    backgroundColor: 'rgba(47, 145, 235, 0.1)',
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
