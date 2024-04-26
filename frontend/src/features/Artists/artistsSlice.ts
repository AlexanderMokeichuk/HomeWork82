import {ArtistsApi} from "../../type";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {fetchArtists} from "./artistsThunks";

interface ArtistsSlice {
  artists: ArtistsApi[],
  laudingArtists: boolean,
}

const InitialState: ArtistsSlice = {
  artists: [],
  laudingArtists: false,
};

const artistSlice = createSlice({
  name: "artist",
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArtists.fulfilled, (state, {payload: artistsApi}: PayloadAction<ArtistsApi[]>) => {
      state.artists = artistsApi;
    });
  },
});

export const artistsReducer = artistSlice.reducer;

export const selectArtists = (state: RootState) => state.artists.artists;
export const selectLaudingArtists = (state: RootState) => state.artists.laudingArtists;