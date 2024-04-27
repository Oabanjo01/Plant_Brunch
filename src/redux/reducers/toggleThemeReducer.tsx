import {REHYDRATE} from 'redux-persist';
import types from '../types';

export type ThemeProperty = {
  isDarkMode: boolean;
};

const initialState: ThemeProperty = {
  isDarkMode: false,
};

const toggleThemeReducer = (
  state: ThemeProperty = initialState,
  {type, payload}: {type: string; payload: any},
) => {
  switch (type) {
    case types.TOGGLE_STATUS:
      return {
        ...state,
        isDarkMode: payload,
      };
    case REHYDRATE:
      return {
        ...state,
        ...payload.theme,
      };

    default:
      return state;
  }
};

export default toggleThemeReducer;
