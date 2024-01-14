import {OnboardingStatus, ToggleStatus} from '../types/types';

export const toggleName = (newName: string) => {
  return {
    type: ToggleStatus,
    payload: newName,
  };
};

export const onboardingAction = (status: boolean) => {
  return {
    type: OnboardingStatus,
    status: status,
  };
};
