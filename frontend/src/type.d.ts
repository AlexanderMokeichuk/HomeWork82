import {OutletProps} from "react-router-dom";

export interface Album {
  name: string,
  artist: string,
  createdAt: string,
  image: File | null,
}

export interface AlbumApi {
  _id: string,
  name: string,
  artist: string,
  createdAt: number,
  image: string | null,
  isPublished: boolean,
}

export interface Artist {
  name: string,
  image: File | null,
  description: string | null,
}
export interface ArtistsApi {
  _id: string,
  name: string,
  image: string | null,
  description: string | null,
  isPublished: boolean,
}

export interface Track {
  name: string,
  album: string,
  duration: string,
  item: string,
}
export interface TrackApi {
  _id: string,
  name: string,
  album: string,
  duration: string,
  item: number,
  isPublished: boolean,
}

export interface TracksHistory {
  track: string,
  token: string,
  artist: string
}

export interface TracksHistoryApi {
  _id: string,
  user: string,
  datetime: string,
  track: {
    _id: string,
    name: string
  },
  artist: {
    _id: string,
    name: string,
  }
}

export interface InfoAlbum extends AlbumApi<OutletProps, "createdAt", "artist">{
  _id: string,
  name: string,
  artist: ArtistsApi,
  image: string,
}

export interface RegisterMutation {
  email: string;
  password: string;
  avatar: File | null;
  displayName: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}
export interface User {
  _id: string;
  email: string;
  token: string;
  role: string,
  avatar: string | null,
  displayName: string,
  googleID: string | null;
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