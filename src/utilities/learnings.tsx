// Using tabbaricon

// tabBarIcon: ({focused, size}) => {
//   let iconName;
//   let iconColor;
//   if (route.name === Tabs.Home) {
//     iconColor = Colors.primary;
//     iconName = focused ? 'home' : 'home-outline';
//   } else if (route.name === Tabs.Profile) {
//     iconColor = Colors.primary;
//     iconName = focused ? 'person' : 'person-outline';
//   } else if (route.name === Tabs.CameraButton) {
//     iconName = focused ? 'camera' : 'camera-outline';
//   }
//   return (
//     <View>
//       <Ionicons name={iconName} size={size} color={iconColor} />
//     </View>
//   );
// },

// using CustomImagePickerButton

// const CustomImagePickerButton = (onPress: any) => (
//   <TouchableOpacity
//     onPress={onPress}
//     style={{top: -25, justifyContent: 'center', alignItems: 'center'}}>
//     <View
//       style={{
//         width: screenWidth * 0.15,
//         height: screenWidth * 0.15,
//         borderRadius: (screenWidth * 0.15) / 2,
//         // backgroundColor: Colors.addPhotoButtonColor,
//       }}>
//       {/* {children} */}
//     </View>
//     {/* // <Ionicons name={'add'} color={Colors.primary} />; */}
//   </TouchableOpacity>
// );

// Using Tab bar icon

// tabBarLabel: Tabs.CameraButton,
// tabBarIcon: ({focused}) => {
//   return (
//     <View
//       style={{
//         position: 'absolute',
//         top: -40, // space from bottombar
//         height: screenWidth * 0.2,
//         width: screenWidth * 0.2,
//         borderWidth: focused ? 0 : 0.5,
//         borderColor: focused ? 'transparent' : Colors.primary,
//         backgroundColor: focused
//           ? Colors.addPhotoButtonColor
//           : Colors.whiteColor,
//         borderRadius: (screenWidth * 0.2) / 2,
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}>
//       <Ionicons
//         name="camera"
//         size={30}
//         color={focused ? Colors.whiteColor : Colors.addPhotoButtonColor}
//       />
//     </View>
//   );
// },

// Using tabbar background

// tabBarBackground: () => {
//   return (
//     <View
//       style={
//         {
//           // flex: 1,
//           // width: '10%',
//           // // height: screenHeight * 0.08,
//           // // position: 'absolute',
//           // // bottom: -screenHeight * 0.026,
//           // justifyContent: 'center',
//           // alignItems: 'center',
//         }
//       }>
//       <ImageBackground
//         style={{
//           flex: 1,
//           width: '100%',
//           height: screenHeight * 0.15,
//           position: 'absolute',
//           top: -37,
//           // bottom: -screenHeight * 0.026,
//           justifyContent: 'flex-start',
//           alignContent: 'center',
//         }}
//         source={require('../../assets/images/Union.jpg')}
//         resizeMode="cover"
//       />
//     </View>
//   );
// },

// Stylings I used

// return (
//   <View
//     style={{
//       height: screenHeight * 0.08,
//       backgroundColor: Colors.whiteColor,
//     }}>
//     <ImageBackground
//       style={{
//         flex: 1,
//         width: '100%',
//         height: screenHeight * 0.15,
//         position: 'absolute',
//         top: -26,
//         bottom: 0,
//         // justifyContent: 'flex-start',
//         alignContent: 'center',
//       }}
//       source={require('../../assets/images/Union.jpg')}
//       resizeMode="contain"
//     />
//   </View>
// );

// giving a type to a promise - async (): Promise<DataFromLikesCollection[]> => {}
