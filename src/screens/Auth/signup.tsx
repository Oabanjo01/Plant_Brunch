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
import {styles} from './login';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '@app/navigation/navigation';
import {Routes} from '@app/constants/routes';
import {Colors} from '@app/constants/colors';
import {Formik} from 'formik';
import * as yup from 'yup';
import auth from '@react-native-firebase/auth';

type RootStackNavigationProp = NavigationProp<RootStackParamList>;

type Props = {
  navigation: RootStackNavigationProp;
};

const SignUpScreen = ({navigation}: Props) => {
  const [usernamePlacHolder, setUsernamePlaceHolder] = useState('username');
  const [userEmailPlacHolder, setUserEmailPlaceHolder] = useState('useremail');
  const [passwordPlacHolder, setPasswordPlaceHolder] = useState('password');
  const [confirmPasswordPlacHolder, setConfirmPasswordPlaceHolder] =
    useState('confirm-password');
  const [validateChange, setValidateChange] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidConfirmPassword, setisValidConfirmPassword] = useState(false);
  const [displayPassword, setDisplayPassword] = useState(false);

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
  const handleSignIn = () => {
    console.log('Signing in');
    setValidateChange(true);
  };
  return (
    <Formik
      initialValues={{
        userName: '',
        userEmail: '',
        password: '',
        confirmPassword: '',
      }}
      validateOnBlur
      validateOnChange={validateChange}
      validationSchema={signUpvalidationSchema}
      onSubmit={handleSignIn}>
      {({
        values,
        handleChange,
        handleSubmit,
        errors,
        isSubmitting,
        isValid,
        touched,
      }) => (
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
              valueText={values.userName}
              labelText="Username"
              callBack={handleChange('userName')}
            />
            {isValid === false && isValidUsername === false && (
              <Text style={{fontSize: 12, color: 'red'}}>
                {errors.userName}
              </Text>
            )}
            <TextFields
              onFocused={() => setUserEmailPlaceHolder('')}
              placeHolderText={userEmailPlacHolder}
              displayPassword
              valueText={values.userEmail}
              keyboardType="email-address"
              labelText="User email"
              callBack={handleChange('userEmail')}
            />
            {isValid === false && isValidEmail === false && (
              <Text style={{fontSize: 12, color: 'red'}}>
                {errors.userEmail}
              </Text>
            )}
            <TextFields
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
              <Text style={{fontSize: 12, color: 'red'}}>
                {errors.password}
              </Text>
            )}
            <TextFields
              onFocused={() => setConfirmPasswordPlaceHolder('')}
              placeHolderText={confirmPasswordPlacHolder}
              valueText={values.confirmPassword}
              labelText="Confirm password"
              callBack={handleChange('confirmPassword')}
              displayRightIcon
            />
            {isValid === false && isValidConfirmPassword === false && (
              <Text style={{fontSize: 12, color: 'red'}}>
                {errors.confirmPassword}
              </Text>
            )}
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <LargeButton
                text="Sign up"
                extraStyle={styles.loginButtonStyle}
                onPress={() => {
                  signUpvalidationSchema
                    .validate(values)
                    .then(async () => {
                      setIsValidEmail(true);
                      setIsValidPassword(true);
                      setIsValidUsername(true);
                      setisValidConfirmPassword(true);
                      await auth()
                        .createUserWithEmailAndPassword(
                          values.userEmail,
                          values.password,
                        )
                        .then(async userCredential => {
                          await userCredential.user
                            .sendEmailVerification()
                            .then(() => {
                              console.log(userCredential);
                              userCredential.user.emailVerified === false ??
                                console.log('Not verified');
                            });
                        });
                      // .then(() => {
                      //   console.log('User is signed in');
                      // })
                      // .catch(error => {
                      //   console.log('error:', error);
                      // });
                    })
                    .catch(() => {});
                  handleSubmit();
                }}
              />
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
      )}
    </Formik>
  );
};

export default SignUpScreen;
