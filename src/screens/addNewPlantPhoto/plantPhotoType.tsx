import {
  Animated,
  Button,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import WText from '@app/utilities/customText';
import {useSelector} from 'react-redux';
import {RootState} from '@app/redux/store';
import {Colors, getThemeColor} from '@app/constants/colors';
import {Fonts} from '@app/constants/fonts';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {RootStackParamList} from '@app/navigation/navigation';
import {Routes} from '@app/constants';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import PlantTypeButtons from '@app/components/addNewPlantPhoto/photoTypeButton';
import Backbutton from '@app/components/backbutton';

type Props = NativeStackScreenProps<RootStackParamList, 'PlantPhotoType'>;

const PlantPhotoType = ({navigation, route}: Props) => {
  const params = route?.params?.uri;
  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeAnim2, {
      toValue: 1,
      duration: 2000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, fadeAnim2]);

  return (
    <View
      style={{
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.screenColor,
      }}>
      <WText
        style={{
          fontFamily: Fonts.italic,
          fontSize: 18,
          marginHorizontal: screenWidth * 0.04,
          marginBottom: screenHeight * 0.025,
          textAlign: 'center',
        }}>
        What would you identify this new post the most with?
      </WText>
      <PlantTypeButtons
        text={'Regular Photograph'}
        photoType={'plantPhotograph'}
        navigation={navigation}
        animationValue={fadeAnim}
        param={params}
      />
      <PlantTypeButtons
        text={'Plant Disease'}
        photoType={'plantDisease'}
        navigation={navigation}
        animationValue={fadeAnim2}
        param={params}
      />
      <Backbutton />
    </View>
  );
};

export default PlantPhotoType;

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
  buttonRow: {
    flexBasis: 100,
    justifyContent: 'space-evenly',
    marginVertical: 16,
  },
});
