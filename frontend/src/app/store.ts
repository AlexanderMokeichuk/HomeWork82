import {configureStore} from "@reduxjs/toolkit";
import {albumsReducer} from "../features/Albums/albumsSlice";
import {artistsReducer} from "../features/Artists/artistsSlice";
import {tracksReducer} from "../features/Tracks/tracksSlice";

export const store = configureStore({
  reducer: {
    artists: artistsReducer,
    albums: albumsReducer,
    tracks: tracksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;