import type { UserInfoType } from "@/types/UserType";

export interface StateType {
  auth: LoginStateType;
  albumStatus: AlbumStatusType;
  photoUpload: photoUploadType;
}

export interface LoginStateType {
  isLogin: boolean;
  userInfo: UserInfoType;
}

export interface AlbumStatusType {
  albumId: number;
  categoryId: number;
  userId: Set<number>;
}

export interface photoUploadType {
  uploadCount: number;
  isUploading: boolean;
  isPreview: boolean;
  previewLength: number;
  uploadLength: number;
}
