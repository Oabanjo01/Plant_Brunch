import {RootStackNavigationProp} from '@app/navigation/navigation';
import handleFirebaseError from '@app/utilities/errorHandling';
import {showToast} from '@app/utilities/toast';
import {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Routes} from '@app/constants/routes';
import {useDispatch} from 'react-redux';
import {loginAction} from '@app/redux/actions/actions';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (
    values: any,
    navigation: RootStackNavigationProp,
  ) => {
    setIsLoading(true);
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        values.email,
        values.password,
      );
      if (userCredential.user.emailVerified === false) {
        setIsLoading(false);
        showToast({
          text1: 'Verify your email',
          text2:
            'A link has been sent to your email address, kindly activate your account before logging in',
          type: 'info',
        });
        return;
      }

      navigation.replace(Routes.Home);
      dispatch(
        loginAction({
          displayName: userCredential.user.displayName,
          email: userCredential.user.email,
          emailVerified: userCredential.user.emailVerified,
          uid: userCredential.user.uid,
        }),
      );
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      handleFirebaseError(error);
    }
  };
  return {
    isLoading,
    setIsLoading,
    handleLogin,
  };
};
