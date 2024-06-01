import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WText from '@app/utilities/customText';
import {useSelector} from 'react-redux';
import {RootState} from '@app/redux/store';
import {getThemeColor} from '@app/constants/colors';
import {Fonts} from '@app/constants/fonts';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {RootStackParamList} from '@app/navigation/navigation';
import {Routes} from '@app/constants';
import Backbutton from '@app/utilities/backbutton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'PlantPhotoType'>;

const PlantPhotoType = ({navigation, route}: Props) => {
  const params = route?.params?.uri;
  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);

  const plantTypeButtons = (text: string, phototype: string) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('AddNewItem', {
            uri: params || [],
            photoType: phototype,
          })
        }
        style={{
          marginTop: screenHeight * 0.04,
          borderWidth: 1,
          borderRadius: 20,
          borderColor: Colors.primary,
          paddingVertical: screenHeight * 0.02,
          paddingHorizontal: screenWidth * 0.04,
        }}>
        <WText>{text}</WText>
      </Pressable>
    );
  };
  return (
    <View
      style={{
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.screenColor,
      }}>
      <WText
        style={{
          fontFamily: Fonts.italic,
          fontSize: 18,
          marginHorizontal: screenWidth * 0.04,
          marginBottom: screenHeight * 0.025,
          textAlign: 'center',
        }}>
        What would you identify this new post the most with?
      </WText>
      {plantTypeButtons('Regular Photograph', 'plantPhotograph')}
      {plantTypeButtons('Plant Disease', 'plantDisease')}
      <Backbutton />
    </View>
  );
};

export default PlantPhotoType;

const styles = StyleSheet.create({});
