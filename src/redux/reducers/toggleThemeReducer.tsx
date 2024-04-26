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
        currentTheme: payload ?? 'payload',
        initialText: payload ?? 'Welcome',
      };

    default:
      return state;
  }
};

export default toggleThemeReducer;
