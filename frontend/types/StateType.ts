import type { UserInfoType } from "@/types/UserType";

export interface StateType {
  auth: LoginStateType,
  location: locationStateType,
  albumStatus: AlbumStatusType,
  photoUpload: photoUploadType;
}

export interface locationStateType{
  lat : number,
  lng : number,
}

export interface LoginStateType {
  isLogin: boolean;
  userInfo: UserInfoType;
}

export interface AlbumStatusType {
  albumId: number;
  categoryId: number;
  userId: string[];
}

export interface photoUploadType {
  uploadCount: number;
  isUploading: boolean;
  isPreview: boolean;
  previewLength: number;
  uploadLength: number;
}

export interface GirlListDetailStateType {
  section : number,
  latitude : number,
  longitude : number,
  page : number,
  size : number,
  order : string
}
