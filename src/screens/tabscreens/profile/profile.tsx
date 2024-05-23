import {RenderArticlesOrLikes} from '@app/components/profile/myArticlesandLikes';
import {RenderCollectedPlantBox} from '@app/components/profile/myItemBox';
import {TabBodyDisplay} from '@app/components/profile/tabBody';
import {Colors} from '@app/constants';
import {getThemeColor} from '@app/constants/colors';
import {PlantData} from '@app/constants/data/homepage';
import {
  dashboardHeight,
  screenHeight,
  screenWidth,
} from '@app/constants/dimensions';
import {Fonts} from '@app/constants/fonts';
import {RootState} from '@app/redux/store';
import WText from '@app/utilities/customText';
import DropDown from '@app/utilities/dropDown';
import useArticles from '@app/utilities/hooks/articles/useArticles';
import {useLikes} from '@app/utilities/hooks/likes/useLikes';
import ProfileDashboard from '@assets/images/ProfileDashboard.svg';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
const ProfilePage = () => {
  const [activeButton, setActiveButton] = useState<number>(1);

  const userData = useSelector((state: RootState) => state.auth.user);
  const {displayName} = userData;
  const isFocused = useIsFocused();

  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);

  const swiperFlatListRef = useRef<SwiperFlatList | null>(null);
  const scrollToIndex = (index: number) => {
    swiperFlatListRef.current?.scrollToIndex({animated: true, index});
  };
  const currentIndex = swiperFlatListRef.current?.getCurrentIndex();

  const {fetchAllLikes, isLoading, likesList, addorRemoveLikes} = useLikes();
  const {
    fetchAllUserArticles,
    isLoading: loadingArticles,
    articleList,
    addOrRemoveArticle,
  } = useArticles();

  useEffect(() => {
    console.log('got here', isFocused);
    if (isFocused && activeButton === 2) {
      fetchAllLikes();
      return;
    }
    if (isFocused && activeButton === 0) {
      fetchAllUserArticles();
      return;
    }
  }, [isFocused, activeButton]);
  const buildTabHeader = (index: number, title: string) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setActiveButton(index);
          scrollToIndex(index);
        }}
        style={{
          height: screenHeight * 0.05,
          padding: 10,
          marginHorizontal: index == 1 ? screenWidth * 0.04 : 0,
          backgroundColor:
            activeButton === index ? Colors.addPhotoButtonColor : 'transparent',
          borderRadius: 20,
        }}>
        <WText
          style={{
            textAlign: 'center',
            paddingHorizontal: 10,
            color:
              activeButton === index
                ? Colors.whiteColor
                : Colors.primaryTextColor,
          }}>
          {title}
        </WText>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView
      scrollEnabled
      nestedScrollEnabled
      stickyHeaderIndices={[1]}
      style={{
        backgroundColor: Colors.screenColor,
      }}
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="never">
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        locations={[0.1, 1]}
        colors={[Colors.gradientColor, '#29D890']}
        style={{
          opacity: 1,
          height: dashboardHeight,
          width: screenWidth,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: dashboardHeight * 0.4,
            width: dashboardHeight * 0.4,
            borderRadius: (dashboardHeight * 0.4) / 2,
            borderWidth: 2,
            borderColor: Colors.secondaryTextColor,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ionicons
            name={'person-outline'}
            size={35}
            color={Colors.secondaryTextColor}
          />
        </View>
        <WText
          style={{
            marginTop: 20,
            marginBottom: 10,
            color: Colors.secondaryTextColor,
            fontFamily: Fonts.semiBold,
            fontSize: 18,
          }}>
          {displayName}
        </WText>
        <View style={{flexDirection: 'row'}}>
          <Ionicons name={'location'} size={30} color={Colors.whiteColor} />
          <WText
            style={{
              color: Colors.secondaryTextColor,
              fontFamily: Fonts.semiBold,
              fontSize: 15,
              marginLeft: 10,
              alignSelf: 'center',
            }}>
            Okunade street
          </WText>
        </View>
        <View style={{position: 'absolute', right: 0}}>
          <ProfileDashboard />
        </View>
        <DropDown color={Colors.whiteColor} />
      </LinearGradient>

      <ScrollView
        horizontal
        scrollEnabled={false}
        style={{
          width: screenWidth - 10,
          alignSelf: 'center',
          alignItems: 'center',
          height: screenHeight * 0.07,
          backgroundColor: Colors.screenColor,
          paddingVertical: screenHeight * 0.01,
        }}>
        {buildTabHeader(0, 'MY ARTICLES')}
        {buildTabHeader(1, 'MY ITEMS')}
        {buildTabHeader(2, 'MY LIKES')}
      </ScrollView>

      <SwiperFlatList
        ref={swiperFlatListRef}
        index={1}
        scrollEnabled
        pagingEnabled
        onChangeIndex={(item: {index: number; prevIndex: number}) => {
          setActiveButton(item.index);
        }}
        horizontal
        contentContainerStyle={{
          justifyContent: 'center',
        }}>
        <TabBodyDisplay
          renderItem={({item, index}: {item: string; index: number}) => (
            <RenderArticlesOrLikes
              addOrRemoveLikesorArticles={addOrRemoveArticle}
              index={index}
              item={item}
              isArticlesTab
            />
          )}
          subTopic="YOUR SAVED ARTICLES"
          data={articleList}
          isLoading={loadingArticles}
          addOrRemoveLikes={addOrRemoveArticle}
          isArticlesTab={true}
        />

        <TabBodyDisplay
          renderItem={({item, index}: {item: string; index: number}) => (
            <RenderCollectedPlantBox index={index} item={item} />
          )}
          subTopic={'YOUR COLLECTED PLANTS'}
          data={PlantData}
        />
        <TabBodyDisplay
          renderItem={({item, index}: {item: string; index: number}) => (
            <RenderArticlesOrLikes
              addOrRemoveLikesorArticles={addorRemoveLikes}
              index={index}
              item={item}
            />
          )}
          subTopic={'YOUR LIKES'}
          data={likesList}
          isLoading={isLoading}
          addOrRemoveLikes={addorRemoveLikes}
        />
      </SwiperFlatList>
    </ScrollView>
  );
};

// Tab body

// render the article and the likes

// render the outer flatlist on My items

// Render image in outer flatlist in my saved items

const styles = StyleSheet.create({
  radioButtonStyle: {
    borderWidth: 3,
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    marginRight: screenWidth * 0.02,
    borderColor: Colors.addPhotoButtonColor,
  },
});

export default ProfilePage;
