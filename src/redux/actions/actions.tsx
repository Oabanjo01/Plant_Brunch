import types from '../types';

// These functions are action creators, they return an action - {type, payload}
// action creators, functions returning an action. An action is an object with a type property

export const toggleName = (newName: string) => {
  return {
    type: types.TOGGLE_STATUS, // all actions must have a type
    payload: newName,
  };
};

export const loginAction = (payload: any) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: {
      user: payload,
    },
  };
};

export const logoutAction = () => {
  return {
    type: types.LOGOUT_SUCCESS,
  };
};

export const onboardingAction = (payload: boolean) => {
  return {
    type: types.ONBOARDING_STATUS,
    payload: {
      onboardingStatus: payload,
    },
  };
};
