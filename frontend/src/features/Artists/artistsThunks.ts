import {createAsyncThunk} from "@reduxjs/toolkit";
import {Artist, ArtistsApi} from "../../type";
import axiosApi from "../../axiosApi";

export const postArtist = createAsyncThunk<void, Artist>(
  "artists/postArtist",
  async (artist) => {
    const formData = new FormData();

    const keys = Object.keys(artist) as (keyof Artist)[];
    keys.forEach(key => {
      const value = artist[key];
      if (value !== null) formData.append(key, value);
    });

    await axiosApi.post('/artists', formData);
  }
);

export const fetchArtists = createAsyncThunk<ArtistsApi[], undefined>(
  "artists/fetchArtists",
  async () => {
    try {
      const {data: response} = await axiosApi.get("/artists");
      return response;
    } catch (e) {
      console.log(e);
      return [];
    }
  },
);
