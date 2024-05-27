import {RenderCartItem} from '@app/components/cart/cartItem';
import {Colors, Routes} from '@app/constants';
import {getThemeColor} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {Fonts} from '@app/constants/fonts';
import {RootStackParamList} from '@app/navigation/navigation';
import {RootState} from '@app/redux/store';
import Backbutton from '@app/utilities/backbutton';
import WText from '@app/utilities/customText';
import useCart from '@app/utilities/hooks/cart/useCart';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useSelector} from 'react-redux';

type Props = NativeStackScreenProps<RootStackParamList, 'CartScreen'>;

const CartScreen = ({route, navigation}: Props) => {
  const {fetchAllUserCartedItems, cartedList, isLoading, isFetching} =
    useCart();

  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);

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
        <Backbutton title="Carted Items" containsTitle />
        <View
          style={{
            paddingTop: screenHeight * 0.14,
            paddingBottom: screenHeight * 0.07,
            height: screenHeight,
          }}>
          {cartedList.length === 0 ? (
            <WText style={{textAlign: 'center'}}>
              Your cart is currently empty
            </WText>
          ) : (
            <FlatList
              data={cartedList}
              renderItem={({item, index}: {item: any; index: number}) => (
                <RenderCartItem index={index} item={item} />
              )}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{height: 10}} />}
              keyExtractor={item => `${item.title}-${item.timeCarted}`}
            />
          )}
        </View>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            navigation.navigate('TransactionSummary', {
              itemNo: cartedList.length,
            });
          }}>
          <WText
            style={{
              color: Colors.secondaryTextColor,
              fontSize: 16,
              fontFamily: Fonts.semiBold,
            }}>
            Proceed to Buy
          </WText>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: screenHeight * 0.05,
    position: 'absolute',
    bottom: screenHeight * 0.02,
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
