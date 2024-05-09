import Types = module;
import {Model} from "mongoose";

export interface ArtistFront {
  name: string,
  image: string | null,
  description: string | null,
  isPublished: boolean,
}

export interface AlbumFront {
  name: string,
  artist: Types.ObjectId,
  createdAt: number,
  image: string | null,
  isPublished: boolean,
}

export interface TrackFront {
  name: string,
  album: Types.ObjectId,
  duration: string,
  item: number,
  isPublished: boolean,
}

export interface User {
  username: string,
  password: string,
  token: string,
  role: string,
}

export interface UserApi extends User {
  _id: Types.ObjectId;
}

export interface TrackHistory {
  user: Types.ObjectId,
  track: Types.ObjectId,
  artist: Types.ObjectId,
  datetime: string,
}

export interface ArtistApi extends ArtistFront {
  _id: string
}

export interface AlbumApi extends AlbumFront {
  _id: string,
}

export interface TrackApi extends TrackFront {
  _id: string,
}

export interface AlbumArtistData extends AlbumApi {
  artist: ArtistApi,
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>,
  generateToken(): void,
}

export type UserModel = Model<User, unknown, UserMethods>;