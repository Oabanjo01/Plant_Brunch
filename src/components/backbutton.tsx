import {Colors, getThemeColor} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {RootStackNavigationProp} from '@app/navigation/navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '@app/redux/store';
import {Fonts} from '@app/constants/fonts';
import WText from '@app/utilities/customText';

const Backbutton = ({
  title,
  containsTitle,
  closeBottomSheet,
}: {
  title?: string;
  containsTitle?: boolean;
  closeBottomSheet?: () => void;
}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);
  return (
    <View
      style={{
        position: 'absolute',
        top: screenHeight * 0.07,
        left: screenWidth * 0.03,
        backgroundColor: Colors.lighterBlack,
        borderRadius: 100,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => {
          closeBottomSheet?.(); // optional chaining. Learnt something new, lol
          navigation.goBack();
        }}>
        <Ionicons
          color={Colors.primary}
          name={'chevron-back'}
          size={30}
          style={{paddingLeft: containsTitle ? screenWidth * 0.02 : 0}}
        />
      </TouchableOpacity>
      {containsTitle && (
        <WText
          style={{
            fontSize: 16,
            paddingHorizontal: screenWidth * 0.03,
            paddingVertical: screenHeight * 0.01,
            fontFamily: Fonts.semiBold,
            color: Colors.primaryTextColor,
          }}>
          {title}
        </WText>
      )}
    </View>
  );
};

export default Backbutton;
