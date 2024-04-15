import {Colors, Routes} from '@app/constants';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TextInput} from 'react-native-paper';
import Dashboard from '@assets/images/Dashboard.svg';
import {Data} from '@app/constants/data/homepage';
import {
  dashboardHeight,
  screenHeight,
  screenWidth,
} from '@app/constants/dimensions';
import RenderPlantTypes, {
  SeparatorComponent,
} from '@app/components/homepagecomponents/planttypes';
import {_renderPhotography} from '@app/components/homepagecomponents/photography';
import {RootStackNavigationProp, ScreenProps} from '@app/navigation/navigation';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {showToast} from '@app/utilities/toast';
import {useSelector} from 'react-redux';
import {RootState} from '@app/redux/store';
import instance, {generateConfigObject} from '@app/redux/api';
import {Plant, PlantDiseaseType, PlantListResponse} from '@app/redux/types';
import {ActivityIndicator} from 'react-native';
import axios, {AxiosError} from 'axios';
import {_renderItem} from '@app/components/homepagecomponents/plantcategories';
import {fetchHomePagedata} from '@app/redux';
import {Fonts} from '@app/constants/fonts';

const HomePage = ({navigation}: ScreenProps) => {
  // const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState('2');
  const [loadingPlantListPicture, setIsLoadingPlantListPicture] =
    useState<boolean>(false);
  const [loadingPlantDiseasePicture, setIsLoadingPlantDiseasePicture] =
    useState<boolean>(false);
  const [isFetchingData, setIsFetchingData] = useState<boolean>(true);
  const [plantList, setPlantList] = useState<Plant[] | null>([]);
  const [plantDisease, setPlantDisease] = useState<PlantDiseaseType[] | null>(
    [],
  );

  const userData = useSelector((state: RootState) => state.auth.user);
  // const {user} = userData;
  const plantItemsToShow = 10;
  const plantDiseasesToShow = 7;

  const fetchPlantList = async () => {
    const response = await fetchHomePagedata();
    try {
      const planSpeciesList = response?.plantList.data;
      return planSpeciesList;
    } catch (error: any) {
      setPlantList(null);
      setIsFetchingData(false);
      if (
        axios.isAxiosError<{error: {message: string}}>(error) &&
        error.response?.status === 401
      ) {
        return error.response.data.error;
      }
      showToast({
        type: 'error',
        text1: 'Error Fetching Plant List',
        text2: error.message,
      });
      throw error.message;
    }
  };

  const fetchPlantDiseases = async () => {
    const response = await fetchHomePagedata();
    try {
      const plantDiseaseList = response?.plantDisease.data;
      return plantDiseaseList;
    } catch (error: any) {
      setPlantDisease(null);
      setIsFetchingData(false);
      if (
        axios.isAxiosError<{error: {message: string}}>(error) &&
        error.response?.status === 401
      ) {
        return error.response.data.error;
      }
      showToast({
        type: 'error',
        text1: 'Error Fetching Plant List',
        text2: error.message,
      });
      throw error.message;
    }
  };

  useEffect(() => {
    setIsFetchingData(true);
    fetchPlantList().then(data => {
      const slicedData = data.slice(0, plantItemsToShow);
      setPlantList(slicedData ?? []);
    });
    fetchPlantDiseases().then((data: PlantDiseaseType[]) => {
      const slicedData = data.slice(0, plantDiseasesToShow);
      setPlantDisease(slicedData);
    });

    setIsFetchingData(false);
  }, []);

  const handlePlantListLoadStart = () => {
    setIsLoadingPlantListPicture(true);
  };

  const handlePlantListLoadEnd = () => {
    setIsLoadingPlantListPicture(false);
  };
  const handlePlantDiseaseLoadStart = () => {
    setIsLoadingPlantDiseasePicture(true);
  };

  const handlePlantDiseaseLoadEnd = () => {
    setIsLoadingPlantDiseasePicture(false);
  };
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.screenColor,
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="never">
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            locations={[0.1, 1]}
            colors={['#61D2C4', '#29D890']}
            style={{
              opacity: 1,
              height: dashboardHeight,
              width: screenWidth,
            }}>
            <View
              style={{
                marginTop: dashboardHeight * 0.3,
                marginLeft: screenWidth * 0.06,
              }}>
              <Text
                style={{
                  fontFamily: 'OpenSans-Bold',
                  color: Colors.lightTextColor,
                  fontSize: 28,
                }}>
                Hello ,
              </Text>
              <Text
                style={{
                  marginTop: 5,
                  fontFamily: Fonts.Regular,
                  color: Colors.lightTextColor,
                  fontSize: 17,
                }}>
                Let’s Learn More About Plants
              </Text>
            </View>

            <View style={{position: 'absolute', right: 0}}>
              <Dashboard />
            </View>
            <TouchableOpacity
              onPress={() => {
                auth()
                  .signOut()
                  .then(() => {
                    navigation.replace(Routes.Login);
                    showToast({
                      type: 'success',
                      text1: 'Logged out',
                      text2: 'You have been logged out',
                    });
                  })
                  .catch((error: string) => {
                    console.log(error);
                    showToast({
                      type: 'error',
                      text1: 'Could not log out',
                      text2: 'An error occurred while logging out',
                    });
                  });
              }}
              style={{
                alignItems: 'center',
                position: 'absolute',
                top: dashboardHeight * 0.3,
                right: 20,
              }}>
              <Ionicons name="log-out" color={Colors.whiteColor} size={40} />
              <Text style={{color: Colors.whiteColor}}>Logout</Text>
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                position: 'absolute',
                left: screenWidth * 0.05,
                right: screenWidth * 0.05,
                bottom: -dashboardHeight * 0.1,
                flexDirection: 'row',
                backgroundColor: Colors.whiteColor,
                alignItems: 'center',
                borderRadius: 40,
                paddingHorizontal: screenWidth * 0.03,
                ...Platform.select({
                  ios: {
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowOffset: {width: 1, height: 2},
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                  },
                  android: {
                    elevation: 7,
                  },
                }),
              }}>
              <Ionicons
                size={26}
                style={{marginLeft: 10}}
                color={Colors.primary}
                name={'search-outline'}
              />
              <TextInput
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                selectionColor={Colors.primary}
                cursorColor={Colors.primary}
                maxLength={24}
                style={{
                  backgroundColor: 'transparent',
                  flex: 1,
                  borderColor: 'transparent',
                }}
              />
            </View>
          </LinearGradient>

          <View
            style={{
              marginTop: screenHeight * 0.06,
              width: screenWidth,
              height: screenWidth * 0.24,
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <FlatList
              data={Data}
              keyExtractor={item => item.id}
              renderItem={items =>
                _renderItem(items.item, () => {
                  items.index === 2
                    ? navigation.navigate(Routes.Articles)
                    : console.log('items');
                })
              }
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={SeparatorComponent}
            />
          </View>
          <View
            style={{
              marginHorizontal: screenWidth * 0.05,
              marginTop: screenHeight * 0.01,
            }}>
            <Text
              style={{
                fontSize: 17,
                color: Colors.primaryTextColor,
                marginBottom: screenHeight * 0.01,
              }}>
              Plant Types
            </Text>
            <View
              style={{
                alignItems: plantList?.length === 0 ? 'center' : 'flex-start',
                borderRadius: 5,
              }}>
              <FlatList
                data={plantList}
                keyExtractor={item => item.id.toString()}
                renderItem={item => {
                  return RenderPlantTypes(
                    item.item,
                    loadingPlantListPicture,
                    handlePlantListLoadStart,
                    handlePlantListLoadEnd,
                    navigation,
                  );
                }}
                ListEmptyComponent={
                  isFetchingData || plantList?.length === 0 ? (
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: Colors.whiteColor,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                        width: screenWidth * 0.73,
                        height: screenHeight * 0.22,
                      }}>
                      <ActivityIndicator
                        color={Colors.primary}
                        style={{
                          backgroundColor: 'rgba(0, 0, 0, 0.2)',
                          borderRadius: 5,
                          padding: 10,
                        }}
                      />
                    </View>
                  ) : null
                }
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={SeparatorComponent}
              />
            </View>
          </View>
          <View
            style={{
              marginHorizontal: screenWidth * 0.05,
              marginVertical: screenHeight * 0.01,
            }}>
            <Text
              style={{
                fontSize: 17,
                marginBottom: screenHeight * 0.01,
                color: Colors.primaryTextColor,
              }}>
              Photography
            </Text>
            <View
              style={{
                alignItems:
                  plantDisease?.length === 0 ? 'center' : 'flex-start',
                borderRadius: 5,
              }}>
              <FlatList
                data={plantDisease}
                keyExtractor={item => item.id.toString()}
                renderItem={item => {
                  return _renderPhotography(
                    navigation,
                    item.item,
                    loadingPlantDiseasePicture,
                    handlePlantDiseaseLoadStart,
                    handlePlantDiseaseLoadEnd,
                  );
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={SeparatorComponent}
                ListEmptyComponent={
                  isFetchingData || plantDisease?.length === 0 ? (
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: Colors.whiteColor,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                        width: screenWidth * 0.4,
                        height: screenHeight * 0.25,
                      }}>
                      <ActivityIndicator
                        color={Colors.primary}
                        style={{
                          backgroundColor: 'rgba(0, 0, 0, 0.2)',
                          borderRadius: 5,
                          padding: 10,
                        }}
                      />
                    </View>
                  ) : null
                }
              />
            </View>
            <Text
              style={{
                fontSize: 14,
                alignItems: 'center',
                fontFamily: 'OpenSans-Bold',
                textAlign: 'center',
                flex: 1,
                color: Colors.addPhotoButtonColor,
                marginTop: screenHeight * 0.03,
                marginBottom: screenHeight * 0.05,
              }}>
              About Developer
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'relative',
    margin: 16,
    marginTop: 40,
    right: 0,
    bottom: 0,
  },
});

export default HomePage;
