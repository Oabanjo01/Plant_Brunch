import {combineReducers, createStore} from 'redux';
import reducer from './reducers/reducer';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './reducers/authReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  onboarding: persistReducer(persistConfig, reducer),
  auth: persistReducer(persistConfig, authReducer),
});

export const store = createStore(rootReducer);
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
