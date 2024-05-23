import {Colors} from '@app/constants/colors';
import {PlantProps, PhotographyData} from '@app/constants/data/homepage';
import {screenHeight} from '@app/constants/dimensions';
import WText from '@app/utilities/customText';
import React from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';

export const RenderImage = ({item, index}: {item: PlantProps; index: any}) => {
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
