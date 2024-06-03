import {Colors} from '@app/constants';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {Fonts} from '@app/constants/fonts';
import WText from '@app/utilities/customText';
import React from 'react';
import {View} from 'react-native';
import WTextInput from './textInput';
import {Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {showToast} from '@app/utilities/toast';

const GroupedTextInput = ({
  error,
  headerTitle,
  handleBlur,
  handleChangeTextTitle,
  handleChangeTextDescription,
  inputListLength,
  createTextInput,
}: {
  error: any;
  headerTitle: string;
  handleBlur: any;
  handleChangeTextTitle: any;
  handleChangeTextDescription: any;
  inputListLength: number;
  createTextInput: any;
}) => {
  return (
    <>
      <View
        style={{
          borderWidth: 1,
          borderColor: Colors.addPhotoButtonColor,
          paddingVertical: screenHeight * 0.01,
          marginHorizontal: screenWidth * 0.05,
          borderRadius: 20,
          marginBottom: screenHeight * 0.015,
        }}>
        <WText
          style={{
            paddingVertical: 10,
            marginLeft: screenWidth * 0.05,
            fontFamily: Fonts.semiBold,
          }}>
          {headerTitle}
        </WText>
        <WTextInput
          placeholder="Title"
          errorMessage="Imagine what a shiny title could do to your post?"
          showError={error}
          handleBlur={handleBlur}
          handleChangeText={handleChangeTextTitle}
        />
        <WTextInput
          placeholder="Description"
          errorMessage="Take your prospective buyer through a tour"
          showError={error}
          handleBlur={handleBlur}
          handleChangeText={handleChangeTextDescription}
          numberOfLines={10}
        />
      </View>
      <Pressable
        onPress={() => {
          inputListLength < 5
            ? createTextInput()
            : showToast({
                text1: 'Limit Reached',
                text2: 'You can only add 5 details at a time',
                type: 'info',
                position: 'top',
              });
        }}>
        <Ionicons
          name="add-circle-outline"
          style={{
            marginBottom: screenHeight * 0.015,
            alignSelf: 'flex-end',
            marginRight: screenWidth * 0.05,
          }}
          color={Colors.addPhotoButtonColor}
          size={30}
        />
      </Pressable>
    </>
  );
};

export default GroupedTextInput;
