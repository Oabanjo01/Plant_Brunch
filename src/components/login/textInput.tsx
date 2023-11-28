import {
  TextInput,
  Provider as PaperProvider,
  DefaultTheme,
} from 'react-native-paper';
import {useState} from 'react';
import {Colors} from '@app/constants/colors';

interface TextFieldProps {
  onFocused: () => void;
  placeHolderText: string;
  valueText: string;
  labelText: string;
  callBack: any;
}

const TextFields = (props: TextFieldProps) => {
  const {onFocused, placeHolderText, valueText, labelText, callBack} = props;
  const [text, setText] = useState('');
  return (
    <TextInput
      label={labelText}
      placeholder={placeHolderText}
      onFocus={onFocused}
      maxLength={30}
      underlineColor={Colors.inActiveUnderlineTextInputColor}
      activeUnderlineColor={Colors.primary}
      value={text}
      onChangeText={text => {
        setText(text);
        callBack(text);
      }}
      theme={{
        colors: {
          placeholder: Colors.inActiveUnderlineTextInputColor,
        },
      }}
      selectionColor={Colors.primary}
      underlineColorAndroid={Colors.inActiveUnderlineTextInputColor}
      activeOutlineColor={Colors.primary}
      style={{backgroundColor: Colors.screenColor, marginBottom: '5%'}}
    />
  );
};

export default TextFields;
