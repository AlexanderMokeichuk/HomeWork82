import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {AlbumApi} from "../../type";

export const fetchAlbumsByQuery = createAsyncThunk<AlbumApi[], string>(
  "albums/fetchAlbums",
  async (id) => {
    try {
      const {data: response} = await axiosApi.get<AlbumApi[]>(`/albums?artist=${id}`);

      return response;
    } catch (e) {
      console.log(e);
      return [];
    }
  },
);