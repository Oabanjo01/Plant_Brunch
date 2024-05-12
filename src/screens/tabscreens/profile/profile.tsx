import {Colors} from '@app/constants';
import {
  PhotographyData,
  PlantData,
  PlantProps,
} from '@app/constants/data/homepage';
import {
  dashboardHeight,
  screenHeight,
  screenWidth,
} from '@app/constants/dimensions';
import {Fonts} from '@app/constants/fonts';
import {RootState} from '@app/redux/store';
import WText from '@app/utilities/customText';
import ProfileDashboard from '@assets/images/ProfileDashboard.svg';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

const imageWidth = screenWidth / 3;
const ProfilePage = () => {
  const [activeButton, setActiveButton] = useState<0 | 1 | 2>(1);
  const userData = useSelector((state: RootState) => state.auth.user);
  const {displayName} = userData;

  return (
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
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: dashboardHeight * 0.4,
            width: dashboardHeight * 0.4,
            borderRadius: (dashboardHeight * 0.4) / 2,
            borderWidth: 2,
            borderColor: Colors.whiteColor,
            alignSelf: 'center',
            justifyContent: 'center',
          }}
        />
        <WText
          style={{
            marginTop: 20,
            marginBottom: 10,
            color: Colors.whiteColor,
            fontFamily: Fonts.semiBold,
            fontSize: 18,
          }}>
          {displayName}
        </WText>
        <View style={{flexDirection: 'row'}}>
          <Ionicons name={'location'} size={30} color={Colors.whiteColor} />
          <WText
            style={{
              color: Colors.whiteColor,
              fontFamily: Fonts.semiBold,
              fontSize: 15,
              marginLeft: 10,
              alignSelf: 'center',
            }}>
            Okunade street
          </WText>
        </View>
        <View style={{position: 'absolute', right: 0}}>
          <ProfileDashboard />
        </View>
      </LinearGradient>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: screenHeight * 0.04,
        }}>
        <TouchableOpacity
          onPress={() => setActiveButton(0)}
          style={{
            padding: 10,
            backgroundColor:
              activeButton === 0 ? Colors.addPhotoButtonColor : 'transparent',
            borderRadius: 20,
          }}>
          <WText
            style={{
              paddingHorizontal: 10,
              color:
                activeButton === 0
                  ? Colors.whiteColor
                  : Colors.primaryTextColor,
            }}>
            ARTICLES
          </WText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveButton(1)}
          style={{
            padding: 10,
            backgroundColor:
              activeButton === 1 ? Colors.addPhotoButtonColor : 'transparent',
            borderRadius: 20,
          }}>
          <WText
            style={{
              paddingHorizontal: 10,
              color:
                activeButton === 1
                  ? Colors.whiteColor
                  : Colors.primaryTextColor,
            }}>
            SPECIES
          </WText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveButton(2)}
          style={{
            padding: 10,
            backgroundColor:
              activeButton === 2 ? Colors.addPhotoButtonColor : 'transparent',
            borderRadius: 20,
          }}>
          <WText
            style={{
              paddingHorizontal: 10,
              color:
                activeButton === 2
                  ? Colors.whiteColor
                  : Colors.primaryTextColor,
            }}>
            LIKES
          </WText>
        </TouchableOpacity>
      </View>
      <WText
        style={{
          fontFamily: Fonts.semiBold,
          marginTop: screenHeight * 0.02,
          marginLeft: screenWidth * 0.04,
        }}>
        YOUR COLLECTED PLANTS
      </WText>

      <FlatList
        data={PlantData}
        showsHorizontalScrollIndicator={false}
        renderItem={renderCollectedPlantBox}
        keyExtractor={item => item.id}
      />
    </ScrollView>
  );
};

const renderCollectedPlantBox = ({item}: {item: any}) => {
  console.log(item);
  return (
    <View style={styles.collectedPlantBoxStyle}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={styles.radioButtonStyle} />
        <View style={{marginBottom: screenHeight * 0.01}}>
          <WText>{item.description1}</WText>
          <WText>02.01.2019</WText>
        </View>
      </View>
      <View
        style={
          {
            // flex: 1,
          }
        }>
        <FlatList
          data={PhotographyData}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          renderItem={renderImage}
          keyExtractor={item => item.id}
          style={
            {
              // flex: 1,
            }
          }
        />
      </View>
    </View>
  );
};

const renderImage = ({item, index}: {item: PlantProps; index: any}) => {
  const isLastImage = index === PhotographyData.length - 1;
  const remainingCount = isLastImage ? PhotographyData.length - 4 : 0;
  console.log(item);
  return (
    <View
      style={{
        flex: 1,
      }}>
      <FastImage
        source={item.imagePath}
        resizeMode={'cover'}
        style={{
          borderTopLeftRadius: index === 0 ? 10 : 0,
          borderTopRightRadius: index === 1 ? 10 : 0,
          height: 150,
          // width: 100,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  collectedPlantBoxStyle: {
    alignSelf: 'center',
    height: screenHeight * 0.45,
    marginTop: 10,
    borderRadius: 10,
    width: screenWidth * 0.9,
    backgroundColor: Colors.whiteColor,
    flex: 1,
    padding: screenWidth * 0.03,
  },
  radioButtonStyle: {
    borderWidth: 3,
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    marginRight: screenWidth * 0.02,
    borderColor: Colors.addPhotoButtonColor,
  },
});

export default ProfilePage;
