import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Svg from 'react-native-svg';

import TestImg from '././assets/images/Group.svg';
import {Colors} from '@app/constants/colors';

let screenWidth = Dimensions.get('window').width - 20;
const App = () => {
  return (
    <View style={styles.parentContainer}>
      <TestImg width="80%" height="50%" />
      <Text style={styles.titleTextStyle}>Identify Plants</Text>
      <Text style={styles.bodyTextStyle}>
        You can identify the plants you don't know through your camera
      </Text>
      <TouchableOpacity activeOpacity={0.8}>
        <View style={styles.buttonContainerStyle}>
          <Text style={styles.buttonTextStyle}>Next</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.screenColor,
    flexDirection: 'column',
  },
  titleTextStyle: {
    color: '#36455A',
    fontSize: 19,
    fontFamily: 'OpenSans-SemiBold',
    marginBottom: '7%',
    marginTop: '16%',
  },
  bodyTextStyle: {
    opacity: 0.8,
    fontFamily: 'OpenSans-Regular',
    fontSize: 13,
    color: Colors.secondaryTextColor,
    marginHorizontal: '10%',
    textAlign: 'center',
  },
  buttonContainerStyle: {
    paddingVertical: '2%',
    backgroundColor: Colors.primary,
    marginTop: '14%',
    marginHorizontal: 100,
    borderRadius: 3,
    width: screenWidth * 0.95,
  },
  buttonTextStyle: {
    textAlign: 'center',
    fontFamily: 'OpenSans-Bold',
    fontSize: 15,
    color: Colors.lightTextColor,
  },
});
export default App;
