import {TracksHistoryApi} from "../../type";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {fetchTrackHistory, postTrackHistory} from "./tracksHistoryThunks";

interface TracksHistorySlice {
  history: TracksHistoryApi[],
  tracksHistoryLauding: boolean,
  laudingButton: boolean,
}

const initialState: TracksHistorySlice = {
  history: [],
  tracksHistoryLauding: false,
  laudingButton: false,
};

const tracksHistorySlice = createSlice({
  name: "tracksHistory",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTrackHistory.pending, (state) => {
      state.tracksHistoryLauding = true;
    }).addCase(fetchTrackHistory.fulfilled, (state, {payload: tracks}: PayloadAction<TracksHistoryApi[]>) => {
      state.history = tracks;
      state.tracksHistoryLauding = false;
    }).addCase(fetchTrackHistory.rejected, (state) => {
      state.tracksHistoryLauding = false;
    });

    builder.addCase(postTrackHistory.pending, (state) => {
      state.laudingButton = true;
    }).addCase(postTrackHistory.fulfilled, (state) => {
      state.laudingButton = false;
    }).addCase(postTrackHistory.rejected, (state) => {
      state.laudingButton = false;
    });
  },
});

export const tracksHistoryReducer = tracksHistorySlice.reducer;


export const selectHistory = (state: RootState) => state.tracksHistory.history;
export const selectLaudingButton = (state: RootState) => state.tracksHistory.laudingButton;

export const selectTracksHistoryLauding = (state: RootState) => state.tracksHistory.tracksHistoryLauding;
