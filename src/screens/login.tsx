import {LargeButton} from '@app/components/buttons/buttons';
import TextFields from '@app/components/login/textInput';
import {Colors} from '@app/constants/colors';
import {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Checkbox, PaperProvider} from 'react-native-paper';

const LoginScreen = () => {
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
      <LargeButton text="Login" extraStyle={styles.loginButtonStyle} />
      <View
        style={{
          alignItems: 'center',
          marginTop: '4%',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text>Don’t Have Account? </Text>
        <TouchableOpacity
          onPress={() => console.log('Sign Up')}
          activeOpacity={0.9}>
          <Text style={{color: Colors.primary}}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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