import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import BackButton from '@assets/images/BackButton.svg';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {Colors} from '@app/constants/colors';
import navigation, {
  RootStackNavigationProp,
  ScreenProps,
} from '@app/navigation/navigation';
import {useNavigation} from '@react-navigation/native';

const Backbutton = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View
      style={{
        position: 'absolute',
        top: screenHeight * 0.025,
        left: screenWidth * 0.05,
      }}>
      <TouchableOpacity onPress={() => goBack()}>
        <BackButton color={Colors.primaryTextColor} />
      </TouchableOpacity>
    </View>
  );
};

export default Backbutton;
