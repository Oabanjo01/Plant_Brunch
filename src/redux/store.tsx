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

const rootReducer = (state: any, action: any) => {
  if (action.type === 'REHYDRATE' && action.payload === undefined) {
    // If there is no persisted state, return the combined reducers with the initial state
    console.log(action.payload, 'restarted app');
    return combineReducers({
      auth: authReducer,
      onboarding: onboardingReducer,
      theme: toggleThemeReducer,
    })(undefined, action);
  }
  console.log(action.payload, 'persisted');
  // If there is persisted state, use the persisted reducers
  return combineReducers({
    auth: persistReducer(persistConfig, authReducer),
    onboarding: persistReducer(persistConfig, onboardingReducer),
    theme: persistReducer(persistConfig, toggleThemeReducer),
  })(state, action);
};

export const store = createStore(rootReducer);
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
console.log('Initial State: ', store.getState());
store.subscribe(() => {
  console.log('New State: ', store.getState());
});
