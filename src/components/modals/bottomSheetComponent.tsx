import {getThemeColor} from '@app/constants/colors';
import {screenHeight} from '@app/constants/dimensions';
import {RootState} from '@app/redux/store';
import React, {useState} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import SettingsTile from './settingsTile';

const BottomSheetComponent = () => {
  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);

  const [clicked, setClicked] = useState<number>(theme === 'system' ? 1 : 2);

  return (
    <View
      style={{
        alignSelf: 'center',
        marginTop: screenHeight * 0.05,
      }}>
      <SettingsTile
        clicked={clicked}
        tileTitle={true}
        onPressed={() => {
          setClicked(1);
        }}
        value={1}
      />
      <SettingsTile
        clicked={clicked}
        value={2}
        onPressed={() => {
          setClicked(2);
        }}
      />
      <SettingsTile
        onPressed={() => {}}
        value={3}
        optionalBackgroundColor={Colors.favouriteButtonColor}
        topSpacing={screenHeight * 0.025}
      />
    </View>
  );
};

export default BottomSheetComponent;
