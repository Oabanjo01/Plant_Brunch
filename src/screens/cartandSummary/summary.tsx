import {Colors} from '@app/constants';
import {getThemeColor} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {Fonts} from '@app/constants/fonts';
import {RootStackParamList} from '@app/navigation/navigation';
import {RootState} from '@app/redux/store';
import Backbutton from '@app/utilities/backbutton';
import WText from '@app/utilities/customText';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Pressable, StyleSheet, TextStyle, View} from 'react-native';
import {Divider} from 'react-native-paper';
import {useSelector} from 'react-redux';

type Props = NativeStackScreenProps<RootStackParamList, 'TransactionSummary'>;
const TransactionSummary = ({route, navigation}: Props) => {
  const itemNo = route.params?.itemNo ?? 0;
  const amount = 300;

  const date = '12-09-1999';

  const userTheme = useSelector((state: RootState) => state.theme);
  const {theme} = userTheme;
  const Colors = getThemeColor(theme);
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: Colors.screenColor,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Backbutton containsTitle title="Summary" />
      <View
        style={{...styles.cartItemStyle, backgroundColor: Colors.lighterBlack}}>
        <WText style={styles.itemTitleStyle}>Item Name</WText>
        {renderCartedItemDetails('No. of Items', `${itemNo}`)}
        {renderCartedItemDetails('Date', `${date} (3:04pm)`)}
        <Divider
          bold
          style={{
            marginBottom: screenHeight * 0.01,
            marginTop: screenHeight * 0.04,
          }}
        />
        {renderCartedItemDetails('Total', `$${amount * itemNo}`, {
          fontFamily: Fonts.semiBold,
        })}
      </View>
      <Pressable
        style={{
          ...styles.buttonStyle,
          backgroundColor:
            itemNo === 0 ? Colors.disabledButtonColor : Colors.primary,
        }}
        onPress={itemNo !== 0 ? () => {} : null}>
        <WText
          style={{
            color: Colors.secondaryTextColor,
            fontSize: 16,
            fontFamily: Fonts.semiBold,
          }}>
          Make Payment
        </WText>
      </Pressable>
    </View>
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
      <WText style={{color: Colors.addPhotoButtonColor}}>{specifics}</WText>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: screenHeight * 0.05,
    borderRadius: 15,
    height: screenHeight * 0.06,
    width: screenWidth * 0.8,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartItemStyle: {
    width: screenWidth * 0.85,
    borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: screenWidth * 0.05,
    paddingVertical: screenHeight * 0.03,
  },
  itemTitleStyle: {
    fontSize: 16,
    color: Colors.primary,
    marginBottom: screenHeight * 0.01,
    fontFamily: Fonts.semiBold,
  },
});

export default TransactionSummary;
