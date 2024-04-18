import {MD3Theme, TextInput, useTheme} from 'react-native-paper';
import {useState} from 'react';
import {Colors} from '@app/constants/colors';
import {KeyboardTypeOptions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {screenHeight} from '@app/constants/dimensions';
import {Fonts} from '@app/constants/fonts';

interface TextFieldProps {
  onFocused: () => void;
  theme: MD3Theme;
  placeHolderText: string;
  valueText: string;
  labelText: string;
  callBack: any;
  keyboardType?: KeyboardTypeOptions;
  onBlur?: (e: any) => void;
  displayRightIcon?: boolean;
  displayPassword?: boolean;
  togglePasswordDisplay?: () => void;
}

const TextFields = (props: TextFieldProps) => {
  const {
    onFocused,
    placeHolderText,
    labelText,
    callBack,
    onBlur,
    theme,
    keyboardType,
    displayRightIcon,
    displayPassword,
    togglePasswordDisplay,
  } = props;
  const [text, setText] = useState('');
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
          onSurfaceVariant: Colors.lightPrimaryTextColor,
          placeholder: Colors.inActiveUnderlineTextInputColor,
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
        backgroundColor: Colors.screenColor,
        fontFamily: Fonts.Bold,
        marginBottom: screenHeight * 0.018,
      }}
    />
  );
};

export default TextFields;
