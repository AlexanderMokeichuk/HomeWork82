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