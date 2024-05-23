import {REHYDRATE} from 'redux-persist';
import types from '../types';

export type ThemeData = {
  theme: 'light' | 'dark';
};

const initialState: ThemeData = {
  theme: 'light',
};

// type ThemeData = keyof ThemeData;

const toggleThemeReducer = (
  state: ThemeData = initialState,
  {type, payload}: {type: string; payload: any},
) => {
  switch (type) {
    case types.TOGGLE_STATUS:
      return {...state, theme: payload};
    case REHYDRATE:
      console.log(payload, 'payload', state, 'state');
      const rehydratedTheme = payload?.theme || initialState;
      return {...state, theme: rehydratedTheme?.theme};
    default:
      return state;
  }
};

export default toggleThemeReducer;
