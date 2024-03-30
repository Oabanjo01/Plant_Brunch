import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {showToast} from './toast';

const handleFirebaseError = (
  error: FirebaseAuthTypes.NativeFirebaseAuthError,
) => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return showToast({
        text2:
          'Email already in use, check your mail for a reactivation link or login instead',
        text1: 'Error',
        type: 'info',
      });
    case 'auth/invalid-email':
      return showToast({
        text2: 'Email is invalid',
        text1: 'Error',
        type: 'error',
      });
    case 'auth/too-many-requests':
      return showToast({
        text2: 'Chill, too many requests',
        text1: 'Error',
        type: 'error',
      });

    case 'auth/invalid-password':
      return showToast({
        text2: 'Invalid password',
        text1: 'Error',
        type: 'error',
      });
    case 'auth/wrong-password':
      return showToast({
        text2: 'Wrong password',
        text1: 'Error',
        type: 'error',
      });
    case 'auth/invalid-credential':
      return showToast({
        text2: 'Credentials provided are invalid',
        text1: 'Error',
        type: 'error',
      });
    case 'auth/invalid-email-verified':
      return showToast({
        text2: 'Email is not verified',
        text1: 'Error',
        type: 'info',
      });
    case 'auth/user-not-found':
      return showToast({
        text2: 'User not found',
        text1: 'Error',
        type: 'error',
      });
    case 'auth/network-request-failed':
      return showToast({
        text2:
          ' A network error (such as timeout, interrupted connection or unreachable host) has occurred',
        text1: 'Netork error',
        type: 'error',
      });

    default:
      return showToast({
        text2: error.message,
        text1: 'Error',
        type: 'error',
      });
  }
};
export default handleFirebaseError;
