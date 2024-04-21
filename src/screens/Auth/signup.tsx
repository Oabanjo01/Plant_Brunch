import React, {useState} from 'react';
import {LargeButton} from '@app/components/login/buttons';
import TextFields from '@app/components/login/textInput';

import {Colors} from '@app/constants/colors';
import {Fonts} from '@app/constants/fonts';
import {Routes} from '@app/constants/routes';
import {ScreenProps} from '@app/navigation/navigation';
import WText from '@app/utilities/customText';
import handleFirebaseError from '@app/utilities/errorHandling';
import {showToast} from '@app/utilities/toast';
import {Formik} from 'formik';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import * as yup from 'yup';
import {styles} from './login';
import app from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

type SignUpdata = {
  userName: string;
  userEmail: string;
  password: string;
  confirmPassword: string;
};

const initialValues: SignUpdata = {
  userName: '',
  userEmail: '',
  password: '',
  confirmPassword: '',
};

const SignUpScreen = ({navigation}: ScreenProps) => {
  const [usernamePlacHolder, setUsernamePlaceHolder] = useState('username');
  const [userEmailPlacHolder, setUserEmailPlaceHolder] = useState('useremail');
  const [passwordPlacHolder, setPasswordPlaceHolder] = useState('password');
  const [confirmPasswordPlacHolder, setConfirmPasswordPlaceHolder] =
    useState('confirmPassword');
  const [validateChange, setValidateChange] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidConfirmPassword, setisValidConfirmPassword] = useState(false);
  const [displayPassword, setDisplayPassword] = useState(false);
  const [displayConfirmPassword, setdisplayConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const signUpvalidationSchema = yup.object().shape({
    userName: yup
      .string()
      .trim()
      .min(5, ({min}) => `Username must be at least ${min} characters`)
      .required('Username is required'),
    userEmail: yup
      .string()
      .trim()
      .email('Please enter a valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
      .trim()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .trim()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const theme = useTheme();
  const handleSignIn = async (values: SignUpdata) => {
    setIsLoading(true);
    setValidateChange(true);
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        values.userEmail,
        values.password,
      );
      await firestore().collection('Signups').doc('Usernames').set({
        username: values.userName,
      });
      await userCredential.user
        .sendEmailVerification()
        .then(() => {
          userCredential.user.emailVerified === false &&
            showToast({
              text1: 'Success',
              text2:
                'A link has been sent to your email address, kindly activate your account',
              type: 'success',
            });
        })
        .then(() => {
          navigation.navigate('Login');
        });
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
      handleFirebaseError(error);
    }
  };

  return (
    // <View>
    //   <Text>ddddd</Text>
    // </View>
    <Formik
      initialValues={initialValues}
      validateOnBlur
      validateOnChange={validateChange}
      validationSchema={signUpvalidationSchema}
      onSubmit={values => {
        handleSignIn(values);
      }}>
      {({values, handleChange, handleSubmit, errors, isValid}) => (
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
            <WText
              style={{
                fontSize: 30,
                marginBottom: 6,
                fontFamily: Fonts.semiBold,
              }}>
              Hello, create a new wildlife account
            </WText>
            <WText style={{marginBottom: '7%'}}>
              Sign up now! Let’s Learn More About Plants
            </WText>
            <TextFields
              theme={theme}
              onFocused={() => setUsernamePlaceHolder('')}
              placeHolderText={usernamePlacHolder}
              valueText={values.userName}
              labelText="Username"
              callBack={handleChange('userName')}
            />
            {isValid === false && isValidUsername === false && (
              <WText style={{fontSize: 12, color: 'red'}}>
                {errors.userName}
              </WText>
            )}
            <TextFields
              theme={theme}
              onFocused={() => setUserEmailPlaceHolder('')}
              placeHolderText={userEmailPlacHolder}
              valueText={values.userEmail}
              keyboardType="email-address"
              labelText="User email"
              callBack={handleChange('userEmail')}
            />
            {isValid === false && isValidEmail === false && (
              <WText style={{fontSize: 12, color: 'red'}}>
                {errors.userEmail}
              </WText>
            )}
            <TextFields
              theme={theme}
              onFocused={() => setPasswordPlaceHolder('')}
              placeHolderText={passwordPlacHolder}
              valueText={values.userEmail}
              labelText="Password"
              displayPassword={displayPassword}
              callBack={handleChange('password')}
              displayRightIcon
              togglePasswordDisplay={() => setDisplayPassword(!displayPassword)}
            />
            {isValid === false && isValidPassword === false && (
              <WText style={{fontSize: 12, color: 'red'}}>
                {errors.password}
              </WText>
            )}
            <TextFields
              theme={theme}
              onFocused={() => setConfirmPasswordPlaceHolder('')}
              placeHolderText={confirmPasswordPlacHolder}
              valueText={values.confirmPassword}
              labelText="Confirm password"
              callBack={handleChange('confirmPassword')}
              displayRightIcon
              togglePasswordDisplay={() =>
                setdisplayConfirmPassword(!displayConfirmPassword)
              }
              displayPassword={displayConfirmPassword}
            />
            {isValid === false && isValidConfirmPassword === false && (
              <WText style={{fontSize: 12, color: 'red'}}>
                {errors.confirmPassword}
              </WText>
            )}
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <LargeButton
                text={isLoading ? 'Loading...' : 'Sign up'}
                extraStyle={
                  isLoading
                    ? styles.loadingButtonStyle
                    : styles.loginButtonStyle
                }
                onPress={
                  !isLoading
                    ? () => {
                        Keyboard.dismiss();
                        signUpvalidationSchema
                          .validate(values)
                          .then(async () => {
                            setIsValidEmail(true);
                            setIsValidPassword(true);
                            setIsValidUsername(true);
                            setisValidConfirmPassword(true);
                          });
                        handleSubmit();
                      }
                    : () => {}
                }
              />
              <View
                style={{
                  alignItems: 'center',
                  marginTop: '4%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <WText>Have an Account? </WText>
                <TouchableOpacity
                  onPress={() => navigation.navigate(Routes.Login)}
                  activeOpacity={0.9}>
                  <WText style={{color: Colors.primary}}> Login</WText>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      )}
    </Formik>
  );
};
// };

export default SignUpScreen;
