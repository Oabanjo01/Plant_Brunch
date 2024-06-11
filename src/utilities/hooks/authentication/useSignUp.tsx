import {RootStackNavigationProp} from '@app/navigation/navigation';
import {SignUpdata} from '@app/screens/auth/signup';
import handleFirebaseError from '@app/utilities/errorHandling';
import {showToast} from '@app/utilities/toast';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';

export const db = firestore();

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
      await userCredential.user.updateProfile({
        displayName: values.userName,
      });
      await db
        .collection('Signups')
        .doc('Usernames')
        .collection(values.userEmail)
        .doc(userCredential.user.uid)
        .set({
          username: values.userName,
          userEmail: values.userEmail,
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
