import {Colors, Routes} from '@app/constants';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {FontSize, Fonts} from '@app/constants/fonts';
import {RootStackParamList} from '@app/navigation/navigation';
import {PlantDiseaseImageType, PlantDiseaseType} from '@app/redux/types';
import Backbutton from '@app/utilities/backbutton';
import WText from '@app/utilities/customText';
import DropDown from '@app/utilities/dropDown';
import {capitalize} from '@app/utilities/sentenceHelpers';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Platform, ScrollView, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ActivityIndicator, Divider} from 'react-native-paper';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './plantListDetail';

type Props = NativeStackScreenProps<RootStackParamList, 'PlantDiseaseDetail'>;

const PlantDiseaseDetail = ({route, navigation}: Props) => {
  const [showDescription, setShowDescription] = useState<boolean>(true);
  const [showSolutions, setShowSolutions] = useState<boolean>(true);
  const [isFavourited, setIsFavourited] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const item = route.params?.item;

  const {
    description,
    family,
    host,
    images,
    solution,
    common_name,
    other_name,
    scientific_name,
  } = item as PlantDiseaseType;

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

  const combinedDescription = description
    .map(item => `${item.subtitle}\n\n${item.description}`)
    .join('\n\n');

  const combinedSolution = solution.map(item => {
    const joinedDescription = item.description.replace(/\n/g, '');
    return (
      <>
        <WText style={{fontFamily: Fonts.italic, fontSize: 15}}>
          {item.subtitle.trimStart()}
        </WText>
        {`\n`}
        <WText>{joinedDescription.trim()}</WText>
        {`\n\n`}
      </>
    );
  });

  const combineHostPlant = host
    .map(item => {
      return `${capitalize(item)}`;
    })
    .join(', ');

  const otherName = other_name?.map(item => {
    return (
      <WText style={{...styles.tagTextStyle, marginRight: 10}}>{item}</WText>
    );
  });

  console.log(isLoading);

  // useEffect(() => {
  //   setIsFavourited(false)
  // }, []);
  return (
    <View style={{flex: 1, backgroundColor: Colors.screenColor}}>
      <View
        style={{
          marginBottom: (screenHeight * 0.1) / 2,
          height: screenHeight * 0.4,
          width: screenWidth,
        }}>
        {item?.images?.length === 0 || !item?.images ? (
          <WText
            style={{
              textAlign: 'center',
              textAlignVertical: 'center',
              height: screenHeight * 0.4,
              width: screenWidth,
              borderBottomColor: Colors.disabledButtonColor,
              borderBottomWidth: 1,
            }}>
            No Image Uploaded
          </WText>
        ) : (
          <SwiperFlatList
            index={0}
            showPagination
            paginationDefaultColor={Colors.screenColor}
            paginationActiveColor={Colors.primary}
            keyExtractor={item => item?.id?.toString()}
            data={item?.images.slice(0, 5)}
            renderItem={({item}: {item: PlantDiseaseImageType}) => {
              return (
                <>
                  <FastImage
                    onLoadEnd={() => setIsLoading(false)}
                    onLoadStart={() => setIsLoading(true)}
                    source={{
                      uri: item.original_url,
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={Platform.OS === 'android' ? 'cover' : 'contain'}
                    style={{height: screenHeight * 0.4, width: screenWidth}}
                  />
                  {isLoading && (
                    <View
                      style={{
                        alignSelf: 'center',
                        alignItems: 'center',
                        width: screenWidth,
                        position: 'absolute',
                      }}>
                      <ActivityIndicator color={Colors.primary} />
                    </View>
                  )}
                </>
              );
            }}
          />
        )}
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
        <DropDown />
      </View>
      <ScrollView
        style={{
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
          }}>
          {family && <WText style={styles.tagTextStyle}>{family}</WText>}
          <WText
            style={{
              ...styles.tagTextStyle,
              backgroundColor: Colors.favouriteButtonColor,
              color: Colors.whiteColor,
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
          <WText
            style={{
              fontSize: FontSize.normalText,
              paddingLeft: 4,
              fontFamily: Fonts.semiBold,
            }}>
            4.1
          </WText>
        </View>
        {host.length > 0 && (
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <WText
              style={{
                color: Colors.addPhotoButtonColor,
                fontFamily: Fonts.semiBold,
              }}>
              Host Plants{''}
            </WText>
            <WText> - {combineHostPlant}.</WText>
          </View>
        )}
        {description.length > 0 && (
          <>
            <SubTopics
              topic="DESCRIPTION"
              showNote={showDescription}
              toggleShowNote={() => {
                setShowDescription(!showDescription);
              }}
            />
            <Divider horizontalInset style={{marginBottom: 10}} bold />
            {showDescription && <WText>{combinedDescription}</WText>}
          </>
        )}
        {solution.length > 0 && (
          <>
            <SubTopics
              topic="SOLUTIONS"
              showNote={showSolutions}
              toggleShowNote={() => {
                setShowSolutions(!showSolutions);
              }}
            />
            <Divider horizontalInset style={{marginBottom: 10}} bold />
            {showSolutions && (
              <WText
                style={{
                  textAlign: 'center',
                  marginBottom: screenHeight * 0.03,
                }}>
                {combinedSolution}
              </WText>
            )}
          </>
        )}
      </ScrollView>
      <View
        style={{
          bottom: 0,
          paddingVertical: screenHeight * 0.02,
          position: 'absolute',
          backgroundColor: Colors.screenColor,
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
          onPress={() => {
            navigation.navigate(Routes.TransactionSummary);
          }}
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
      <Backbutton />
    </View>
  );
};

export const SubTopics = ({
  showNote,
  toggleShowNote,
  topic,
}: {
  topic: string;
  showNote: boolean;
  toggleShowNote: (showNote: boolean) => void;
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
        marginHorizontal: screenWidth * 0.015,
        alignItems: 'center',
      }}>
      <WText
        style={{
          marginTop: 10,
          marginBottom: 5,
          fontFamily: Fonts.semiBold,
        }}>
        {topic}
      </WText>
      <Ionicons
        name={showNote ? 'chevron-down-outline' : 'chevron-forward-outline'}
        size={18}
        onPress={() => {
          toggleShowNote(!showNote);
        }}
      />
    </View>
  );
};

export default PlantDiseaseDetail;
