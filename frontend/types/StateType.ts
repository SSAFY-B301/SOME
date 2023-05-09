import type { UserInfoType } from "@/types/UserType";

export interface StateType {
  auth: LoginStateType;
  photoList: PhotoListType;
}

export interface LoginStateType {
  isLogin: boolean;
  userInfo: UserInfoType;
}

export interface PhotoListType {
  albumId: number;
  categoryId: number;
  userId: Set<number>;
}
