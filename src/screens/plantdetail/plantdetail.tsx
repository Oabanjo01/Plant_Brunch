import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackButton from '@assets/images/BackButton.svg';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {
  RootStackNavigationProp,
  RootStackParamList,
} from '@app/navigation/navigation';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {toggleName} from '@app/store/actions';
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

  const userImage = useSelector(state => state.userState.currentTheme);
  console.log(image);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          height: screenHeight * 0.3,
        }}>
        <View>
          <ImageBackground
            source={image}
            style={{
              height: screenHeight * 0.3,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            position: 'absolute',
            top: screenHeight * 0.025,
            left: screenWidth * 0.05,
          }}>
          <TouchableOpacity onPress={() => goBack()}>
            <BackButton />
          </TouchableOpacity>
        </View>
        <Button
          title="Switch names"
          onPress={() => {
            dispatch(toggleName('Banjo'));
          }}
        />

        <Text>{userImage}</Text>
      </View>
    </SafeAreaView>
  );
};

export default PlantDetail;

const styles = StyleSheet.create({});
