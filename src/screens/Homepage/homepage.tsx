import {Colors, Routes} from '@app/constants';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  FlatList,
  StatusBar,
  ScrollView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {FAB, Icon, TextInput} from 'react-native-paper';
import Dashboard from '@assets/images/Dashboard.svg';
import {Data, PhotographyData, PlantData} from '@app/constants/data/homepage';
import {
  dashboardHeight,
  screenHeight,
  screenWidth,
} from '@app/constants/dimensions';
import Warning from '@assets/images/Warning.svg';
import {
  SeparatorComponent,
  _renderPlantTypes,
  _renderItem,
} from '@app/components/homepagecomponents/planttypes';
import {_renderPhotography} from '@app/components/homepagecomponents/photography';
import {RootStackNavigationProp} from '@app/navigation/navigation';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {showToast} from '@app/utilities/toast';
import {useSelector} from 'react-redux';
import {RootState} from '@app/redux/store';
import instance, {generateConfigObject} from '@app/redux/api';
import {Plant, PlantListResponse} from '@app/redux/types';
import {ActivityIndicator} from 'react-native';
import {AxiosError} from 'axios';

const HomePage = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [activeIndex, setActiveIndex] = useState('2');
  const [loadingPicture, setIsLoadingPicture] = useState<boolean>(false);
  const [isFetchingData, setIsFetchingData] = useState<boolean>(true);
  const [plantList, setPlantList] = useState<Plant[]>([]);

  const userData = useSelector((state: RootState) => state.auth.user);
  const {user} = userData;

  useEffect(() => {
    setIsFetchingData(true);
    const fetchPlantList = async () => {
      const response = await instance.request(
        generateConfigObject(
          'get',
          'species-list',
          // {_limit: 5,}
        ),
      );
      console.log(response.status, 'response');
      try {
        return response.data;
      } catch (error: AxiosError | any) {
        console.error(error, 'error');
        setIsFetchingData(false);
        showToast({
          type: 'error',
          text1: 'Error Fetching Plant List',
          text2: error.message,
        });
        throw error.message;
      }
    };
    fetchPlantList().then(data => {
      console.log(data, 'data');
      setPlantList(data ?? []);
    });
    setIsFetchingData(false);
  }, []);
  console.log(isFetchingData, 'isFetchingData');
  const handleLoadStart = () => {
    console.log('Loading plant list');
    setIsLoadingPicture(true);
  };

  const handleLoadEnd = () => {
    console.log('Loaded plant list');
    setIsLoadingPicture(false);
  };
  console.log(plantList, 'plant list');
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
            colors={[Colors.primary, Colors.screenColor]}
            style={{
              opacity: 1,
              height: dashboardHeight,
              width: screenWidth,
            }}>
            <View
              style={{
                marginTop: dashboardHeight * 0.3,
                marginLeft: screenWidth * 0.06,
                // position: 'absolute',
                // top: dashboardHeight * 0.16,
                // left: screenWidth * 0.1,
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
                  fontFamily: 'OpenSans',
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
                bottom: dashboardHeight * 0.1,
                flexDirection: 'row',
                backgroundColor: Colors.whiteColor,
                alignItems: 'center',
                borderRadius: 40,
                paddingHorizontal: screenWidth * 0.03,
              }}>
              <Ionicons
                size={26}
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
              <View
                style={{
                  backgroundColor: Colors.primary,
                  padding: 4,
                  borderRadius: 20,
                }}>
                <Ionicons
                  size={24}
                  color={Colors.whiteColor}
                  name={'arrow-forward-outline'}
                />
              </View>
            </View>
          </LinearGradient>

          <View
            style={{
              marginTop: screenHeight * 0.03,
              width: screenWidth,
              height: screenWidth * 0.24,
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <FlatList
              data={Data}
              keyExtractor={item => item.id}
              renderItem={items =>
                _renderItem(items.item, activeIndex, items.index, () =>
                  setActiveIndex(items.item.id),
                )
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
                fontFamily: 'OpenSans-Bold',
                color: Colors.primaryTextColor,
                marginBottom: screenHeight * 0.01,
              }}>
              Plant Types
            </Text>
            <View
              style={{
                alignItems: plantList.length === 0 ? 'center' : 'flex-start',
              }}>
              <FlatList
                data={plantList}
                keyExtractor={item => item.id.toString()}
                renderItem={item => {
                  return _renderPlantTypes(
                    item.item,
                    loadingPicture,
                    handleLoadStart,
                    handleLoadEnd,
                  );
                }}
                ListEmptyComponent={
                  // isFetchingData || plantList.length === 0 ? (
                  <View
                    style={{
                      // position: 'absolute',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: screenWidth * 0.8,
                      height: screenHeight * 0.2,
                    }}>
                    <ActivityIndicator
                      color={Colors.primary}
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        borderRadius: 5,
                        padding: 10,
                      }}
                    />
                  </View>
                  // ) : null
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
                fontFamily: 'OpenSans-Bold',
                marginBottom: screenHeight * 0.01,
                color: Colors.primaryTextColor,
              }}>
              Photography
            </Text>
            <FlatList
              data={PhotographyData}
              keyExtractor={item => item.id}
              renderItem={item => _renderPhotography(navigation, item.item)}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={SeparatorComponent}
            />
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
