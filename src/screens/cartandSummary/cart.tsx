import {Colors, Routes} from '@app/constants';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {Fonts} from '@app/constants/fonts';
import {RootStackParamList} from '@app/navigation/navigation';
import Backbutton from '@app/utilities/backbutton';
import WText from '@app/utilities/customText';
import useCart, {CartProps} from '@app/utilities/hooks/useCart/useCart';
import {truncateText} from '@app/utilities/sentenceHelpers';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

type Props = NativeStackScreenProps<RootStackParamList, 'CartScreen'>;

const CartScreen = ({route, navigation}: Props) => {
  const amount = 300;
  const itemNo = 3;
  const {fetchAllUserCartedItems, cartedList, isLoading, isFetching} =
    useCart();

  useEffect(() => {
    fetchAllUserCartedItems();
  }, []);
  console.log(isFetching);
  if (isLoading) {
    <View
      style={{
        height: screenHeight,
        width: screenWidth,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator color={Colors.primary} />
    </View>;
  } else {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.screenColor,
        }}>
        <Backbutton />
        <View
          style={{
            paddingVertical: screenHeight * 0.1,
            height: screenHeight,
          }}>
          {cartedList.length === 0 ? (
            <WText style={{textAlign: 'center'}}>
              Your cart is currently empty
            </WText>
          ) : (
            <FlatList
              data={cartedList}
              renderItem={renderCartItem}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{height: 10}} />}
              keyExtractor={item => `${item.title}-${item.timeCarted}`}
            />
          )}
        </View>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            navigation.navigate(Routes.TransactionSummary);
          }}>
          <WText
            style={{
              color: Colors.tertiaryTextColor,
              fontSize: 16,
              fontFamily: Fonts.semiBold,
            }}>
            Proceed to Buy
          </WText>
        </TouchableOpacity>
      </View>
    );
  }

  function renderCartItem({item, index}: {item: CartProps; index: number}) {
    console.log(item.title);
    return (
      <View style={styles.cartItemStyle}>
        <WText style={styles.itemTitleStyle}>Item Name</WText>
        {renderCartedItemDetails('Item Name', truncateText(item.title, 24))}
        {renderCartedItemDetails('Date Added', `${item.timeCarted}`)}
        {renderCartedItemDetails('Amount', `${item.timeCarted}`)}
        {renderCartedItemDetails('Total', `$${amount * itemNo}`, {
          fontFamily: Fonts.semiBold,
        })}
      </View>
    );
  }
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
    position: 'absolute',
    bottom: 10,
    backgroundColor: Colors.primary,
    borderRadius: 15,
    height: screenHeight * 0.06,
    width: screenWidth * 0.8,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartItemStyle: {
    width: screenWidth * 0.9,
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
