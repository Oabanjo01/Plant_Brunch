import {LargeButton} from '@app/components/login/buttons';
import TextFields from '@app/components/login/textInput';
import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Checkbox} from 'react-native-paper';
import {styles} from './login';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '@app/navigation/navigation';
import {Routes} from '@app/constants/routes';
import {Colors} from '@app/constants/colors';

type RootStackNavigationProp = NavigationProp<RootStackParamList>;

type Props = {
  navigation: RootStackNavigationProp;
};

const SignUpScreen = ({navigation}: Props) => {
  const [userNameText, setUserNameText] = useState('');
  const [userEmailText, setUserEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [conFirmPasswordText, setConFirmPasswordText] = useState('');
  const [usernamePlacHolder, setUsernamePlaceHolder] = useState('username');
  const [userEmailPlacHolder, setUserEmailPlaceHolder] = useState('useremail');
  const [passwordPlacHolder, setPasswordPlaceHolder] = useState('password');
  const [confirmPasswordPlacHolder, setConfirmPasswordPlaceHolder] =
    useState('confirm-password');
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
        <Text
          style={[
            styles.textStyle,
            {
              fontSize: 30,
              marginBottom: 6,
              fontFamily: 'OpenSans-SemiBold',
            },
          ]}>
          Hello, create a new wildlife account
        </Text>
        <Text style={[styles.textStyle, {marginBottom: '7%'}]}>
          Sign up now! Let’s Learn More About Plants
        </Text>
        <TextFields
          onFocused={() => setUsernamePlaceHolder('')}
          placeHolderText={usernamePlacHolder}
          valueText={userNameText}
          labelText="Username"
          callBack={setUserNameText}
        />
        <TextFields
          onFocused={() => setUserEmailPlaceHolder('')}
          placeHolderText={userEmailPlacHolder}
          valueText={userEmailText}
          labelText="User email"
          callBack={setUserEmailText}
        />
        <TextFields
          onFocused={() => setPasswordPlaceHolder('')}
          placeHolderText={passwordPlacHolder}
          valueText={passwordText}
          labelText="Password"
          callBack={setPasswordText}
        />
        <TextFields
          onFocused={() => setConfirmPasswordPlaceHolder('')}
          placeHolderText={confirmPasswordPlacHolder}
          valueText={conFirmPasswordText}
          labelText="Confirm password"
          callBack={setConFirmPasswordText}
        />
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <LargeButton text="Sign up" extraStyle={styles.loginButtonStyle} />
          <View
            style={{
              alignItems: 'center',
              marginTop: '4%',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={styles.textStyle}>Have an Account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.Login)}
              activeOpacity={0.9}>
              <Text style={{color: Colors.primary}}> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUpScreen;
