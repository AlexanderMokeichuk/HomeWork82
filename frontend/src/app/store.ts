import storage from "redux-persist/lib/storage";
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from "redux-persist";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {albumsReducer} from "../features/Albums/albumsSlice";
import {artistsReducer} from "../features/Artists/artistsSlice";
import {tracksReducer} from "../features/Tracks/tracksSlice";
import {usersReducer} from "../features/Users/usersSlice";
import {tracksHistoryReducer} from "../features/TracksHistory/tracksHistorySlice";


const userPersistConfig = {
  key: 'store:users',
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  artists: artistsReducer,
  albums: albumsReducer,
  tracks: tracksReducer,
  users: persistReducer(userPersistConfig, usersReducer),
  tracksHistory: tracksHistoryReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;