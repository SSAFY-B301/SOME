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

export interface TotalAlbumType {
  id: number;
  img: string;
  name: string;
  createdTime: string;
  isLike: boolean;
}

export interface AlbumInfoType {
  id: number;
  name: string;
  members: MemberType[];
  categories: number[];
  totalId: number[];
  total: number;
  isLike: boolean;
  createdTime: string;
}

interface MemberType {
  id: number;
  name: string;
  img: string;
}

export interface PhotoType {
  id: number;
  img: string;
  user: number;
  category: number;
  createdTime: string;
}

export interface previewPhotoType {
  id: number;
  img: string;
}

// TODO : API 명세서 보고 Type 만들기
/**
 * [GET] 사진 정보
 * @returns
 */
export interface requestPhotosType {
  albumId: number;
  categoryId: number;
  userId: number[];
}
