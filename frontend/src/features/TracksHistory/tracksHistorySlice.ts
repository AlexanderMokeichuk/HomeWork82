import {TracksHistoryApi} from "../../type";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {fetchTrackHistory} from "./tracksHistoryThunks";

interface TracksHistorySlice {
  history: TracksHistoryApi[],
  tracksHistoryLauding: boolean,
}

const initialState: TracksHistorySlice = {
  history: [],
  tracksHistoryLauding: false,
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
  },
});

export const tracksHistoryReducer = tracksHistorySlice.reducer;


export const selectHistory = (state: RootState) => state.tracksHistory.history;
export const selectTracksHistoryLauding = (state: RootState) => state.tracksHistory.tracksHistoryLauding;
