import {Colors, getThemeColor} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {RootState} from '@app/redux/store';
import ConfirmButton from '@app/utilities/CofirmButton';
import Backbutton from '@app/utilities/backbutton';
import WText from '@app/utilities/customText';
import React from 'react';
import {ScrollView, StyleSheet, TextInput, View} from 'react-native';
import {useSelector} from 'react-redux';

const AddNewItem = () => {
  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);
  return (
    <ScrollView
      keyboardShouldPersistTaps="never"
      style={{
        backgroundColor: Colors.screenColor,
        height: '100%',
      }}>
      <Backbutton containsTitle title="Add a New Plant" />
      <View style={{paddingTop: screenHeight * 0.2}}>
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
      </View>

      <ConfirmButton
        buttonText="Add a new Item"
        onPress={console.log('Pressed')}
      />
    </ScrollView>
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
