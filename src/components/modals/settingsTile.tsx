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
  tileTitle?: string;
  iconName?: string;
  onPressed: () => void;
  value?: number;
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
    iconName,
    optionalBackgroundColor = Colors.screenColor,
    tileTitle,
    onPressed,
    clicked,
    value,
    topSpacing,
  } = props;

  //   console.log(checked, clicked, value, 'checked');
  return (
    <Pressable
      style={{
        ...styles.tileStyle,
        backgroundColor: optionalBackgroundColor,
        marginTop: topSpacing,
      }}
      onPress={
        () => {
          onPressed();
          tileTitle === 'System'
            ? dispatch(toggleTheme('system'))
            : dispatch(toggleTheme(theme === 'light' ? 'dark' : 'light'));
        }
        // console.log('Check');
      }>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Ionicons
          color={Colors.primary}
          name={
            tileTitle
              ? iconName
              : theme === 'dark'
              ? 'sunny-outline'
              : 'moon-outline'
          }
          size={25}
          style={{marginRight: screenWidth * 0.05}}
        />
        <WText style={{fontSize: 16}}>
          {tileTitle ? 'System Default' : theme === 'light' ? 'Dark' : 'Light'}
        </WText>
      </View>
      {clicked === value && (
        <Pressable
          style={styles.checkBox}
          onPress={() => {
            console.log('Check');
            onPressed;
          }}
        />
      )}
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
