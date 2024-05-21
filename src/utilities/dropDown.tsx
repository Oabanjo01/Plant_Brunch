import {Colors, Routes} from '@app/constants';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {RootStackNavigationProp} from '@app/navigation/navigation';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import WText from './customText';

interface DropDownData {
  label: string;
  value: string;
}
interface DropDownProps {
  color?: string;
}
const DropDown = (props?: DropDownProps) => {
  //   const {navigation} = useNavigation<any>();
  const navigation = useNavigation<RootStackNavigationProp>();
  const [selectedOption, setSelectedOption] = useState<string>('');

  const data: DropDownData[] = [
    {label: 'Theme Mode', value: 'theme'},
    {label: 'Cart', value: 'cart'},
    {label: 'Delete Account', value: 'delete'},
  ];

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);

    if (value === 'theme') {
      console.log(value);
    } else if (value === 'cart') {
      console.log(value);
      navigation.navigate(Routes.CartScreen);
    } else if (value === 'delete') {
      console.log(value);
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

            {index <= 2 && <Divider bold />}
          </View>
        );
      }}
      renderButton={() => {
        return (
          <View
            style={{
              position: 'absolute',
              top: screenHeight * 0.025,
              backgroundColor: 'rgba(211, 211, 211, 0.5)',
              borderRadius: 100,
              padding: 5,
              right: screenWidth * 0.025,
            }}>
            <Ionicons
              name="ellipsis-vertical"
              color={props?.color ?? Colors.whiteColor}
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

const styles = StyleSheet.create({
  dropDownItem: {
    paddingHorizontal: screenWidth * 0.04,
  },
  dropdown: {
    backgroundColor: Colors.whiteColor,
    position: 'absolute',
    left: screenWidth * 0.55,
    marginTop: screenHeight * 0.02,
    borderRadius: 8,
    paddingVertical: 8,
    width: screenWidth * 0.4,
  },
});

export default DropDown;
