import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import WText from './customText';
import {Colors} from '@app/constants';
import {Divider} from 'react-native-paper';

interface DropDownData {
  label: string;
  value: string;
}

const DropDown = () => {
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
            <TouchableOpacity
              onPress={() => handleOptionSelect(selectedItem.value)}>
              <WText
                style={{
                  paddingVertical: 13,
                  paddingLeft: 5,
                  fontSize: 18,
                  // flex: 1,
                }}>
                {selectedItem.label}
              </WText>
            </TouchableOpacity>

            {index <= 1 && <Divider bold />}
          </View>
        );
      }}
      renderButton={() => {
        return (
          <View
            style={{
              position: 'absolute',
              top: screenHeight * 0.025,
              right: screenWidth * 0.05,
            }}>
            <Ionicons
              name="ellipsis-vertical-outline"
              color={Colors.addPhotoButtonColor}
              size={24}
            />
          </View>
        );
      }}
      onSelect={handleOptionSelect}
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
