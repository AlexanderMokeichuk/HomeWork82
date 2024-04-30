import {OutletProps} from "react-router-dom";

export interface AlbumApi {
  _id: string,
  name: string,
  artist: string,
  createdAt: number,
  image: string | null,
}

export interface ArtistsApi {
  _id: string,
  name: string,
  image: string | null,
  description: string | null,
}

export interface TrackApi {
  _id: string,
  name: string,
  album: string,
  duration: string,
  item: number,
}

export interface InfoAlbum extends AlbumApi<OutletProps, "createdAt", "artist">{
  _id: string,
  name: string,
  artist: ArtistsApi,
  image: string,
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}
export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface RegisterResponse {
  user: User;
  massage: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}