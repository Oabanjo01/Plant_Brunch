import {ColorValue, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import WText from '@app/utilities/customText';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {Colors} from '@app/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SettingsTile from './settingsTile';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@app/redux/store';
import {getThemeColor} from '@app/constants/colors';

const BottomSheetComponent = () => {
  const dispatch = useDispatch();
  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);

  const [checked, setChecked] = useState<boolean>(false);
  const [clicked, setClicked] = useState<number>(theme === 'system' ? 1 : 2);
  // const SettingsStyle = (
  //   tileTitle: string,
  //   iconName: string,
  //   checkBox?: boolean,
  //   optionalBackgroundColor: ColorValue = Colors.disabledButtonColor,
  //   topSpacing?: number,
  // ) => {
  //   return (

  //   );
  // };

  return (
    <View
      style={{
        alignSelf: 'center',
        marginTop: screenHeight * 0.05,
      }}>
      <SettingsTile
        clicked={clicked}
        tileTitle={'System'}
        iconName={'phone-portrait-outline'}
        onPressed={() => {
          console.log('prsses', clicked);
          setClicked(1);
        }}
        value={1}
      />
      <SettingsTile
        clicked={clicked}
        value={2}
        onPressed={() => {
          console.log(clicked, 'clicked');
          setClicked(2);
        }}
      />
      <SettingsTile
        onPressed={() => {}}
        tileTitle={'Delete Account'}
        iconName={'trash-outline'}
        optionalBackgroundColor={Colors.favouriteButtonColor}
        topSpacing={screenHeight * 0.025}
      />
    </View>
  );
};

export default BottomSheetComponent;
