export interface UserResultType{
    access_token : string,
    user_info : UserInfoType,
}

export interface UserInfoType{
    user_id : string,
    user_img: string,
    user_name: string,
}