import {Colors as StaticColors} from '@app/constants';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {FontSize, Fonts} from '@app/constants/fonts';
import {RootStackParamList} from '@app/navigation/navigation';
import {PlantDiseaseImageType, PlantDiseaseType} from '@app/redux/types';
import WText from '@app/utilities/customText';

import Backbutton from '@app/components/backbutton';
import DropDown from '@app/components/dropDown';
import {getThemeColor} from '@app/constants/colors';
import {RootState} from '@app/redux/store';
import useArticles from '@app/utilities/hooks/articles/useArticles';
import useCart from '@app/utilities/hooks/cart/useCart';
import {useLikes} from '@app/utilities/hooks/likes/useLikes';
import {capitalize} from '@app/utilities/sentenceHelpers';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Divider} from 'react-native-paper';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {styles} from './plantListDetail';
import {useVisibility} from '@app/themeProvider';
import {BottomSheetRefProps} from '@app/components/modals/bottomSheetModal';

type Props = NativeStackScreenProps<RootStackParamList, 'PlantDiseaseDetail'>;

const PlantDiseaseDetail = ({route, navigation}: Props) => {
  const [showDescription, setShowDescription] = useState<boolean>(true);
  const [showSolutions, setShowSolutions] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const item = route.params?.item;

  const {forceCloseModal} = useVisibility();

  const ref = useRef<BottomSheetRefProps>(null);

  const closeModal = useCallback(() => {
    if (forceCloseModal) {
      ref?.current?.scrollTo(screenHeight, 50);
      return;
    }
  }, [forceCloseModal]);

  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);

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
    setDetectError,
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
    fetchLikeStatus(common_name, 'PlantDisease');
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
      <View style={{backgroundColor: Colors.screenColor, height: '100%'}}>
        <View
          style={{
            marginBottom: (screenHeight * 0.1) / 2,
            height: screenHeight * 0.4,
            width: screenWidth,
            backgroundColor: Colors.screenColor,
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
              paginationDefaultColor={Colors.lighterBlack}
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
                      resizeMode={'cover'}
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
              onPress={async () => {
                await addorRemoveLikes(
                  common_name,
                  !isFavourited,
                  'PlantDisease',
                  images[0]?.original_url || '',
                );
              }}
            />
          </View>
        </View>
        <ScrollView
          style={{
            backgroundColor: Colors.screenColor,
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
            }}>
            {family && (
              <WText
                style={{
                  ...styles.tagTextStyle,
                }}>
                {family}
              </WText>
            )}
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
            onPress={() => {
              addOrRemoveArticle(
                common_name,
                !isBookmarked,
                images[0]?.original_url || '',
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
            onPress={() => {
              navigation.navigate('TransactionSummary', {
                itemNo: 1,
              });
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
                color: Colors.whiteColor,
                fontFamily: Fonts.semiBold,
                fontSize: 16,
                textAlign: 'center',
                textAlignVertical: 'center',
              }}>
              Buy This Picture
            </WText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              addOrRemoveCartItem(
                common_name,
                !isCarted,
                images[0]?.original_url || '',
                'Plant Disease',
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
              name={isCarted ? 'cart' : 'cart-outline'}
              size={20}
              color={Colors.whiteColor}
            />
          </TouchableOpacity>
        </View>
        {forceCloseModal && (
          <Pressable style={styles.overlay} onPress={closeModal} />
        )}
        <View style={{top: screenHeight * 0.07, position: 'absolute'}}>
          <DropDown ref={ref} />
        </View>
        <Backbutton />
      </View>
    );
  }
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
        color={StaticColors.whiteColor}
        size={18}
        onPress={() => {
          toggleShowNote(!showNote);
        }}
      />
    </View>
  );
};

export default PlantDiseaseDetail;
