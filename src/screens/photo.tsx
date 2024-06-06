import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {RootStackParamList, ScreenProps} from '@app/navigation/navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Backbutton from '@app/utilities/backbutton';
import {Colors, getThemeColor} from '@app/constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Routes} from '@app/constants';
import {useSelector} from 'react-redux';
import {RootState} from '@app/redux/store';

type Props = NativeStackScreenProps<RootStackParamList, 'PhotoView'>;

const PhotoView = ({navigation, route}: Props) => {
  const params = route.params?.photo;
  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);
  console.log(params);

  const imageUriList = params?.map(item => {
    return item.uri;
  });

  console.log(imageUriList);

  return (
    <View
      style={{
        backgroundColor: Colors.screenColor,
        height: '100%',
        paddingTop: screenHeight * 0.15,
      }}>
      <FlatList
        data={params}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        pagingEnabled
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          console.log(item, 'bla bl');
          return (
            <FastImage
              source={{uri: `file://${item.uri}`}}
              style={{
                width: screenWidth,
                height: screenHeight * 0.7,
              }}
            />
          );
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,

          height: screenHeight * 0.2,
          width: screenWidth,
          alignSelf: 'center',
        }}>
        <TouchableOpacity
          style={{
            width: 55,
            height: 55,
            borderRadius: 55 / 2,
            borderColor:
              theme === 'light' ? Colors.primaryTextColor : Colors.whiteColor,
            borderWidth: 1,
            marginLeft: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons
            name={'close-outline'}
            size={30}
            color={Colors.favouriteButtonColor}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: 55,
            height: 55,
            borderRadius: 55 / 2,
            borderColor:
              theme === 'light' ? Colors.primaryTextColor : Colors.whiteColor,
            borderWidth: 1,
            marginRight: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            navigation.push('PlantPhotoType', {
              uri: imageUriList,
            });
          }}>
          <Ionicons
            name={'checkmark-outline'}
            style={{alignSelf: 'center'}}
            size={30}
            color={Colors.primary}
          />
        </TouchableOpacity>
      </View>
      <Backbutton />
    </View>
  );
};

export default PhotoView;
