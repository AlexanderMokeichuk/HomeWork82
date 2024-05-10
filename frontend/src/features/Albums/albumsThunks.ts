import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {Album, AlbumApi} from "../../type";

export const postAlbum = createAsyncThunk<void, Album>(
  "albums/postAlbums",
  async (album) => {
    const formData = new FormData();

    const keys = Object.keys(album) as (keyof Album)[];
    keys.forEach(key => {
      const value = album[key];
      if (value !== null) formData.append(key, value);
    });

    await axiosApi.post('/albums', formData);
  }
);

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

export const editIsPublishAlbum = createAsyncThunk<void, string>(
  "albums/editAlbum",
  async (id) => {
    try {
      await axiosApi.patch(`/albums/${id}/togglePublished`);
    } catch (e) {
      console.log(e);
    }
  }
);

export const deleteAlbum = createAsyncThunk<void, string>(
  "albums/deleteAlbum",
  async (id) => {
    try {
      await axiosApi.delete(`/albums/${id}`);
    } catch (e) {
      console.log(e);
    }
  }
);