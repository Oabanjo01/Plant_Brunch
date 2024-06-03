import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import WTextInput from './textInput';
import {Colors} from '@app/constants';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import WText from '@app/utilities/customText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Fonts} from '@app/constants/fonts';

const InputList = ({handleChangeText}: {handleChangeText: any}) => {
  const [inputs, setInputs] = useState([
    {id: 1, error: '', handleBlur: () => {}, handleChangeText: () => {}},
  ]);
  const addInput = () => {
    const newInput = {
      id: inputs.length + 1,
      error: '',
      handleBlur: () => {},
      handleChangeText: () => {},
    };
    setInputs(prevState => [...prevState, newInput]);
  };
  //   const handleBlur = (id: number) => {};
  //   const handleChangeText = (id, text) => {
  //     // Custom change text handling logic
  //   };
  console.log(inputs.length);
  return (
    <>
      <View
        style={{
          borderWidth: 1,
          borderColor: Colors.addPhotoButtonColor,
          paddingVertical: screenHeight * 0.01,
          marginHorizontal: screenWidth * 0.05,
          borderRadius: 20,
        }}>
        <WText
          style={{
            paddingVertical: 10,
            marginLeft: screenWidth * 0.05,
            fontFamily: Fonts.semiBold,
          }}>
          Need to add a catchy detail?
        </WText>
        {inputs.map((input, index) => (
          <View
            style={{
              marginBottom: inputs.length > 1 ? screenHeight * 0.015 : 0,
            }}>
            <GroupedTextInput
              key={input.id}
              error={input.error}
              //   handleBlur={() => handleBlur(input.id)}
              //   handleChangeText={(text: string) =>
              //     handleChangeText(input.id, text)
              //   }
              index={index}
              handleBlurTitle={`title-${index}`}
              handleBlurDescription={`description-${index}`}
              handleChangeTextTitle={handleChangeText}
              handleChangeTextDescription={undefined}
            />
          </View>
        ))}
      </View>
      <Pressable onPress={() => addInput()}>
        <Ionicons
          name="add-circle-outline"
          style={{
            marginTop: 10,
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

const GroupedTextInput = ({
  error,
  handleBlurTitle,
  handleBlurDescription,
  handleChangeTextTitle,
  handleChangeTextDescription,
  index,
}: {
  error: string;
  handleBlurTitle: any;
  handleBlurDescription: any;
  handleChangeTextTitle: any;
  handleChangeTextDescription: any;
  index: number;
}) => {
  console.log(index, 'index');
  return (
    <>
      <WTextInput
        placeholder="Title"
        errorMessage="Imagine what a shiny title could do to your post?"
        showError={error}
        handleBlur={handleBlurTitle}
        handleChangeText={handleChangeTextTitle}
      />
      <WTextInput
        placeholder="Description"
        errorMessage="Take your prospective buyer through a tour"
        showError={error}
        handleBlur={handleBlurDescription}
        handleChangeText={handleChangeTextDescription}
        numberOfLines={10}
      />
    </>
  );
};

export default InputList;
