import {Colors} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {Fonts} from '@app/constants/fonts';
import WText from '@app/utilities/customText';
import React from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';

export const TabBodyDisplay = ({
  renderItem,
  subTopic,
  data,
  isLoading,
  addOrRemoveLikes,
  // : (
  //   itemName: string,
  //   liked: boolean,
  //   category: string,
  //   image: string,
  // ) => {},
  isArticlesTab,
}: {
  renderItem?: any;
  subTopic?: any;
  data?: any;
  isLoading?: boolean;
  addOrRemoveLikes?: (
    itemName: string,
    liked: boolean,
    category: string,
    image: string,
  ) => {};
  isArticlesTab?: boolean;
}) => {
  if (isLoading) {
    return (
      <View
        style={{
          height: screenHeight * 0.5,
          width: screenWidth,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator color={Colors.primary} />
      </View>
    );
  } else {
    return (
      <View
        style={{
          width: screenWidth,
          height: screenHeight * 0.9,
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

          {data?.length === 0 || !data ? (
            <View
              style={{
                height: screenHeight * 0.5,
                width: screenWidth,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <WText>Currently no data</WText>
            </View>
          ) : (
            <FlatList
              data={data}
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{height: 10}} />}
              scrollEnabled
              renderItem={({item, index}) =>
                renderItem({item, index, addOrRemoveLikes, isArticlesTab})
              }
              keyExtractor={item => item.itemName}
            />
          )}
        </View>
      </View>
    );
  }
};
