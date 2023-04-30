export interface CurrentAlbumType {
  id: number;
  img: string;
  name: string;
  count: number;
}

export interface FavoriteAlbumType {
  id: number;
  img: string;
  name: string;
  createdTime: string;
  isLike: boolean;
}
