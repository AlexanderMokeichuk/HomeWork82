import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {TracksHistory, TracksHistoryApi} from "../../type";

export const postTrackHistory = createAsyncThunk<void, TracksHistory>(
  "tracksHistory/postHistory",
  async (history) => {
    try {
      await axiosApi.post("/track_history", {track: history.track, artist: history.artist});
    } catch (e) {
      console.log(e);
    }
  },
);

export const fetchTrackHistory = createAsyncThunk<TracksHistoryApi[], undefined>(
  "tracksHistory/fetchTrackHistory",
  async () => {
    try {
      const {data: response} = await axiosApi.get<TracksHistoryApi[]>("/track_history");

      return response;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
);