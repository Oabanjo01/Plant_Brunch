import {REHYDRATE} from 'redux-persist';
import types from '../types';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export interface UserDataProps {
  uid: string | null;
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
}

const userData: UserDataProps = {
  displayName: '',
  email: '',
  emailVerified: false,
  uid: '',
};
// It is important to pass an initial state as default to
// the state parameter to handle the case of calling
// the reducers for the first time when the
// state might be undefined
// Reducers specify how the application state changes in response to actions from the store
// action = {type, payload}
type UserData = {
  isAuthenticated: boolean;
  user: UserDataProps;
  rememberUser: boolean;
};
const initialState: UserData = {
  isAuthenticated: false,
  user: userData,
  rememberUser: false,
};

const authReducer = (
  state: UserData = initialState,
  {type, payload}: {type: string; payload: any},
) => {
  switch (type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,
        rememberUser: true,
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: userData,
      };
    case types.LOGOUT_FAILURE:
      return {
        ...state,
        isAuthenticated: true,
        user: userData,
        rememberUser: false,
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: userData,
        rememberUser: false,
        // user: null,
      };
    case types.REMEMBER_ME:
      return {
        ...state,
        rememberUser: payload.rememberUser,
      };
    case REHYDRATE:
      const rehydratedStatus = payload?.auth || initialState;

      return {
        ...state,
        isAuthenticated: rehydratedStatus?.isAuthenticated,
        rememberUser: rehydratedStatus?.rememberUser,
        user: rehydratedStatus?.user,
      };
    default:
      return state;
  }
};

export default authReducer;
