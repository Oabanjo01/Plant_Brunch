import {Colors} from '@app/constants';
import {
  PhotographyData,
  PlantData,
  PlantProps,
} from '@app/constants/data/homepage';
import {
  dashboardHeight,
  screenHeight,
  screenWidth,
} from '@app/constants/dimensions';
import {Fonts} from '@app/constants/fonts';
import {RootState} from '@app/redux/store';
import WText from '@app/utilities/customText';
import ProfileDashboard from '@assets/images/ProfileDashboard.svg';
import React, {useRef, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

const imageWidth = screenWidth / 3;
const ProfilePage = () => {
  const [activeButton, setActiveButton] = useState<number>(1);
  const userData = useSelector((state: RootState) => state.auth.user);
  const {displayName} = userData;

  const swiperFlatListRef = useRef<SwiperFlatList | null>(null);

  const scrollToIndex = (index: number) => {
    swiperFlatListRef.current?.scrollToIndex({animated: true, index});
  };

  const currentIndex = swiperFlatListRef.current?.getCurrentIndex();
  console.log(currentIndex, 'currentIndex');

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
        colors={['#61D2C4', '#29D890']}
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
            borderColor: Colors.whiteColor,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ionicons
            name={'person-outline'}
            size={35}
            color={Colors.whiteColor}
          />
        </View>
        <WText
          style={{
            marginTop: 20,
            marginBottom: 10,
            color: Colors.whiteColor,
            fontFamily: Fonts.semiBold,
            fontSize: 18,
          }}>
          {displayName}
        </WText>
        <View style={{flexDirection: 'row'}}>
          <Ionicons name={'location'} size={30} color={Colors.whiteColor} />
          <WText
            style={{
              color: Colors.whiteColor,
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
        {tabBodyDisplay(renderArticlesOrLikes, 'YOUR SAVED ARTICLES')}

        {tabBodyDisplay(renderCollectedPlantBox, 'YOUR COLLECTED PLANTS')}
        {tabBodyDisplay(renderArticlesOrLikes, 'YOUR LIKES')}
      </SwiperFlatList>
    </ScrollView>
  );
};

// render the article and the likes
const renderArticlesOrLikes = ({item, index}: {item: any; index: number}) => {
  return (
    <View
      style={{
        borderRadius: 10,
        backgroundColor: Colors.whiteColor,
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
          source={item.imagePath}
          resizeMode={'cover'}
          style={{
            borderRadius: (screenWidth * 0.08) / 2,
            height: screenWidth * 0.08,
            width: screenWidth * 0.08,
            marginLeft: screenWidth * 0.06,
            marginRight: screenWidth * 0.04,
          }}
        />
        <WText
          style={{
            fontSize: 16,
          }}>
          {item.description1}
        </WText>
      </View>
      <Ionicons
        name={'heart'}
        size={24}
        style={{
          marginRight: screenWidth * 0.06,
          color: Colors.favouriteButtonColor,
        }}
      />
    </View>
  );
};

// render the outer flatlist on My items
const renderCollectedPlantBox = ({item, index}: {item: any; index: number}) => {
  const isLastPlantBox = PlantData.length - index === 1;
  return (
    <View
      style={{
        ...styles.collectedPlantBoxStyle,
        marginBottom: isLastPlantBox ? screenHeight * 0.6 : 0,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={styles.radioButtonStyle} />
        <View style={{marginBottom: screenHeight * 0.01}}>
          <WText>{item.description1}</WText>
          <WText style={{color: Colors.addPhotoButtonColor}}>02.01.2019</WText>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          height: 100,
        }}>
        <FlatList
          data={PhotographyData.slice(0, 4)}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={renderImage}
          ItemSeparatorComponent={() => <View style={{height: 3}} />}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

// Render image in outer flatlist in my saved items
const renderImage = ({item, index}: {item: PlantProps; index: any}) => {
  const isLastImage = index === 3;
  const remainingCount = isLastImage ? PhotographyData.length - 4 : 0;
  return (
    <View
      style={{
        height:
          PhotographyData.length < 3
            ? screenHeight * 0.4
            : (screenHeight * 0.4) / 2,
        width:
          PhotographyData.length === 1 ||
          (index === 2 && PhotographyData.length === 3)
            ? '100%'
            : '50%',
      }}>
      {PhotographyData.length > 4 && index === 3 && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: (screenHeight * 0.4) / 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <WText
            style={{
              fontSize: 35,
              color: Colors.primaryTextColor,
            }}>
            +{remainingCount}
          </WText>
        </View>
      )}
      <FastImage
        source={item.imagePath}
        resizeMode={
          PhotographyData.length === 2 ||
          (index === 2 && PhotographyData.length === 3)
            ? 'cover'
            : 'stretch'
        }
        style={{
          flex: PhotographyData.length === 1 ? 1 : undefined,
          height: '100%',
          marginRight:
            (index === 0 || index === 2) &&
            PhotographyData.length !== 1 &&
            !(index === 2 && PhotographyData.length === 3)
              ? 3
              : 0,
          borderTopLeftRadius:
            index === 0 || PhotographyData.length === 1 ? 10 : 0,
          borderTopRightRadius:
            index === 1 || PhotographyData.length === 1 ? 10 : 0,
          borderBottomLeftRadius:
            index === 2 ||
            ((PhotographyData.length === 1 || PhotographyData.length === 2) &&
              index === 0)
              ? 10
              : 0,
          borderBottomRightRadius:
            index === 3 ||
            ((PhotographyData.length === 1 || PhotographyData.length === 2) &&
              (PhotographyData.length === 1 || index === 1))
              ? 10
              : 0,
          opacity: index === 3 && PhotographyData.length > 4 ? 0.4 : 1,
          backgroundColor: index === 3 ? Colors.primary : 'transparent',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  collectedPlantBoxStyle: {
    alignSelf: 'center',
    height: screenHeight * 0.5,
    marginTop: 10,
    borderRadius: 10,
    width: screenWidth * 0.9,
    backgroundColor: Colors.whiteColor,
    flex: 1,
    padding: screenWidth * 0.03,
  },
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

const tabBodyDisplay = (renderItem?: any, subTopic?: any) => {
  return (
    <View
      style={{
        width: screenWidth,
        height: screenHeight,
      }}>
      <View
        style={{
          height: screenHeight,
        }}>
        <WText
          style={{
            fontFamily: Fonts.semiBold,
            marginVertical: screenHeight * 0.01,
            marginLeft: screenWidth * 0.04,
          }}>
          {subTopic}
        </WText>
        <FlatList
          data={PlantData}
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
          scrollEnabled
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};
