import {combineReducers, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './reducers/authReducer';
import onboardingReducer from './reducers/onboardingReducer';
import toggleThemeReducer from './reducers/toggleThemeReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  onboarding: persistReducer(persistConfig, onboardingReducer),
  theme: persistReducer(persistConfig, toggleThemeReducer),
});

export const store = createStore(rootReducer);
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
console.log('Initial State: ', store.getState());
store.subscribe(() => {
  console.log('New State: ', store.getState());
});
