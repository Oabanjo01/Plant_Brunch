import {REHYDRATE} from 'redux-persist';
import types, {UserData} from '../types';

// NOTE:
// It is important to pass an initial state as default to
// the state parameter to handle the case of calling
// the reducers for the first time when the
// state might be undefined
// Reducers specify how the application state changes in response to actions from the store
// action = {type, payload}
const initialState: UserData = {
  isAuthenticated: false,
  user: null,
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
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: false,
      };
    case types.LOGOUT_FAILURE:
      return {
        ...state,
        isAuthenticated: true,
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case REHYDRATE:
      const incomingState = payload ? payload?.auth : undefined;
      return {
        ...state,
        ...(payload?.auth ?? undefined),
      };
    default:
      return state;
  }
};

export default authReducer;
