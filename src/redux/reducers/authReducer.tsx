import {
  AuthenticationTypes,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
} from '../types';

const initialState: AuthenticationTypes = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (
  state: AuthenticationTypes = initialState,
  {type, payload}: {type: string; payload: AuthenticationTypes},
) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: false,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
};

export default authReducer;
