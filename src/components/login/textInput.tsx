import {MD3Theme, TextInput, useTheme} from 'react-native-paper';
import {useState} from 'react';
import {Colors, getThemeColor} from '@app/constants/colors';
import {KeyboardTypeOptions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {screenHeight} from '@app/constants/dimensions';
import {Fonts} from '@app/constants/fonts';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '@app/redux/store';

interface TextFieldProps {
  onFocused: () => void;
  placeHolderText: string;
  valueText: string;
  labelText: string;
  callBack: any;
  keyboardType?: KeyboardTypeOptions;
  onBlur?: (e: any) => void;
  displayRightIcon?: boolean;
  displayPassword?: boolean;
  secondaryTheme?: MD3Theme;
  togglePasswordDisplay?: () => void;
}

const TextFields = (props: TextFieldProps) => {
  const {
    onFocused,
    placeHolderText,
    labelText,
    callBack,
    onBlur,
    keyboardType,
    displayRightIcon,
    secondaryTheme,
    displayPassword,
    togglePasswordDisplay,
  } = props;
  const [text, setText] = useState('');

  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);
  return (
    <TextInput
      label={labelText}
      placeholder={placeHolderText}
      onFocus={onFocused}
      textColor={Colors.primaryTextColor}
      onBlur={onBlur}
      keyboardType={keyboardType}
      spellCheck={true}
      maxLength={30}
      secureTextEntry={displayPassword ? true : false}
      underlineColor={Colors.inActiveUnderlineTextInputColor}
      activeUnderlineColor={Colors.primary}
      value={text}
      onChangeText={text => {
        setText(text);
        callBack(text);
      }}
      right={
        displayRightIcon && (
          <TextInput.Icon
            icon={() => (
              <Ionicons
                name={displayPassword ? 'eye' : 'eye-off'}
                size={18}
                color={Colors.primary}
                onPress={togglePasswordDisplay}
              />
            )}
          />
        )
      }
      theme={{
        colors: {
          onSurfaceVariant: Colors.primaryTextColor,
          placeholder: Colors.favouriteButtonColor,
        },
        fonts: {
          regular: {
            fontStyle: 'normal',
            fontFamily: Fonts.Regular,
          },
        },
      }}
      selectionColor={Colors.primary}
      underlineColorAndroid={Colors.inActiveUnderlineTextInputColor}
      activeOutlineColor={Colors.primary}
      style={{
        backgroundColor: 'transparent',
        fontFamily: Fonts.Bold,
        marginBottom: screenHeight * 0.018,
      }}
    />
  );
};

export default TextFields;
