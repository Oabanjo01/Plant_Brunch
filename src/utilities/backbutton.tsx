import {Colors} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {RootStackNavigationProp} from '@app/navigation/navigation';
import BackButton from '@assets/images/BackButton.svg';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

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
