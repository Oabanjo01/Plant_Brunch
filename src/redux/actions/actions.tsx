import axios from 'axios';
import types from '../types';
import {planDiseasesResponse, speciesListResponse} from '@app/index';

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

export const rememberUserAction = (payload: boolean) => {
  return {
    type: types.REMEMBER_ME,
    payload: {
      rememberUser: payload,
    },
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

export const fetchData = () => {
  return {
    type: types.FETCHING_DATA,
  };
};
export const fetchDataSuccess = (payload: any) => {
  return {
    type: types.FETCHED_DATA_SUCCESS,
    payload: {
      fetchedData: payload,
    },
  };
};
export const fetchDataFailure = (payload: string) => {
  console.log('landed in actions error');
  return {
    type: types.FETCHED_DATA_FAILURE,
    payload: {
      error: payload,
    },
  };
};

export const fetchHomeData = async (dispatch: any, getState: any) => {
  console.log('heeeeee', getState());
  dispatch(fetchData());
  const allResponses = await axios.all([
    speciesListResponse,
    planDiseasesResponse,
  ]);
  const plantList = allResponses[0].data.data;
  const plantDisease = allResponses[1].data.data;
  // console.log(plantDisease, 'action');
  try {
    dispatch(
      fetchDataSuccess({
        plantList: plantList,
        plantDisease: plantDisease,
      }),
    );
    console.log('heeeeee 111', getState());
    return;
  } catch (error) {
    if (typeof error === 'string') {
      dispatch(fetchDataFailure(error));
      return;
    }
    console.log('not an string error', error);
  }
};
