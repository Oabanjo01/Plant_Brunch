import {Colors as StaticColors, Routes} from '@app/constants';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {RootStackNavigationProp} from '@app/navigation/navigation';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, View, useColorScheme} from 'react-native';
import {Divider} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import WText from './customText';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@app/redux/store';
import {toggleTheme} from '@app/redux/actions/actions';
import {getThemeColor} from '@app/constants/colors';

interface DropDownData {
  label: string;
  value: string;
}
interface DropDownProps {
  color?: string;
}
const DropDown = (props?: DropDownProps) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [selectedOption, setSelectedOption] = useState<string>('');

  const data: DropDownData[] = [
    {label: 'Theme Mode', value: 'theme'},
    {label: 'Cart', value: 'cart'},
    {label: 'Delete Account', value: 'delete'},
    {label: 'Use System Theme', value: 'system'},
  ];

  const dispatch = useDispatch();
  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);

  const systemTheme = useColorScheme();

  const styles = StyleSheet.create({
    dropDownItem: {
      paddingHorizontal: screenWidth * 0.04,
    },
    dropdown: {
      backgroundColor: Colors.screenColor,
      position: 'absolute',
      left: screenWidth * 0.55,
      marginTop: screenHeight * 0.02,
      borderRadius: 8,
      paddingVertical: 8,
      width: screenWidth * 0.4,
    },
  });

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);

    if (value === 'theme') {
      dispatch(toggleTheme(theme === 'light' ? 'dark' : 'light'));
    } else if (value === 'cart') {
      console.log(value);
      navigation.navigate(Routes.CartScreen);
    } else if (value === 'delete') {
      console.log(value);
    } else if (value === 'system') {
      console.log(value, systemTheme);
      dispatch(toggleTheme(systemTheme === 'light' ? 'light' : 'dark'));
    }
  };

  return (
    <SelectDropdown
      data={data}
      renderItem={(
        selectedItem: DropDownData,
        index: number,
        isSelected: boolean,
      ) => {
        return (
          <View style={styles.dropDownItem}>
            <WText
              style={{
                paddingVertical: 13,
                paddingLeft: 5,
                fontSize: 18,
              }}>
              {selectedItem.label}
            </WText>

            {index <= 1 && <Divider bold />}
          </View>
        );
      }}
      renderButton={() => {
        return (
          <View
            style={{
              position: 'absolute',
              top: screenHeight * 0.05,
              backgroundColor: Colors.lighterBlack,
              borderRadius: 100,
              padding: 5,
              right: screenWidth * 0.025,
            }}>
            <Ionicons
              name="ellipsis-vertical"
              color={Colors.primary}
              size={30}
            />
          </View>
        );
      }}
      onSelect={(selectedItem: DropDownData, index: number) => {
        console.log(selectedItem);
        handleOptionSelect(selectedItem.value);
      }}
      dropdownStyle={styles.dropdown}
    />
  );
};

export default DropDown;
