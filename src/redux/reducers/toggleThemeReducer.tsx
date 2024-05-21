import {REHYDRATE} from 'redux-persist';
import types from '../types';

export type ThemeData = {
  theme: 'lightTheme' | 'darkTheme';
};

const initialState: ThemeData = {
  theme: 'lightTheme',
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
      console.log('rehydrate Theme', payload?.theme, payload, state);
      const rehydratedTheme = payload?.theme || 'lightTheme';
      return {...state, theme: rehydratedTheme.theme};
    default:
      return state;
  }
};

export default toggleThemeReducer;
