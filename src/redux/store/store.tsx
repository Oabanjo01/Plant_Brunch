import {combineReducers, createStore} from 'redux';
import reducer from '../reducers/reducer';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, reducer),
});

export const store = createStore(rootReducer);
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
