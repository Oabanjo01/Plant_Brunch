import {getThemeColor} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {RootState} from '@app/redux/store';
import WText from '@app/utilities/customText';
import {truncateText} from '@app/utilities/sentenceHelpers';
import React from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

export const RenderArticlesOrLikes = ({
  item,
  index,
  addOrRemoveLikesorArticles,
  isArticlesTab,
}: {
  item: any;
  index: number;
  addOrRemoveLikesorArticles: (
    itemName: string,
    liked: boolean,
    category: string,
    image: string,
  ) => void;
  isArticlesTab?: boolean;
}) => {
  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);
  return (
    <View
      style={{
        borderRadius: 10,
        backgroundColor: Colors.lighterBlack,
        height: screenHeight * 0.08,
        paddingVertical: screenHeight * 0.02,
        marginHorizontal: screenWidth * 0.05,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <FastImage
          source={{uri: item.image}}
          resizeMode={'cover'}
          style={{
            borderRadius: (screenWidth * 0.08) / 2,
            borderWidth: 1,
            borderColor: Colors.primary,
            height: screenWidth * 0.08,
            width: screenWidth * 0.08,
            marginLeft: screenWidth * 0.06,
            marginRight: screenWidth * 0.04,
          }}
        />
        <View>
          <WText
            style={{
              fontSize: 16,
            }}>
            {truncateText(item.itemName || item.title, 24)}
          </WText>
          <WText
            style={{
              fontSize: 10,
              color: Colors.addPhotoButtonColor,
            }}>
            {item.type || item.timeCreated}
          </WText>
        </View>
      </View>
      <Ionicons
        name={isArticlesTab ? 'bookmark' : 'heart'}
        onPress={() => {
          addOrRemoveLikesorArticles(
            item.itemName || item.title,
            item.liked || item.bookmarked,
            item.category || item.timeCreated,
            item.image,
          );
        }}
        size={24}
        style={{
          marginRight: screenWidth * 0.06,
          color: Colors.favouriteButtonColor,
        }}
      />
    </View>
  );
};
