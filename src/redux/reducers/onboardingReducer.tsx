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
      const newState = {
        ...state,
        onboardingStatus: payload.onboardingStatus,
      };
      return newState;
    case REHYDRATE:
      return {
        ...state,
        ...(payload?.onboarding || undefined),
      };
    default:
      return state;
  }
};

export default onboardingReducer;
