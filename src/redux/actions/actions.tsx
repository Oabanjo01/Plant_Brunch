import types from '../types';

import {LOGIN, LOGIN_SUCCESS, LOGOUT_SUCCESS} from '../types';

// These functions are action creators, they return an action - {type, payload}

export const toggleName = (newName: string) => {
  return {
    type: types.ToggleStatus, // all actions must have a type
    payload: newName,
  };
};

export const loginAction = (payload: any) => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      user: payload,
    },
  };
};

export const logoutAction = (payload: string) => {
  return {
    type: LOGOUT_SUCCESS,
    status: {},
  };
};

export const onboardingAction = (status: boolean) => {
  return {
    type: types.OnboardingStatus,
    status: status,
  };
};
