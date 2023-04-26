// Notification 타입 정의
// 프로퍼티 설명
// status : 알림 종류
//      - 0 : 새로운 사진 등록
//      - 1 : SNS 올리기 요청
//      - 2 : 앨범 초대 알림
interface NotificationType {
    notificationId : number,
    albumId : number,
    albumName : string,
    userId : string,
    nickname : string,
    albumImg : string,
    notiImg? : string,
    status : number,
    isRead : boolean,
}

const notiDummy : NotificationType[] = [
    {
        notificationId : 5,
        albumId : 6,
        albumName : "FFF 앨범",
        userId : "0006",
        nickname : "김태영",
        albumImg : "https://placeimg.com/48/48/any",
        status : 2,
        isRead : false,
    },
    {
        notificationId : 4,
        albumId : 5,
        albumName : "EEE 앨범",
        userId : "0004",
        nickname : "박서윤",
        albumImg : "https://placeimg.com/48/48/any",
        status : 2,
        isRead : false,
    },
    {
        notificationId : 3,
        albumId : 4,
        albumName : "DDD 앨범",
        userId : "0003",
        nickname : "차현경",
        albumImg : "https://placeimg.com/48/48/any",
        status : 2,
        isRead : false,
    },
    {
        notificationId : 2,
        albumId : 3,
        albumName : "CCC 앨범",
        userId : "0002",
        nickname : "김동욱",
        albumImg : "https://placeimg.com/48/48/any",
        notiImg : "https://placeimg.com/48/48/any",
        status : 1,
        isRead : true,
    },
    {
        notificationId : 1,
        albumId : 2,
        albumName : "BBB 앨범",
        userId : "0001",
        nickname : "정상민",
        albumImg : "https://placeimg.com/48/48/any",
        notiImg : "https://placeimg.com/48/48/any",
        status : 0,
        isRead : true,
    },
    {
        notificationId : 0,
        albumId : 1,
        albumName : "AAA 앨범",
        userId : "0000",
        nickname : "최현인",
        albumImg : "https://placeimg.com/48/48/any",
        notiImg : "https://placeimg.com/48/48/any",
        status : 0,
        isRead : true,
    },
]

export {notiDummy};