import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux';
import {createLogger} from 'redux-logger';
import {persistReducer, persistStore} from 'redux-persist';
import {thunk} from 'redux-thunk';
import authReducer from './reducers/authReducer';
import onboardingReducer from './reducers/onboardingReducer';
import toggleThemeReducer from './reducers/toggleThemeReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['onboarding', 'theme', 'auth'],
  blacklist: ['fetchData'],
};

export type AuthState = ReturnType<typeof authReducer>;
export type OnboardingState = ReturnType<typeof onboardingReducer>;
export type ThemeState = ReturnType<typeof toggleThemeReducer>;

const reduxlogger = createLogger({});
const middlewares = [thunk, reduxlogger];

const rootReducer = (
  state:
    | {
        auth: AuthState;
        onboarding: OnboardingState;
        theme: ThemeState;
      }
    | undefined,
  action: any,
) => {
  console.log(state);
  const combinedReducers = combineReducers({
    auth: authReducer,
    onboarding: onboardingReducer,
    theme: toggleThemeReducer,
  });

  const rehydratedState:
    | {
        auth: AuthState;
        onboarding: OnboardingState;
        theme: ThemeState;
      }
    | undefined = combinedReducers(state, action);
  return rehydratedState;
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(...middlewares),
);
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;

store.subscribe(() => {});
