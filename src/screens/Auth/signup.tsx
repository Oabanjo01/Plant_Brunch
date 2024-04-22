import {LargeButton} from '@app/components/login/buttons';
import TextFields from '@app/components/login/textInput';
import React, {useState} from 'react';

import {Colors} from '@app/constants/colors';
import {screenWidth} from '@app/constants/dimensions';
import {Fonts} from '@app/constants/fonts';
import {Routes} from '@app/constants/routes';
import {ScreenProps} from '@app/navigation/navigation';
import WText from '@app/utilities/customText';
import {Formik} from 'formik';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as yup from 'yup';
import {styles} from './login';
import {useSignUp} from '@app/utilities/hooks/authentication/useSignUp';

export type SignUpdata = {
  userName: string;
  userEmail: string;
  password: string;
  confirmPassword: string;
  gender: string;
};

const initialValues: SignUpdata = {
  userName: '',
  userEmail: '',
  password: '',
  confirmPassword: '',
  gender: '',
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
    gender: yup.string().required('Gender is required'),
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

  const {handleSignIn, isLoading} = useSignUp();

  const gender = [
    {title: 'Male', icon: 'man-outline'},
    {title: 'Female', icon: 'woman-outline'},
  ];

  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur
      validateOnChange={validateChange}
      validationSchema={signUpvalidationSchema}
      onSubmit={values => {
        setValidateChange(true);
        handleSignIn(values, navigation);
      }}>
      {({
        values,
        handleChange,
        handleSubmit,
        setValues,
        errors,
        isValid,
        setFieldValue,
      }) => (
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
            <SelectDropdown
              data={gender}
              onSelect={(selectedItem, index) => {
                setFieldValue('gender', selectedItem.title);
                setValues(previousValue => ({
                  ...previousValue,
                  gender: selectedItem.title,
                }));
                console.log(values.gender, selectedItem.title, index);
              }}
              renderButton={(selectedItem, isOpened) => {
                return (
                  <>
                    <View style={styles.selectGender}>
                      {selectedItem && (
                        <Ionicons
                          name={selectedItem.icon}
                          size={20}
                          color={Colors.primary}
                        />
                      )}
                      <WText
                        style={{
                          textAlign: 'left',
                        }}>
                        {(selectedItem && selectedItem.title) ||
                          'Select your gender'}
                      </WText>
                      <Ionicons
                        name={isOpened ? 'chevron-up' : 'chevron-down'}
                        size={20}
                        color={Colors.addPhotoButtonColor}
                      />
                    </View>
                    {isValid === false && values.gender === '' && (
                      <WText
                        style={{
                          fontSize: 12,
                          color: 'red',
                          textAlign: 'center',
                        }}>
                        {errors.gender}
                      </WText>
                    )}
                  </>
                );
              }}
              renderItem={(item, index, isSelected) => {
                return (
                  <View
                    style={{
                      ...styles.dropdownSelectedStyle,
                      ...(isSelected && {
                        backgroundColor: Colors.primary,
                      }),
                    }}>
                    <Ionicons
                      name={item.icon}
                      size={22}
                      style={{paddingHorizontal: screenWidth * 0.05}}
                    />
                    <WText style={{flex: 1, fontSize: 16}}>{item.title}</WText>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
              dropdownStyle={{
                backgroundColor: Colors.screenColor,
                paddingHorizontal: 10,
                marginTop: 5,
                paddingVertical: 5,
                borderRadius: 12,
              }}
            />
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
