import {Button, Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import BackButton from '@assets/images/BackButton.svg';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {
  RootStackNavigationProp,
  RootStackParamList,
} from '@app/navigation/navigation';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {toggleName} from '@app/redux/actions/actions';
import {Colors} from '@app/constants';
import {RootState} from '@app/redux/store';
// import  from ;

type PlantDetailsRouteProps = RouteProp<RootStackParamList>;

type PlantDetailsProps = {
  route: PlantDetailsRouteProps;
};

const PlantDetail: React.FC<PlantDetailsProps> = ({route}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const image = route.params?.image;
  const goBack = () => {
    navigation.goBack();
  };

  const dispatch = useDispatch();
  const {initialText, currentTheme} = useSelector(
    (state: RootState) => state.auth,
  );

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.4}}>
        <Image
          source={image}
          style={{
            flex: 1,
            borderRadius: 0.01,
            width: screenWidth,
            resizeMode: 'contain',
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: screenHeight * 0.025,
            left: screenWidth * 0.05,
          }}>
          <TouchableOpacity onPress={() => goBack()}>
            <BackButton color={Colors.primaryTextColor} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 0.6}}>
        <Text>{initialText}</Text>
        <Text>{currentTheme}</Text>
        <Button title="Press Me" onPress={() => dispatch(toggleName('Ban-'))} />
      </View>
    </View>
  );
};

export default PlantDetail;
