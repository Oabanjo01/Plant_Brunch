import {OnboardingStatus, ToggleStatus} from '../types';

import {LOGIN, LOGIN_SUCCESS, LOGOUT_SUCCESS} from '../types';

// These functions are action creators, they return an action - {type, payload}

export const toggleName = (newName: string) => {
  return {
    type: ToggleStatus, // all actions must have a type
    payload: newName,
  };
};

export const LoginAction = (payload: any) => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      user: payload,
    },
  };
};

export const LogoutAction = (payload: string) => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const onboardingAction = (status: boolean) => {
  return {
    type: OnboardingStatus,
    status: status,
  };
};
