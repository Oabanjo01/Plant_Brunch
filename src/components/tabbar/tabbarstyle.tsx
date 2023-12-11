import {Tabs} from '@app/constants/routes';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from 'react-native/Libraries/NewAppScreen';

type CustomTabBarProps = {
  state: {routes: any; index: number};
  descriptors: {[key: string]: any}; // Adjust the type for descriptors according to your needs
  navigation: any;
  screenHeight: number; // Add the necessary props and their types
  screenWidth: number; // Adjust the type according to your requirements
};

const TabBarStyle: React.FC<CustomTabBarProps> = ({
  state,
  descriptors,
  navigation,
  screenHeight,
  screenWidth,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: Colors.whiteColor,
        height: screenHeight * 0.08,
      }}>
      <ImageBackground
        style={{
          flex: 1,
          width: '100%',
          height: screenHeight * 0.15,
          position: 'absolute',
          top: -29,
          // bottom: -screenHeight * 0.026,
          justifyContent: 'flex-start',
          alignContent: 'center',
        }}
        source={require('../../assets/images/Union.jpg')}
        resizeMode="cover"
      />
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label = options.title !== undefined ? options.title : route.name;

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
                  height: screenWidth * 0.19,
                  width: screenWidth * 0.19,
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
                  name="camera"
                  size={30}
                  color={
                    isFocused ? Colors.whiteColor : Colors.addPhotoButtonColor
                  }
                />
              </View>
            ) : (
              <View>
                <Ionicons
                  name={iconName ?? 'error'}
                  color={isFocused ? Colors.primary : Colors.tabBarTextColor}
                  size={24}
                />
                <Text
                  style={{
                    textAlign: 'justify',
                    alignItems: 'center',
                    color: isFocused ? Colors.primary : Colors.tabBarTextColor,
                  }}>
                  {label}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBarStyle;
