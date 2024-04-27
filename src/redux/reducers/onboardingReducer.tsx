import {REHYDRATE} from 'redux-persist';
import types from '../types';

export type OnboardingData = {
  onboardingStatus: boolean;
};

const initialState: OnboardingData = {
  onboardingStatus: true,
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
    case REHYDRATE:
      return {
        ...state,
        ...payload.onboarding,
      };
    default:
      return state;
  }
};

export default onboardingReducer;
