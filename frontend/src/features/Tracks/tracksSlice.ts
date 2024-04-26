import {InfoAlbum, TrackApi} from "../../type";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {fetchAlbumById, fetchTracksFromAlbum} from "./tracksThinks";

interface TracksSlice {
  fullInfoAlbum: InfoAlbum | null,
  tracks: TrackApi[],
  laudingFullInfo: boolean,
  laudingTracks: boolean,
}

const InitialState: TracksSlice = {
  fullInfoAlbum: null,
  tracks: [],
  laudingFullInfo: false,
  laudingTracks: false,
};

const tracksSlice = createSlice({
  name: "tracks",
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbumById.pending, (state) => {
      state.laudingFullInfo = true;
    }).addCase(fetchAlbumById.fulfilled, (state, {payload: infAlbum}: PayloadAction<InfoAlbum | null>) => {
      state.fullInfoAlbum = infAlbum;
      state.laudingFullInfo = false;
    }).addCase(fetchAlbumById.rejected, (state) => {
      state.laudingFullInfo = false;
    });

    builder.addCase(fetchTracksFromAlbum.fulfilled, (state, {payload: traks}: PayloadAction<TrackApi[]>) => {
      state.tracks = traks;
      state.laudingTracks = false;
    });
  },
});

export const tracksReducer = tracksSlice.reducer;

export const selectFullInfoAlbum = (state: RootState) => state.tracks.fullInfoAlbum;
export const selectTracks = (state: RootState) => state.tracks.tracks;
export const selectLaudingFullInfo = (state: RootState) => state.tracks.laudingFullInfo;
export const selectLaudingTracks = (state: RootState) => state.tracks.laudingTracks;
