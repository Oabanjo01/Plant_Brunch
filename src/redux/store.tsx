import {combineReducers, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './reducers/authReducer';
import onboardingReducer from './reducers/onboardingReducer';
import toggleThemeReducer from './reducers/toggleThemeReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['onboarding', 'theme', 'auth'],
};

const rootReducer = (state, action) => {
  const combinedReducers = combineReducers({
    auth: authReducer,
    onboarding: onboardingReducer,
    theme: toggleThemeReducer,
  });

  const rehydratedState = combinedReducers(state, action);
  return rehydratedState;
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
// console.log('Initial State: ', store.getState());
store.subscribe(() => {
  console.log('New State: ', store.getState());
});
