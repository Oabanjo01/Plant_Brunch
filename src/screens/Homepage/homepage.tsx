import {Colors} from '@app/constants';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  FlatList,
  StatusBar,
  ScrollView,
  Platform,
  StyleSheet,
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
import {
  SeparatorComponent,
  _renderPlantTypes,
  _renderItem,
} from '@app/components/homepagecomponents/planttypes';
import {_renderPhotography} from '@app/components/homepagecomponents/photography';
import {RootStackNavigationProp} from '@app/navigation/navigation';
import {useNavigation} from '@react-navigation/native';

const HomePage = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [activeIndex, setActiveIndex] = useState('2');
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
                Hello Banjo,
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
            <FlatList
              data={PlantData}
              keyExtractor={item => item.id}
              renderItem={item => _renderPlantTypes(item.item)}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={SeparatorComponent}
            />
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
