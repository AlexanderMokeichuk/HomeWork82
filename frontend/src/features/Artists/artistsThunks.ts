import {createAsyncThunk} from "@reduxjs/toolkit";
import {ArtistsApi} from "../../type";
import axiosApi from "../../axiosApi";

export const fetchArtists = createAsyncThunk<ArtistsApi[], undefined>(
  "artists/fetchArtists",
  async () => {
    try {
      const {data: response} = await axiosApi.get("/artists");
      console.log(response);
      return response;
    } catch (e) {
      console.log(e);
      return [];
    }
  },
);