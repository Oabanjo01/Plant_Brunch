import {RootStackNavigationProp} from '@app/navigation/navigation';
import {SignUpdata} from '@app/screens/auth/signup';
import handleFirebaseError from '@app/utilities/errorHandling';
import {showToast} from '@app/utilities/toast';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSignIn = async (
    values: SignUpdata,
    navigation: RootStackNavigationProp,
  ) => {
    setIsLoading(true);
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        values.userEmail,
        values.password,
      );
      await firestore().collection('Signups').doc('Usernames').set({
        username: values.userName,
        gender: values.gender,
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
  return {
    setIsLoading,
    handleSignIn,
    isLoading,
  };
};