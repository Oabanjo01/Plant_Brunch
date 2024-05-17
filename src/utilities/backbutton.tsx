import {Colors} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {RootStackNavigationProp} from '@app/navigation/navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

const Backbutton = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  return (
    <View
      style={{
        position: 'absolute',
        top: screenHeight * 0.025,
        left: screenWidth * 0.025,
        backgroundColor: 'rgba(211, 211, 211, 0.5)',
        borderRadius: 100,
        padding: 5,
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Ionicons color={Colors.whiteColor} name={'chevron-back'} size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default Backbutton;
