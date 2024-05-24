import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {RootStackParamList, ScreenProps} from '@app/navigation/navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Backbutton from '@app/utilities/backbutton';
import {Colors} from '@app/constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'PhotoView'>;

const PhotoView = ({navigation, route}: Props) => {
  const params = route.params?.photo;
  return (
    <View
      style={{
        backgroundColor: Colors.screenColor,
        flex: 1,
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
                height: screenHeight * 0.8,
              }}
            />
          );
        }}
      />
      <Backbutton />
    </View>
  );
};

export default PhotoView;
