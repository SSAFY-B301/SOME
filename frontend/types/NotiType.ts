export interface NotiType{
    noti_id : number,
    photo_or_album_id : number,
    sender : string,
    status : string,
    type : string,
}

export interface AlbumInviteRequestType{
    status : string,
    album_id : number | undefined,
    noti_id : number | undefined,
}

export interface SnsRequestType{
    status : string,
    photo_id : number | undefined,
    noti_id : number | undefined,
}

export interface statusChangeRequestType{
    noti_id : number | undefined,
    noti_status : string,
}