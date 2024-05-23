import {PlantData, PhotographyData} from '@app/constants/data/homepage';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import WText from '@app/utilities/customText';
import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {RenderImage} from './myItemImage';
import {Colors, getThemeColor} from '@app/constants/colors';
import {useSelector} from 'react-redux';
import {RootState} from '@app/redux/store';

export const RenderCollectedPlantBox = ({
  item,
  index,
}: {
  item: any;
  index: number;
}) => {
  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);
  const isLastPlantBox = PlantData.length - index === 1;
  return (
    <View
      style={{
        ...styles.collectedPlantBoxStyle,
        backgroundColor: Colors.lighterBlack,
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
          renderItem={RenderImage}
          ItemSeparatorComponent={() => <View style={{height: 3}} />}
          keyExtractor={item => item.id}
        />
      </View>
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
