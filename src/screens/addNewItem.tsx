import {Colors, getThemeColor} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {RootState} from '@app/redux/store';
import ConfirmButton from '@app/utilities/ConfirmButton';
import Backbutton from '@app/utilities/backbutton';
import WText from '@app/utilities/customText';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';

const AddNewItem = () => {
  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);
  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: Colors.screenColor}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
      <View
        style={{
          backgroundColor: Colors.screenColor,
          height: '100%',
        }}>
        <ScrollView
          keyboardShouldPersistTaps="never"
          style={{
            paddingTop: screenHeight * 0.2,
          }}>
          <TextInput
            cursorColor={Colors.primaryTextColor}
            selectionColor={Colors.primary}
            style={{
              ...styles.textInput,
              borderColor: Colors.lighterBlack,
              color: Colors.primaryTextColor,
              marginBottom: screenHeight * 0.02,
            }}
            placeholder="Default Image"
            placeholderTextColor={Colors.lightPrimaryColor}
          />
          <TextInput
            cursorColor={Colors.primaryTextColor}
            selectionColor={Colors.primary}
            style={{
              ...styles.textInput,
              borderColor: Colors.lighterBlack,
              color: Colors.primaryTextColor,
              marginBottom: screenHeight * 0.02,
            }}
            placeholder="Scientific Name"
            placeholderTextColor={Colors.lightPrimaryColor}
          />
          <TextInput
            cursorColor={Colors.primaryTextColor}
            selectionColor={Colors.primary}
            style={{
              ...styles.textInput,
              borderColor: Colors.lighterBlack,
              color: Colors.primaryTextColor,
              marginBottom: screenHeight * 0.02,
            }}
            placeholder="Other Name"
            placeholderTextColor={Colors.lightPrimaryColor}
          />
          <TextInput
            cursorColor={Colors.primaryTextColor}
            selectionColor={Colors.primary}
            style={{
              ...styles.textInput,
              borderColor: Colors.lighterBlack,
              color: Colors.primaryTextColor,
              marginBottom: screenHeight * 0.02,
            }}
            placeholder="Cycle"
            placeholderTextColor={Colors.lightPrimaryColor}
          />
          <TextInput
            cursorColor={Colors.primaryTextColor}
            selectionColor={Colors.primary}
            style={{
              ...styles.textInput,
              borderColor: Colors.lighterBlack,
              color: Colors.primaryTextColor,
              marginBottom: screenHeight * 0.02,
            }}
            placeholder="Watering"
            placeholderTextColor={Colors.lightPrimaryColor}
          />
          <TextInput
            cursorColor={Colors.primaryTextColor}
            selectionColor={Colors.primary}
            style={{
              ...styles.textInput,
              borderColor: Colors.lighterBlack,
              color: Colors.primaryTextColor,
              marginBottom: screenHeight * 0.02,
            }}
            placeholder="Sunlight"
            placeholderTextColor={Colors.lightPrimaryColor}
          />
        </ScrollView>
        <ConfirmButton
          newStyle={{
            position: 'absolute',
            bottom: 0,
          }}
          buttonText="Add a new Item"
          onPress={() => console.log('Pressed')}
        />
        <Backbutton containsTitle title="Add a New Plant" />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    paddingVertical: screenHeight * 0.025,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: screenWidth * 0.05,
  },
});

export default AddNewItem;
