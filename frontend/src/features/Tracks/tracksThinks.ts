import {createAsyncThunk} from "@reduxjs/toolkit";
import {InfoAlbum, TrackApi} from "../../type";
import axiosApi from "../../axiosApi";

export const fetchAlbumById = createAsyncThunk<InfoAlbum | null, string>(
  "tracks/fetchAlbumById",
  async (id) => {
    try {
      const {data: response} = await axiosApi.get(`albums/${id}`);
      return response;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
);

export const fetchTracksFromAlbum = createAsyncThunk<TrackApi[], string>(
  "tracks/fetchTracksFromAlbum",
  async (id) => {
    try {
      const {data: response} = await axiosApi.get<TrackApi[]>(`/tracks?album=${id}`);
      return response;
    } catch (e) {
      console.log(e);
      return [];
    }
  },
);