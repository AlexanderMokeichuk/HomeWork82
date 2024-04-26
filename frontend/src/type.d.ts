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