import {Colors} from '@app/constants';
import {
  dashboardHeight,
  screenHeight,
  screenWidth,
} from '@app/constants/dimensions';
import {Fonts} from '@app/constants/fonts';
import WText from '@app/utilities/customText';
import ProfileDashboard from '@assets/images/ProfileDashboard.svg';
import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfilePage = () => {
  const [activeButton, setActiveButton] = useState<0 | 1 | 2>(1);
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
          Olabanjo Olakunori
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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: screenHeight * 0.02,
          marginLeft: screenWidth * 0.04,
        }}>
        <View
          style={{
            borderWidth: 3,
            width: 10,
            height: 10,
            borderRadius: 10 / 2,
            marginRight: screenWidth * 0.02,
            borderColor: Colors.addPhotoButtonColor,
          }}
        />
        <View>
          <WText>Alagatre Plant</WText>
          <WText>02.01.2019</WText>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfilePage;
