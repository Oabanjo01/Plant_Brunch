import {
  KeyboardTypeOptions,
  Platform,
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {formatAmount} from '@app/utilities/formatAmount';

const WTextInput = ({
  handleChangeText,
  placeholder,
  showError,
  errorMessage,
  handleBlur,
  keyboardType,
  numberOfLines = 1,
  isAmount,
}: {
  handleChangeText: any;
  placeholder: string;
  showError: any | boolean;
  errorMessage?: string;
  handleBlur: any;
  keyboardType?: KeyboardTypeOptions;
  numberOfLines?: number;
  isAmount?: boolean;
}) => {
  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);

  const [inputValue, setInputValue] = useState('');
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: screenWidth * 0.025,
          paddingVertical: screenHeight * 0.01,
          marginHorizontal: screenWidth * 0.05,
          borderWidth: 1,
          borderColor: Colors.lighterBlack,
          marginVertical: screenHeight * 0.01,
          borderRadius: 20,
          alignItems: 'center',
        }}>
        {isAmount && (
          <View style={{width: screenWidth * 0.05, marginLeft: 10}}>
            <WText style={{fontSize: 20}}>₦</WText>
          </View>
        )}
        <TextInput
          cursorColor={Colors.lightPrimaryColor}
          selectionColor={Colors.primary}
          numberOfLines={numberOfLines}
          style={{
            ...styles.textInput,
            borderColor:
              theme === 'dark'
                ? Colors.lighterBlack
                : Colors.inActiveUnderlineTextInputColor,
            color: Colors.primaryTextColor,
            textAlignVertical: numberOfLines > 1 ? 'top' : 'center',
          }}
          onBlur={handleBlur}
          onChangeText={(text: string) => {
            // Allow only one decimal point
            const validText = text.replace(/[^0-9.]/g, '');
            const dotCount = (validText.match(/\./g) || []).length;

            if (dotCount < 2 && isAmount) {
              const {formattedValue} = formatAmount(text);
              handleChangeText(formattedValue);
              setInputValue(formattedValue);
            } else if (dotCount === 2) {
              return text;
            } else {
              handleChangeText(text);
              setInputValue(text);
            }
          }}
          keyboardAppearance={theme === 'dark' ? 'dark' : 'light'}
          keyboardType={keyboardType}
          value={inputValue}
          placeholder={placeholder}
          placeholderTextColor={Colors.lightPrimaryColor}
        />
      </View>
      {showError && (
        <WText
          style={{
            color: Colors.favouriteButtonColor,
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
    marginRight: screenWidth * 0.025,
    flex: 1,
    ...Platform.select({
      ios: {
        paddingVertical: 10,
        paddingLeft: 10,
      },
    }),
  },
});
