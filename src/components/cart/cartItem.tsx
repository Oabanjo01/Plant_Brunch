import {Fonts} from '@app/constants/fonts';
import WText from '@app/utilities/customText';
import {CartProps} from '@app/utilities/hooks/cart/useCart';
import {truncateText} from '@app/utilities/sentenceHelpers';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {RenderCartedItemDetails} from './cartedItemDetails';
import {Colors as StaticColors, getThemeColor} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {useSelector} from 'react-redux';
import {RootState} from '@app/redux/store';

export const RenderCartItem = ({
  item,
  index,
}: {
  item: CartProps;
  index: number;
}) => {
  const amount = 300;
  const itemNo = 3;
  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);
  return (
    <View
      style={{...styles.cartItemStyle, backgroundColor: Colors.lighterBlack}}>
      <WText style={styles.itemTitleStyle}>
        {truncateText(item.title, 35)}
      </WText>
      <RenderCartedItemDetails
        specifics={truncateText(item.title, 24)}
        title={'Item Name'}
      />
      <RenderCartedItemDetails
        title="Date Added"
        specifics={`${item.timeCarted}`}
      />
      <RenderCartedItemDetails
        title="Amount"
        specifics={`${item.timeCarted}`}
      />
      <RenderCartedItemDetails
        specifics={`$${amount * itemNo}`}
        title="Total"
        titleStyle={{fontFamily: Fonts.semiBold}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: screenHeight * 0.05,
    position: 'absolute',
    bottom: 10,
    backgroundColor: StaticColors.primary,
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
    paddingHorizontal: screenWidth * 0.05,
    paddingVertical: screenHeight * 0.03,
  },
  itemTitleStyle: {
    fontSize: 16,
    color: StaticColors.addPhotoButtonColor,
    marginBottom: screenHeight * 0.01,
    fontFamily: Fonts.semiBold,
  },
});
