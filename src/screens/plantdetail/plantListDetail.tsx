import {Colors as StaticColors, getThemeColor} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {FontSize, Fonts} from '@app/constants/fonts';
import {RootStackParamList} from '@app/navigation/navigation';
import {Plant, PlantListImageType} from '@app/redux/types';
import Backbutton from '@app/utilities/backbutton';
import WText from '@app/utilities/customText';
import DropDown from '@app/utilities/dropDown';
import useArticles from '@app/utilities/hooks/articles/useArticles';
import {useLikes} from '@app/utilities/hooks/likes/useLikes';
import useCart from '@app/utilities/hooks/cart/useCart';
import {
  capitalize,
  createSentenceFromArray,
} from '@app/utilities/sentenceHelpers';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Divider} from 'react-native-paper';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SubTopics} from './plantDiseaseDetail';
import {useSelector} from 'react-redux';
import {RootState} from '@app/redux/store';

type Props = NativeStackScreenProps<RootStackParamList, 'PlantListDetail'>;

const PlantListDetail = ({route, navigation}: Props) => {
  const [showDescription, setShowDescription] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const theme = useSelector((state: RootState) => state.onboarding);

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

  const imageToList = [default_image];

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

  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);

  const otherName = other_name?.map(item => {
    return (
      <WText
        style={{
          ...styles.tagTextStyle,
          marginRight: 10,
          backgroundColor: Colors.addPhotoButtonColor,
        }}>
        {item}
      </WText>
    );
  });

  const {
    addorRemoveLikes,
    isLoading: likeLoading,
    setIsLoading: setLikeLoading,
    detectError,
    isFavourited,
    setIsFavourited,
    fetchLikeStatus,
    isFetching,
  } = useLikes();

  const {
    addOrRemoveArticle,
    fetchArticleStatus,
    isBookmarked,
    isFetching: isFetchingArticles,
    isLoading: isLoadingArticles,
  } = useArticles();

  const {
    addOrRemoveCartItem,
    fetchCartStatus,
    isCarted,
    isFetching: isFetchingCartItems,
  } = useCart();

  useEffect(() => {
    if (detectError === 'An error occurred while adding the item') {
      setIsFavourited(false);
    }
  }, [detectError]);
  useEffect(() => {
    fetchLikeStatus(common_name, 'PlantList');
    fetchArticleStatus(common_name);
    fetchCartStatus(common_name);
  }, []);

  if (isFetchingArticles || isFetching || isFetchingCartItems) {
    return (
      <View
        style={{
          backgroundColor: Colors.screenColor,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size={25} color={Colors.primary} />
      </View>
    );
  } else {
    return (
      <View style={{flex: 1, backgroundColor: Colors.screenColor}}>
        <View
          style={{
            marginBottom: (screenHeight * 0.1) / 2,
            height: screenHeight * 0.4,
            width: screenWidth,
          }}>
          {imageToList?.length === 0 || !imageToList ? (
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
              paginationDefaultColor={Colors.lighterBlack}
              paginationActiveColor={Colors.primary}
              keyExtractor={item => item?.id?.toString()}
              data={imageToList}
              renderItem={({item}: {item: PlantListImageType}) => {
                return (
                  <>
                    <FastImage
                      onLoadEnd={() => setIsLoading(false)}
                      source={{
                        uri: item.original_url,
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={
                        Platform.OS === 'android' ? 'cover' : 'contain'
                      }
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
              name={isFavourited === true ? 'heart' : 'heart-outline'}
              size={28}
              color={Colors.whiteColor}
              onPress={async () => {
                await addorRemoveLikes(
                  common_name,
                  !isFavourited,
                  'PlantList',
                  default_image.original_url,
                );
              }}
            />
          </View>

          <DropDown />
        </View>
        <ScrollView
          style={{
            paddingHorizontal: 20,
            backgroundColor: Colors.screenColor,
            marginBottom: screenHeight * 0.06,
          }}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
            }}>
            <WText
              style={{
                ...styles.tagTextStyle,
                backgroundColor: Colors.favouriteButtonColor,
                marginBottom: 4,
              }}>
              {scientific_name}
            </WText>
            {(otherName?.length > 0 || !otherName) && otherName}
          </View>
          <WText
            style={{
              fontSize: 25,
              fontFamily: Fonts.semiBold,
            }}>
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
            onPress={() => {
              addOrRemoveArticle(
                common_name,
                !isBookmarked,
                default_image.original_url,
                'Photography',
              );
            }}
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
              name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
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
                fontFamily: Fonts.semiBold,
                fontSize: 16,
                color: Colors.whiteColor,
                textAlign: 'center',
                textAlignVertical: 'center',
              }}>
              Buy This Picture
            </WText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log('Press');
              addOrRemoveCartItem(
                common_name,
                !isCarted,
                default_image.original_url,
                'Photography',
              );
            }}
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
              size={20}
              color={Colors.whiteColor}
              name={isCarted ? 'cart' : 'cart-outline'}
            />
          </TouchableOpacity>
        </View>
        <Backbutton />
      </View>
    );
  }
};
export const styles = StyleSheet.create({
  tagTextStyle: {
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 4,
    marginVertical: 2,
    marginRight: 5,
    borderRadius: 5,
    color: StaticColors.whiteColor,
    fontFamily: 'OpenSans-SemiBold',
  },
  favouriteButton: {
    position: 'absolute',
    backgroundColor: StaticColors.favouriteButtonColor,
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
