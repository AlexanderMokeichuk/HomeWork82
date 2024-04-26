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