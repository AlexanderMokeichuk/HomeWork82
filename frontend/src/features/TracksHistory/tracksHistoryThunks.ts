import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {TracksHistory, TracksHistoryApi} from "../../type";

export const postTrackHistory = createAsyncThunk<void, TracksHistory>(
  "tracksHistory/postHistory",
  async (history) => {
    try {
      await axiosApi.post("/track_history", {track: history.track, artist: history.artist}, {
        headers: {
          Authorization: `Bearer ${history.token}`,
        }
      });
    } catch (e) {
      console.log(e);
    }
  },
);

export const fetchTrackHistory = createAsyncThunk<TracksHistoryApi[], string>(
  "tracksHistory/fetchTrackHistory",
  async (token) => {
    try {
      const {data: response} = await axiosApi.get("/track_history", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
);