import {LargeButton} from '@app/components/buttons/buttons';
import TextFields from '@app/components/login/textInput';
import {Routes} from '@app/constants';
import {Colors} from '@app/constants/colors';
import {RootStackParamList} from '@app/navigation/navigation';
import {NavigationProp} from '@react-navigation/native';
import {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Checkbox, PaperProvider} from 'react-native-paper';

type RootStackNavigationProp = NavigationProp<RootStackParamList>;

type Props = {
  navigation: RootStackNavigationProp;
};

const LoginScreen = ({navigation}: Props) => {
  const [userNameText, setUserNameText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [usernamePlacHolder, setUsernamePlaceHolder] = useState('username');
  const [passwordPlacHolder, setPasswordPlaceHolder] = useState('password');
  const [checked, setChecked] = useState(false);
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: Colors.primaryTextColor,
          fontSize: 30,
          fontFamily: 'OpenSans-SemiBold',
          marginBottom: 6,
        }}>
        Hello
      </Text>
      <Text style={{marginBottom: '7%'}}>Let’s Learn More About Plants</Text>
      <TextFields
        onFocused={() => setUsernamePlaceHolder('')}
        placeHolderText={usernamePlacHolder}
        valueText={userNameText}
        labelText="Username"
        callBack={setUserNameText}
      />
      <TextFields
        onFocused={() => setPasswordPlaceHolder('')}
        placeHolderText={passwordPlacHolder}
        valueText={passwordText}
        labelText="Password"
        callBack={setPasswordText}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Checkbox
            color={Colors.primary}
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => setChecked(!checked)}
          />
          <Text>Remember me</Text>
        </View>
        <Text>Forgot Password?</Text>
      </View>
      <LargeButton
        text="Login"
        extraStyle={styles.loginButtonStyle}
        onPress={() => navigation.navigate(Routes.Home)}
      />
      <View
        style={{
          alignItems: 'center',
          marginTop: '4%',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text>Don’t Have Account? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(Routes.SignUp)}
          activeOpacity={0.9}>
          <Text style={{color: Colors.primary}}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  loginButtonStyle: {
    alignItems: 'center',
    marginTop: '7%',
  },
  container: {
    backgroundColor: Colors.screenColor,
    flexDirection: 'column',
    paddingTop: '15%',
    paddingLeft: '7%',
    paddingRight: '7%',
    flex: 1,
  },
});
export default LoginScreen;
