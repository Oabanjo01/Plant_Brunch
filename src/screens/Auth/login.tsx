import {LargeButton} from '@app/components/login/buttons';
import TextFields from '@app/components/login/textInput';
import {Routes} from '@app/constants';
import {Colors} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {Fonts} from '@app/constants/fonts';
import {ScreenProps} from '@app/navigation/navigation';
import WText from '@app/utilities/customText';
import {useLogin} from '@app/utilities/hooks/authentication/useLogin';
import auth from '@react-native-firebase/auth';
import {Formik} from 'formik';
import React from 'react';
import {useEffect, useState} from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActivityIndicator, Checkbox, useTheme} from 'react-native-paper';
import * as yup from 'yup';

const LoginScreen = ({navigation}: ScreenProps) => {
  const [emailPlacHolder, setEmailPlaceHolder] = useState('email');
  const [passwordPlacHolder, setPasswordPlaceHolder] = useState('password');
  const [checked, setChecked] = useState(false);
  const [validateChange, setValidateChange] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [displayPassword, setDisplayPassword] = useState(true);
  const [userAuthState, setUserAuthState] = useState<boolean | string>(false);

  const handleFieldBlur = (fieldName: any) => {};
  const {handleLogin, isLoading, setIsLoading} = useLogin();

  const theme = useTheme();

  useEffect(() => {
    setUserAuthState(false);
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user && user.emailVerified) {
        setUserAuthState(true);
        navigation.navigate(Routes.Home);
      } else {
        setUserAuthState('notAuthenticated');
      }
    });
    return unsubscribe;
  }, []);

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
      .trim()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });
  if (userAuthState === false) {
    return (
      <ActivityIndicator
        size={40}
        color={Colors.primary}
        style={{justifyContent: 'center', alignItems: 'center', flex: 1}}
      />
    );
  } else if (userAuthState === 'notAuthenticated') {
    return (
      <Formik
        initialValues={{email: '', password: ''}}
        validateOnBlur
        validateOnChange={validateChange}
        validationSchema={loginValidationSchema}
        onSubmit={values => {
          setValidateChange(true);
          handleLogin(values, navigation);
        }}>
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          isSubmitting,
          isValid,
          touched,
        }) => (
          <ScrollView
            style={styles.container}
            keyboardShouldPersistTaps="never">
            <WText
              style={{
                color: Colors.primaryTextColor,
                fontSize: 30,
                fontFamily: Fonts.semiBold,
                marginBottom: 6,
              }}>
              Hi there,
            </WText>
            <WText
              style={{
                marginBottom: screenHeight * 0.03,
                color: Colors.primaryTextColor,
                fontFamily: Fonts.Regular,
              }}>
              Let’s Learn More About Plants
            </WText>
            <TextFields
              theme={theme}
              onFocused={() => setEmailPlaceHolder('')}
              placeHolderText={emailPlacHolder}
              valueText={values.email}
              keyboardType="email-address"
              labelText="Email"
              onBlur={e => handleFieldBlur('email')}
              callBack={handleChange('email')}
            />
            {isValid === false && isValidEmail === false && (
              <WText style={{fontSize: 12, color: 'red'}}>{errors.email}</WText>
            )}
            <TextFields
              theme={theme}
              onFocused={() => setPasswordPlaceHolder('')}
              placeHolderText={passwordPlacHolder}
              valueText={values.password}
              labelText="Password"
              onBlur={e => handleFieldBlur('password')}
              callBack={handleChange('password')}
              displayRightIcon
              togglePasswordDisplay={() => setDisplayPassword(!displayPassword)}
              displayPassword={displayPassword}
            />
            {isValid === false && isValidPassword === false && (
              <WText style={{fontSize: 12, color: 'red'}}>
                {errors.password}
              </WText>
            )}
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
                <WText
                  style={{
                    color: Colors.primaryTextColor,
                    fontFamily: Fonts.Regular,
                  }}>
                  Remember me
                </WText>
              </View>
              <WText
                style={{
                  color: Colors.primary,
                  fontFamily: Fonts.italic,
                  fontWeight: '600',
                  fontStyle: 'italic',
                }}>
                Forgot Password?
              </WText>
            </View>
            <LargeButton
              text={isLoading ? 'Loading...' : 'Log in'}
              extraStyle={
                isLoading ? styles.loadingButtonStyle : styles.loginButtonStyle
              }
              onPress={
                !isLoading
                  ? () => {
                      Keyboard.dismiss();
                      loginValidationSchema.validate(values).then(async () => {
                        setIsValidEmail(true);
                        setIsValidPassword(true);
                      });
                      handleSubmit();
                    }
                  : () => {}
              }
            />
            <View
              style={{
                alignItems: 'center',
                marginTop: screenHeight * 0.03,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <WText
                style={{
                  color: Colors.primaryTextColor,
                  fontFamily: Fonts.Regular,
                }}>
                Don’t Have Account?{' '}
              </WText>
              <TouchableOpacity
                onPress={() => navigation.navigate(Routes.SignUp)}
                activeOpacity={0.9}>
                <WText style={{color: Colors.primary}}> Sign Up</WText>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </Formik>
    );
  }
};

export const styles = StyleSheet.create({
  loginButtonStyle: {
    alignItems: 'center',
    marginTop: '7%',
  },
  loadingButtonStyle: {
    alignItems: 'center',
    marginTop: '7%',
    backgroundColor: Colors.disabledButtonColor,
  },
  container: {
    backgroundColor: Colors.screenColor,
    flexDirection: 'column',
    paddingTop: '15%',
    paddingLeft: '7%',
    paddingRight: '7%',
    flex: 1,
  },
  selectGender: {
    width: screenWidth * 0.5,
    height: screenHeight * 0.05,
    marginVertical: screenHeight * 0.01,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: screenWidth * 0.05,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  dropdownSelectedStyle: {
    width: '100%',
    paddingHorizontal: 12,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 12,
    height: screenHeight * 0.06,
  },
});
export default LoginScreen;
