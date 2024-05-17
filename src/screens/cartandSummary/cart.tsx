import {Colors, Routes} from '@app/constants';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {Fonts} from '@app/constants/fonts';
import {RootStackParamList} from '@app/navigation/navigation';
import Backbutton from '@app/utilities/backbutton';
import WText from '@app/utilities/customText';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'CartScreen'>;
const CartScreen = ({route, navigation}: Props) => {
  const amount = 300;
  const itemNo = 3;
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: Colors.screenColor,
      }}>
      <Backbutton />
      <View style={styles.cartItemStyle}>
        <WText style={styles.itemTitleStyle}>Item Name</WText>
        {renderCartedItemDetails('Amount', `$${amount}`)}
        {renderCartedItemDetails('No. of Items', `${itemNo}`)}
        {renderCartedItemDetails('Total', `$${amount * itemNo}`, {
          fontFamily: Fonts.semiBold,
        })}
      </View>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          navigation.navigate(Routes.TransactionSummary);
        }}>
        <WText
          style={{
            color: Colors.lightTextColor,
            fontSize: 16,
            fontFamily: Fonts.semiBold,
          }}>
          Proceed to Buy
        </WText>
      </TouchableOpacity>
    </ScrollView>
  );
};
function renderCartedItemDetails(
  title: string,
  specifics: string | number,
  titleStyle?: TextStyle,
) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: screenHeight * 0.005,
      }}>
      <WText style={titleStyle}>{title}</WText>
      <WText>{specifics}</WText>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: screenHeight * 0.05,
    backgroundColor: Colors.primary,
    borderRadius: 15,
    height: screenHeight * 0.06,
    width: screenWidth * 0.8,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartItemStyle: {
    marginTop: screenHeight * 0.1,
    width: screenWidth * 0.85,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: screenWidth * 0.05,
    paddingVertical: screenHeight * 0.03,
  },
  itemTitleStyle: {
    fontSize: 16,
    color: Colors.addPhotoButtonColor,
    marginBottom: screenHeight * 0.01,
    fontFamily: Fonts.semiBold,
  },
});

export default CartScreen;
