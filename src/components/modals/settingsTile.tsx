import {ColorValue, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {Colors, getThemeColor} from '@app/constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import WText from '@app/utilities/customText';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@app/redux/store';
import {toggleTheme} from '@app/redux/actions/actions';

interface SettingsTileProps {
  tileTitle?: boolean;
  onPressed: () => void;
  value: number;
  clicked?: number;
  optionalBackgroundColor?: ColorValue;
  topSpacing?: number;
}

const SettingsTile = (props: SettingsTileProps) => {
  const dispatch = useDispatch();
  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);
  const {
    optionalBackgroundColor = Colors.screenColor,
    tileTitle,
    onPressed,
    clicked,
    value,
    topSpacing,
  } = props;

  const handle = [
    {
      1: 'System Default',
      2: theme === 'dark' ? 'Light' : 'Dark',
      3: 'Delete Account',
    },
    {
      1: 'phone-portrait-outline',
      2: theme === 'dark' ? 'sunny-outline' : 'moon-outline',
      3: 'trash-outline',
    },
  ];

  const handleTitle = (value: number, handleNo: number) => {
    switch (value) {
      case 1:
        return String(handle[handleNo][1]);
      case 2:
        if (theme === 'light' || theme === 'dark') {
          return String(handle[handleNo][2]);
        } else {
          if (handleNo === 0) {
            return 'Light/Dark Mode';
          }
          if (handleNo === 1) {
            return 'contrast-outline';
          }
        }
      case 3:
        return String(handle[handleNo][3]);

      default:
        break;
    }
  };
  const handlePress = (value: number) => {
    switch (value) {
      case 1:
        return dispatch(toggleTheme('system'));
      case 2:
        return dispatch(toggleTheme(theme === 'light' ? 'dark' : 'light'));
      case 3:
        return console.log('Press');

      default:
        break;
    }
  };
  return (
    <Pressable
      style={{
        ...styles.tileStyle,
        backgroundColor: optionalBackgroundColor,
        marginTop: topSpacing,
      }}
      onPress={() => {
        onPressed();
        handlePress(value);
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Ionicons
          color={Colors.primary}
          name={handleTitle(value, 1) || 'contrast-outline'}
          size={25}
          style={{marginRight: screenWidth * 0.05}}
        />
        <WText style={{fontSize: 16}}>{handleTitle(value, 0)}</WText>
      </View>
      {clicked === value && <View style={styles.checkBox} />}
    </Pressable>
  );
};

export default SettingsTile;

const styles = StyleSheet.create({
  tileStyle: {
    textAlignVertical: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: screenWidth * 0.075,
    paddingRight: screenWidth * 0.1,
    width: screenWidth * 0.9,
    height: screenHeight * 0.075,
    marginBottom: 10,
    borderRadius: 20,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.lightPrimaryColor,
  },
});
