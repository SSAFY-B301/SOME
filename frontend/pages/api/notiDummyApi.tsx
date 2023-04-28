// Notification 타입 정의
// 프로퍼티 설명
// status : 알림 종류
//      - 1 : SNS 올리기 요청
//      - 2 : 앨범 초대 알림
interface NotificationType {
    notificationId : number,
    albumId : number,
    albumName : string,
    userId : string,
    nickname : string,
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
        status : 2,
        isRead : false,
    },
    {
        notificationId : 4,
        albumId : 5,
        albumName : "EEE 앨범",
        userId : "0004",
        nickname : "박서윤",
        status : 2,
        isRead : false,
    },
    {
        notificationId : 3,
        albumId : 4,
        albumName : "DDD 앨범",
        userId : "0003",
        nickname : "차현경",
        status : 2,
        isRead : false,
    },
    {
        notificationId : 2,
        albumId : 3,
        albumName : "CCC 앨범",
        userId : "0002",
        nickname : "김동욱",
        notiImg : "https://images.unsplash.com/photo-1555169062-013468b47731?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8JUVCJThGJTk5JUVCJUFDJUJDfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        status : 1,
        isRead : true,
    },
]

export {notiDummy};