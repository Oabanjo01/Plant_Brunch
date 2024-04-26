import types from '../types';

// NOTE:
// It is important to pass an initial state as default to
// the state parameter to handle the case of calling
// the reducers for the first time when the
// state might be undefined
interface OnboardingState {
  status: boolean;
}

const initialState: OnboardingState = {
  status: false,
};

export default (
  state = initialState,
  {type, payload}: {type: string; payload: OnboardingState},
) => {
  switch (type) {
    case types.ToggleStatus:
      return {
        ...state,
        currentTheme: payload ?? 'payload',
        initialText: payload ?? 'Welcome',
      };
    case types.OnboardingStatus:
      return {
        ...state,
        status: payload.status ?? true,
      };
    default:
      return state;
  }
};
