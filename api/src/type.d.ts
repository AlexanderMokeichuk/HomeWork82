export interface SingerFront {
  name: string,
  image: string | null,
  description?: string,
}

export interface AlbumFront {
  name: string,
  singer: string,
  createdAt: string,
  image: string | null,
}

export interface TrackFront {
  name: string,
  album: string,
  duration: string,
}