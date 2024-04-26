import {AlbumApi} from "../../type";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {fetchAlbumsByQuery} from "./albumsThunks";

interface AlbumsSlice {
  albums: AlbumApi[],
  laudingAlbums: boolean,
}

const InitialState: AlbumsSlice = {
  albums: [],
  laudingAlbums: false,
};

const albumsSlice = createSlice({
  name: "albums",
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbumsByQuery.pending, (state) => {
      state.laudingAlbums = true;
    }).addCase(fetchAlbumsByQuery.fulfilled, (state, {payload: albumsApi}: PayloadAction<AlbumApi[]>) => {
      state.albums = albumsApi;
      state.laudingAlbums = false;
    }).addCase(fetchAlbumsByQuery.rejected, (state) => {
      state.laudingAlbums = false;
    });
  },
});

export const albumsReducer = albumsSlice.reducer;

export const selectAlbums = (state: RootState) => state.albums.albums;
export const selectLaudingAlbums = (state: RootState) => state.albums.laudingAlbums;
