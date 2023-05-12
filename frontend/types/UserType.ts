export interface UserInfoType{
    user_id : string,
    user_img: string,
    user_name: string,
}

export interface MyPageDataType{
    accept_album_cnt : number,
    friendgirl_cnt : number,
    invite_agree : boolean,
    sns_agree : boolean,
    upload_agree : boolean
}

export interface NotiOptionRequestType{
    type : string,
    is_agree : boolean
}