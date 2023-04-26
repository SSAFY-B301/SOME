import Link from "next/link";
import CaretLeft from "public/icons/CaretLeft.svg";
import { notiDummy } from "./api/notidummy";
import styles from "@/styles/notification.module.scss"


export default function Notification() {
    return(
        <div className="h-screen bg-white">
            <div className="flex items-center justify-between p-4" style={{width: "89.744vw"}}>
                <Link href={"/"}>
                    <CaretLeft></CaretLeft>
                </Link>
                <p className="text-xl text-center">알림</p>
                <div></div>
            </div>
            <div className="notiList">
                {
                    notiDummy.map((noti) => {
                        return(
                            <div className={noti.isRead ? `p-4 border-b-2` : `p-4 border-b-2 ${styles.on_read}`}>
                                <div className="flex justify-between">
                                    <div className="flex">
                                        <div className="flex items-center">
                                            {noti.status !== 2 && <img className="w-4 h-4 mr-2 rounded-sm " src={noti.albumImg} alt="" />}
                                        </div>
                                        <p className="text-gray-400">{noti.albumName}</p>
                                    </div>
                                    <p className="text-sm text-gray-400">시간</p>
                                </div>
                                <div className={noti.isRead ? "flex justify-between mt-2 text-gray-400" : "flex justify-between mt-2"}>
                                    <div>
                                        {noti.status === 0 && <p>{noti.nickname}님이 새로운 사진을 등록했습니다!</p>}
                                        {noti.status === 1 && <p>{noti.nickname}님이 SNS에 올리기를 요청했습니다!</p>}
                                        {noti.status === 2 && <p>{noti.nickname}님이 새로운 앨범에 초대했습니다!</p>}
                                    </div>
                                    {noti.status !== 2 && <img src={noti.notiImg} alt="" />}
                                    {noti.status === 2 && <img src={noti.albumImg} alt="" />}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};
