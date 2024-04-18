import Types = module;

export interface ArtistFront {
  name: string,
  image: string | null,
  description: string | null,
}

export interface AlbumFront {
  name: string,
  artist: Types.ObjectId,
  createdAt: string,
  image: string | null,
}

export interface TrackFront {
  name: string,
  album: Types.ObjectId,
  duration: string,
}

export interface ArtistApi extends ArtistFront {
  _id: string
}
export interface AlbumApi extends AlbumFront {
  _id: string,
  artist: ArtistApi,
}