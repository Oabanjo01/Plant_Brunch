import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, getThemeColor} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {useSelector} from 'react-redux';
import {RootState} from '@app/redux/store';
import WText from '@app/utilities/customText';
import {Fonts} from '@app/constants/fonts';

const WTextInput = ({
  handleChangeText,
  placeholder,
  showError,
  errorMessage,
  handleBlur,
  keyboardType,
}: {
  handleChangeText: any;
  placeholder: string;
  showError: any | boolean;
  errorMessage?: string;
  handleBlur: any;
  keyboardType?: KeyboardTypeOptions;
}) => {
  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);

  const [inputValue, setInputValue] = useState('');
  return (
    <>
      <TextInput
        cursorColor={Colors.primaryTextColor}
        selectionColor={Colors.primary}
        style={{
          ...styles.textInput,
          borderColor:
            theme === 'dark'
              ? Colors.lighterBlack
              : Colors.inActiveUnderlineTextInputColor,
          color: Colors.primaryTextColor,
          marginBottom: screenHeight * 0.01,
        }}
        onBlur={handleBlur}
        onChangeText={(text: string) => {
          handleChangeText(text);
          setInputValue(text);
        }}
        keyboardAppearance={theme === 'dark' ? 'dark' : 'light'}
        keyboardType={keyboardType}
        value={inputValue}
        placeholder={placeholder}
        placeholderTextColor={Colors.lightPrimaryColor}
      />
      {showError && (
        <WText
          style={{
            color: Colors.favouriteButtonColor,
            marginBottom: screenHeight * 0.015,
            marginLeft: screenWidth * 0.1,
            fontFamily: Fonts.italic,
          }}>
          {errorMessage}
        </WText>
      )}
    </>
  );
};

export default WTextInput;

const styles = StyleSheet.create({
  textInput: {
    paddingVertical: screenHeight * 0.025,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: screenWidth * 0.05,
    marginHorizontal: screenWidth * 0.05,
  },
});
