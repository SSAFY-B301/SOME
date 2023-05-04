export interface CurrentAlbumType {
  id: number;
  img: string;
  name: string;
  count: number;
}

export interface FavoriteAlbumType {
  album_id: number;
  thumbnail_photo_url: string;
  album_name: string;
  album_created_date: string;
}

export interface TotalAlbumType {
  album_id: number;
  thumbnail_photo_url: string;
  album_name: string;
  album_created_date: string;
  isAlbumFav: boolean;
}

interface MemberType {
  id: number;
  profile_img_url: string;
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
  userId: string;
}

export interface AlbumInfoType {
  album_id: number;
  album_name: string;
  members: MemberType[];
  isAlbumFav: boolean;
  album_created_date: string;
}

export interface PhotosType {
  totalPhotoCnt: number;
  totalPhotoId: number[];
  albumPhotoList: PhotoType[];
}
export interface PhotoType {
  photoId: number;
  s3Url: string;
  userId: number;
  categoryId: number[];
  uploadedDate: string;
  albumId: number;
}

export interface photosRequest {
  albumId: number;
  categoryId: number;
  userId: number[];
}

export interface requestPartType {
  albumId: number;
  formData: FormData;
}

export interface usePutAlbumNameType {
  album_id: number;
  new_album_name: string;
}
