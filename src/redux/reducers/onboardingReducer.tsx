import {REHYDRATE} from 'redux-persist';
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
      const newState: OnboardingData = {
        ...state,
        onboardingStatus: payload,
      };
      return newState;
    case REHYDRATE:
      const rehydratedStatus = payload?.onboarding?.onboardingStatus || false;
      return {
        ...state,
        onboardingStatus: rehydratedStatus,
      };
    default:
      return state;
  }
};

export default onboardingReducer;
