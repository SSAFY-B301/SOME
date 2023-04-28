// components
import { InfoBar } from "@/components/common/Nav";
// dummy data
import { notiDummy } from "./api/notiDummyApi";
// scss
import styles from "@/styles/notification.module.scss"

export default function Notification() {
    return(
        <div className="flex flex-col justify-start h-screen bg-white dark:bg-dark-bg-home">
            <InfoBar title="알림"></InfoBar>
            <div className="notiList">
                {
                    notiDummy.map((noti) => {
                        return(
                            <div key={noti.notificationId} className={noti.isRead ? `py-4 px-6` : `py-4 px-6 ${styles.on_read}`}>
                                    
                                <div className="flex justify-between">
                                    <div className="flex">
                                        <p className={noti.isRead ? "text-sm text-gray-300 dark:text-gray-600" : "text-sm text-gray-600 dark:text-gray-200"}>{noti.albumName}</p>
                                    </div>
                                    <p className={noti.isRead ? "text-sm text-gray-300 dark:text-gray-600" : "text-sm text-gray-600 dark:text-gray-200"}>시간</p>
                                </div>
                                <div className={noti.isRead ? "flex justify-between items-center mt-2 text-gray-300 dark:text-gray-600" : "mt-2 flex justify-between text-gray-600 dark:text-gray-200"}>
                                    <div className="flex items-center justify-center h-12">
                                        {noti.status === 1 && <p className="text-sm">{noti.nickname}님이 SNS에 올리기를 요청했습니다!</p>}
                                        {noti.status === 2 && <p className="text-sm">{noti.nickname}님이 {noti.albumName}에 초대했습니다!</p>}
                                    </div>
                                    {noti.status !== 2 && <img className="w-12 h-12 rounded-md" src={noti.notiImg} alt="" />}
                                </div>

                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};
