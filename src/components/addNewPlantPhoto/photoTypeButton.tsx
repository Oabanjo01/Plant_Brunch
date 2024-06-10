import {Colors} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {RootStackNavigationProp} from '@app/navigation/navigation';
import WText from '@app/utilities/customText';
import React from 'react';
import {Animated, Pressable, StyleSheet} from 'react-native';

type plantTypeButtonsProps = {
  text: string;
  photoType: 'plantPhotograph' | 'plantDisease';
  navigation: RootStackNavigationProp;
  param: (string | undefined)[] | undefined;
  animationValue: Animated.Value;
};

const PlantTypeButtons: React.FC<plantTypeButtonsProps> = props => {
  const {text, photoType, navigation, param, animationValue} = props;
  return (
    <Pressable
      onPress={() =>
        navigation.navigate('AddNewItem', {
          uri: param || [],
          photoType: photoType,
        })
      }>
      <Animated.View
        style={{...styles.buttonContainer, opacity: animationValue}}>
        <WText>{text}</WText>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  fadingContainer: {
    padding: 20,
    backgroundColor: 'powderblue',
  },
  fadingText: {
    fontSize: 28,
  },
  buttonContainer: {
    marginTop: screenHeight * 0.04,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Colors.primary,
    paddingVertical: screenHeight * 0.02,
    paddingHorizontal: screenWidth * 0.04,
  },
});

export default PlantTypeButtons;
