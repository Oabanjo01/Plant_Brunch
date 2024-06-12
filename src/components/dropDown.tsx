import {Colors as StaticColors, Routes} from '@app/constants';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {RootStackNavigationProp} from '@app/navigation/navigation';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, View, useColorScheme} from 'react-native';
import {Divider} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import WText from '../utilities/customText';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@app/redux/store';
import {toggleTheme} from '@app/redux/actions/actions';
import {getThemeColor} from '@app/constants/colors';
import BottomSheetModal, {
  BottomSheetRefProps,
} from '@app/components/modals/bottomSheetModal';
import {useVisibility} from '@app/themeProvider';
import BottomSheetComponent from './modals/bottomSheetComponent';

interface DropDownData {
  label: string;
  value: string;
  icon: string;
}
interface DropDownProps {
  color?: string;
}
const DropDown = ({
  affectBottomTab,
  props,
}: {
  affectBottomTab?: boolean;
  props?: DropDownProps;
}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [selectedOption, setSelectedOption] = useState<string>('');

  const {setBottomSheetVisible, isBottomSheetVisible} = useVisibility();

  const dispatch = useDispatch();
  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);

  console.log(isBottomSheetVisible, 'isBottomSheetVisible');

  const ref = useRef<BottomSheetRefProps>(null);
  const showModal = useCallback(() => {
    if (isBottomSheetVisible === false) {
      affectBottomTab ? setBottomSheetVisible(true) : null;
      ref?.current?.scrollTo(-screenHeight / 1.5, 50);
    } else if (isBottomSheetVisible === true) {
      affectBottomTab ? setBottomSheetVisible(false) : null;
      ref?.current?.scrollTo(2000, 50);
    }
  }, [isBottomSheetVisible]);

  const styles = StyleSheet.create({
    dropDownItem: {
      paddingHorizontal: screenWidth * 0.04,
    },
    dropdown: {
      backgroundColor: Colors.screenColor,
      position: 'absolute',
      left: screenWidth * 0.55,
      borderRadius: 20,
      paddingVertical: 8,
      width: screenWidth * 0.4,
    },
  });

  const data: DropDownData[] = [
    {label: 'Cart', value: 'cart', icon: 'cart-outline'},
    {label: 'Settings', value: 'settings', icon: 'settings-outline'},
  ];

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
    if (value === 'cart') {
      ref?.current?.scrollTo(2000, 50);
      navigation.navigate(Routes.CartScreen);
    } else if (value === 'settings') {
      showModal();
    }
  };

  // TODO: Alert modal to confirm deletion of account, then dispatch log out

  // TODO: Edit modal to change username, email and password
  return (
    <View
      style={{
        width: screenWidth,
      }}>
      <BottomSheetModal ref={ref}>
        <BottomSheetComponent />
      </BottomSheetModal>
      <SelectDropdown
        data={data}
        statusBarTranslucent
        renderItem={(selectedItem: DropDownData) => {
          return (
            <View
              style={{
                ...styles.dropDownItem,
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: Colors.primary,
              }}>
              <Ionicons
                name={selectedItem.icon}
                size={22}
                color={Colors.primary}
                style={{paddingRight: screenWidth * 0.025}}
              />
              <WText
                style={{
                  paddingVertical: 13,
                  paddingLeft: 5,
                  fontSize: 18,
                }}>
                {selectedItem.label}
              </WText>
            </View>
          );
        }}
        dropdownOverlayColor="transparent"
        renderButton={() => {
          return (
            <View
              style={{
                alignItems: 'flex-end',
                backgroundColor: Colors.lighterBlack,
                borderRadius: 100,
                width: screenWidth * 0.1,
                alignSelf: 'flex-end',
                marginRight: screenWidth * 0.03,
                padding: 5,
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
          handleOptionSelect(selectedItem.value);
        }}
        dropdownStyle={styles.dropdown}
      />
    </View>
  );
};

export default DropDown;
