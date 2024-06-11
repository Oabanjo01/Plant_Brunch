import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WText from '@app/utilities/customText';
import {screenHeight, screenWidth} from '@app/constants/dimensions';

const BottomSheetComponent = () => {
  return (
    <View
      style={{
        alignSelf: 'center',
      }}>
      <WText style={styles.tileStyle}>Systems</WText>
      <WText style={styles.tileStyle}>Dark Mode</WText>
      <WText style={styles.tileStyle}>Delete Account</WText>
    </View>
  );
};

export default BottomSheetComponent;

const styles = StyleSheet.create({
  tileStyle: {
    textAlignVertical: 'center',
    backgroundColor: 'pink',
    width: screenWidth * 0.8,
    height: screenHeight * 0.05,
    marginBottom: 10,
    borderRadius: 10,
  },
});
