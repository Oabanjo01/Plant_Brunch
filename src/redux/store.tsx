import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, applyMiddleware, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import authReducer from './reducers/authReducer';
import onboardingReducer from './reducers/onboardingReducer';
import toggleThemeReducer from './reducers/toggleThemeReducer';
import logger, {createLogger} from 'redux-logger';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['onboarding', 'theme', 'auth'],
};

export type AuthState = ReturnType<typeof authReducer>;
export type OnboardingState = ReturnType<typeof onboardingReducer>;
export type ThemeState = ReturnType<typeof toggleThemeReducer>;

const reduxlogger = createLogger({});
const rootReducer = (
  state:
    | {auth: AuthState; onboarding: OnboardingState; theme: ThemeState}
    | undefined,
  action: any,
) => {
  const combinedReducers = combineReducers({
    auth: authReducer,
    onboarding: onboardingReducer,
    theme: toggleThemeReducer,
  });

  const rehydratedState:
    | {auth: AuthState; onboarding: OnboardingState; theme: ThemeState}
    | undefined = combinedReducers(state, action);
  return rehydratedState;
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(
  persistedReducer,
  applyMiddleware(reduxlogger),
);
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
store.subscribe(() => {});
