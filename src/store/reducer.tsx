interface UserState {
  currentTheme: string;
}

const initialState: UserState = {
  currentTheme: 'Baj',
};

export default (state = initialState, {type, payload}) => {
  return {
    ...state,
    currentTheme: payload,
  };
};
