import types from '../types';

export type OnboardingData = {
  onboardingStatus: boolean;
};

const initialState: OnboardingData = {
  onboardingStatus: false,
};

const onboardingReducer = (
  state: OnboardingData = initialState,
  {type, payload}: {type: string; payload: any},
) => {
  switch (type) {
    case types.ONBOARDING_STATUS:
      return {
        ...state,
        onboardingStatus: payload.onboardingStatus,
      };

    default:
      return state;
  }
};

export default onboardingReducer;
