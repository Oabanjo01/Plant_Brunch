import types from '../types';

export type FetchedDataType = {
  plantList: [];
  plantDisease: [];
  isLoading: boolean;
  error: '';
};
const initialState: FetchedDataType = {
  plantList: [],
  plantDisease: [],
  isLoading: false,
  error: '',
};

const fetchedDataReducer = (
  state: FetchedDataType = initialState,
  {type, payload}: {type: string; payload: any},
) => {
  switch (type) {
    case types.FETCHING_DATA:
      return {
        ...state,
        plantList: [],
        plantDisease: [],
        isLoading: true,
      };
    case types.FETCHED_DATA_SUCCESS:
      return {
        ...state,
        plantList: [...payload.fetchedData.plantList],
        plantDisease: [...payload.fetchedData.plantDisease],
        isLoading: false,
      };
    case types.FETCHED_DATA_FAILURE:
      return {
        ...state,
        plantList: [],
        plantDisease: [],
        error: payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default fetchedDataReducer;
