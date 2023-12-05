import {Colors} from '@app/constants';
import React, {useState} from 'react';
import {View, Text, FlatList, ImageBackground, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Icon, TextInput} from 'react-native-paper';
import Dashboard from '@assets/images/Dashboard.svg';
import {Data, ItemProps, PlantData} from '@app/constants/homepagedata/homepage';
import {
  dashboardHeight,
  screenHeight,
  screenWidth,
} from '@app/constants/dimensions';
import {
  SeparatorComponent,
  _renderPlantTypes,
  _renderItem,
} from '@app/components/homepagecomponents/homepagecomponents';

const HomePage = () => {
  const [activeIndex, setActiveIndex] = useState('0');

  return (
    <View style={{flex: 1, backgroundColor: Colors.screenColor}}>
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
            position: 'absolute',
            top: dashboardHeight * 0.2,
            left: screenWidth * 0.1,
          }}>
          <Text
            style={{
              fontFamily: 'OpenSans-Bold',
              color: Colors.lightTextColor,
              fontSize: 21,
            }}>
            Hello Banjo,
          </Text>
          <Text
            style={{
              fontFamily: 'OpenSans',
              color: Colors.lightTextColor,
              fontSize: 14,
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
            bottom: -dashboardHeight * 0.15,
            flexDirection: 'row',
            backgroundColor: Colors.whiteColor,
            alignItems: 'center',
            borderRadius: 40,
            paddingLeft: screenWidth * 0.04,
          }}>
          <Icon size={24} color="#000" source={'magnify'} />
          <TextInput
            underlineColor="transparent"
            activeUnderlineColor="transparent"
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
            marginBottom: screenHeight * 0.01,
          }}>
          Plant Types
        </Text>
        <FlatList
          data={PlantData}
          keyExtractor={item => item.id}
          renderItem={_renderPlantTypes}
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
          }}>
          Photography
        </Text>
        <Image
          source={require('@assets/images/Union.jpg')}
          style={{
            width: screenWidth * 0.8,
            height: screenHeight * 0.2,
            resizeMode: 'cover',
          }}
        />
      </View>
    </View>
  );
};

export default HomePage;
