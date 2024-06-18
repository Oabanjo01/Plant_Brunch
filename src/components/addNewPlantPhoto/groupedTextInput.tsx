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
  index,
  headerTitle,
  handleBlur,
  handleChangeTextTitle,
  handleChangeTextDescription,
  inputListLength,
  createTextInput,
  deleteItem,
}: {
  error: any;
  deleteItem?: () => void;
  index?: number;
  headerTitle: string;
  handleBlur: any;
  handleChangeTextTitle: any;
  handleChangeTextDescription: any;
  inputListLength: number;
  createTextInput: any;
}) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: Colors.addPhotoButtonColor,
        paddingVertical: screenHeight * 0.01,
        marginHorizontal: screenWidth * 0.05,
        borderRadius: 20,
        marginBottom: screenHeight * 0.015,
      }}>
      <View
        style={{
          flexDirection: 'row-reverse',
          paddingHorizontal: screenWidth * 0.05,
          paddingVertical: screenHeight * 0.01,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row-reverse'}}>
          <Ionicons
            name={inputListLength - 1 === index && 'add-circle-outline'}
            color={Colors.primary}
            size={30}
            onPress={() => {
              inputListLength < 5
                ? createTextInput()
                : showToast({
                    text1: 'Limit Reached',
                    text2: 'You can only add 5 details at a time',
                    type: 'info',
                    position: 'top',
                  });
            }}
          />

          <Ionicons
            name={'trash-outline'}
            style={{marginRight: 10}}
            color={Colors.favouriteButtonColor}
            size={28}
            onPress={deleteItem}
          />
        </View>
        <WText
          style={{
            paddingVertical: 10,
            fontFamily: Fonts.semiBold,
          }}>
          {headerTitle}
        </WText>
      </View>
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
  );
};

export default GroupedTextInput;
