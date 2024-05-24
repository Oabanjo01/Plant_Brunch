import {ColorProps, getThemeColor} from '@app/constants/colors';
import {
  dashboardHeight,
  screenHeight,
  screenWidth,
} from '@app/constants/dimensions';
import {RootState} from '@app/redux/store';
import Backbutton from '@app/utilities/backbutton';
import WText from '@app/utilities/customText';
import ArticlesPage from '@assets/images/ArticlesPage.svg';
import React from 'react';
import {Platform, ScrollView, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {TextInput} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';

const Articles = () => {
  const dispatch = useDispatch();
  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.screenColor,
      }}>
      <ScrollView
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
          }}>
          <View style={{position: 'absolute', right: 0}}>
            <ArticlesPage />
          </View>

          <View
            style={{
              position: 'absolute',
              left: screenWidth * 0.05,
              right: screenWidth * 0.05,
              bottom: -dashboardHeight * 0.1,
              flexDirection: 'row',
              backgroundColor: Colors.whiteColor,
              alignItems: 'center',
              borderRadius: 40,
              paddingHorizontal: screenWidth * 0.03,
              ...Platform.select({
                ios: {
                  shadowColor: 'rgba(0, 0, 0, 0.1)',
                  shadowOffset: {width: 1, height: 2},
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                },
                android: {
                  elevation: 7,
                },
              }),
            }}>
            <Ionicons
              size={26}
              style={{marginLeft: 10}}
              color={Colors.primary}
              name={'search-outline'}
            />
            <TextInput
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              selectionColor={Colors.primary}
              cursorColor={Colors.primary}
              maxLength={24}
              style={{
                backgroundColor: 'transparent',
                flex: 1,
                borderColor: 'transparent',
              }}
            />
          </View>
        </LinearGradient>
        <Backbutton />
        {renderArticlesList(Colors)}
      </ScrollView>
    </View>
  );
};

export default Articles;
function renderArticlesList(color: ColorProps) {
  return (
    <View
      style={{
        marginTop: screenHeight * 0.09,
        height: screenHeight * 0.36,
        marginHorizontal: screenWidth * 0.05,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: color.screenColor,
        flexDirection: 'column-reverse',
        ...Platform.select({
          ios: {
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 4},
            shadowOpacity: 0.5,
            shadowRadius: 5,
          },
          android: {
            elevation: 5,
            shadowColor: color.primary,
            shadowOffset: {width: 0, height: 4},
            shadowOpacity: 0.2,
            shadowRadius: 20,
          },
        }),
      }}>
      <View
        style={{
          backgroundColor: color.lighterBlack,
          height: screenHeight * 0.15,
          borderBottomEndRadius: 20,
          borderBottomStartRadius: 20,
        }}>
        <WText
          style={{
            textAlign: 'center',
            fontFamily: 'OpenSans-SemiBold',
            fontSize: 15,
            marginHorizontal: 15,
            marginTop: 5,
            marginBottom: 10,
          }}>
          Plants are nature's marvels, providing oxygen and beauty to our
          surroundings.
        </WText>
        <WText
          style={{
            textAlign: 'justify',
            fontSize: 12,
            marginHorizontal: 10,
            marginTop: 5,
          }}>
          Plants are nature's marvels, providing oxygen and beauty to our
          surroundings.
        </WText>
      </View>
      <FastImage
        style={{
          flex: 1,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          width: screenWidth,
          alignSelf: 'center',
        }}
        source={require('../../../assets/images/sampleplant3.jpg')}
        resizeMode="cover"
      />
    </View>
  );
}
