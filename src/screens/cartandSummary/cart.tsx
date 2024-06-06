import {RenderCartItem} from '@app/components/cart/cartItem';
import {Colors, Routes} from '@app/constants';
import {getThemeColor} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {Fonts} from '@app/constants/fonts';
import {RootStackParamList} from '@app/navigation/navigation';
import {RootState} from '@app/redux/store';
import ConfirmButton from '@app/utilities/ConfirmButton';

import Backbutton from '@app/utilities/backbutton';
import WText from '@app/utilities/customText';
import useCart from '@app/utilities/hooks/cart/useCart';
import LoadingIndicator from '@app/utilities/loadingIndicator';

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
  console.log(isFetching, isLoading);
  if (isLoading) {
    return <LoadingIndicator size={40} />;
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

        <ConfirmButton
          buttonText="Proceed to Buy"
          // newStyle={{}}
          onPress={() => {
            navigation.navigate('TransactionSummary', {
              itemNo: cartedList.length,
            });
          }}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
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
