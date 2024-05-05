import {Colors} from '@app/constants/colors';
import {Tabs} from '@app/constants/routes';
import WText from '@app/utilities/customText';
import React from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type CustomTabBarProps = {
  state: {routes: any; index: number};
  descriptors: {[key: string]: any};
  navigation: any;
  screenHeight: number;
  screenWidth: number;
};

const TabBarStyle: React.FC<CustomTabBarProps> = ({
  state,
  descriptors,
  navigation,
  screenHeight,
  screenWidth,
}) => {
  return (
    <KeyboardAvoidingView>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: Colors.whiteColor,
          height: screenHeight * 0.1,
        }}>
        <ImageBackground
          style={{
            flex: 1,
            width: '100%',
            height: screenHeight * 0.16,
            position: 'absolute',
            top: -32,
            // bottom: -screenHeight * 0.026,
            justifyContent: 'flex-start',
            alignContent: 'center',
          }}
          source={require('@assets/images/Union.jpg')}
          resizeMode="cover"
        />
        {state.routes.map((route: any, index: number) => {
          const {options} = descriptors[route.key];
          const label =
            options.title !== undefined ? options.title : route.name;

          const isFocused = state.index === index;

          let iconName;
          if (route.name === Tabs.Home) {
            iconName = isFocused ? 'home' : 'home-outline';
          } else if (route.name === Tabs.Profile) {
            iconName = isFocused ? 'person' : 'person-outline';
          } else if (route.name === Tabs.CameraButton) {
            iconName = isFocused ? 'camera' : 'camera-outline';
          }

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {index === 1 ? (
                <View
                  style={{
                    position: 'absolute',
                    top: -21, // space from bottombar
                    height: screenWidth * 0.15,
                    width: screenWidth * 0.15,
                    borderWidth: isFocused ? 0 : 0.5,
                    borderColor: isFocused ? 'transparent' : Colors.primary,
                    backgroundColor: isFocused
                      ? Colors.addPhotoButtonColor
                      : Colors.whiteColor,
                    borderRadius: (screenWidth * 0.2) / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Ionicons
                    name="add"
                    size={32}
                    color={
                      isFocused ? Colors.whiteColor : Colors.addPhotoButtonColor
                    }
                  />
                </View>
              ) : (
                <View style={{alignItems: 'center'}}>
                  <Ionicons
                    name={iconName ?? 'error'}
                    color={isFocused ? Colors.primary : Colors.tabBarTextColor}
                    size={24}
                  />
                  <WText
                    style={{
                      textAlign: 'justify',
                      fontFamily: 'OpenSans-Regular',
                      fontSize: 15,
                      alignItems: 'center',
                      color: isFocused
                        ? Colors.primary
                        : Colors.tabBarTextColor,
                    }}>
                    {label}
                  </WText>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </KeyboardAvoidingView>
  );
};

export default TabBarStyle;
