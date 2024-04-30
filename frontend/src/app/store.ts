import {configureStore} from "@reduxjs/toolkit";
import {albumsReducer} from "../features/Albums/albumsSlice";
import {artistsReducer} from "../features/Artists/artistsSlice";
import {tracksReducer} from "../features/Tracks/tracksSlice";
import {usersReducer} from "../features/Users/usersSlice";

export const store = configureStore({
  reducer: {
    artists: artistsReducer,
    albums: albumsReducer,
    tracks: tracksReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;