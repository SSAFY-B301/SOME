// components
import { InfoBar } from "@/components/common/Nav";

// scss
import styles from "@/styles/notification.module.scss"
import { getAlarms } from "./api/notiApi";
import { NotiType } from "@/types/NotiType";
import { useEffect, useState } from "react";
import SnsNotiModal from "@/components/pages/notification/SnsModal";
import InviteModal from "@/components/pages/notification/InviteModal";
import AlarmTime from "@/components/pages/notification/AlarmTime";

interface SnsHandlerParamType{
    photoId : number,
    notiId : number,
}
interface InviteHandlerParamType{
    albumId : number,
    notiId : number,
}

export default function Notification() {
    const { resultData } = getAlarms();
    const [inviteModalOpen, setInviteModalOpen ] = useState<boolean>(false);
    const [snsModalOpen, setSnsModalOpen ] = useState<boolean>(false);
    const [albumId, setAlbumId] = useState<number>();
    const [photoId, setPhotoId] = useState<number>();
    const [notiId, setNotiId] = useState<number>();

    const snsAlarmHandler = (params :SnsHandlerParamType) => {
        setPhotoId(params.photoId);
        setNotiId(params.notiId);
        setSnsModalOpen(!snsModalOpen);
    }
    function inviteModalHandler (params : InviteHandlerParamType) {
        setAlbumId(params.albumId);
        setNotiId(params.notiId);
        setInviteModalOpen(!inviteModalOpen);   
    }

    useEffect(() => {
      return () => {
      }
    }, [resultData])
    
    
    return(
        <div className="flex flex-col justify-start h-screen bg-white dark:bg-dark-bg-home">
            <InfoBar title="알림"></InfoBar>
            <div className="notiList">
                {resultData !== undefined &&
                    resultData.map((noti : NotiType) => {
                        return(
                            <div 
                                key={noti.noti_id} 
                                onClick={noti.type === "SNS" ? () => snsAlarmHandler({photoId : noti.photo_or_album_id, notiId :  noti.noti_id}) 
                                                             : () => inviteModalHandler({albumId : noti.photo_or_album_id, notiId : noti.noti_id})} className={noti.status === "UNCHECKED" ? `py-4 px-6 ${styles.on_read}` : `py-4 px-6 shadow-sm`}>
                                <div className="flex justify-between">
                                    <div className="flex">
                                        {noti.type === "SNS" && <p className={"dark:text-gray-200"}>SNS 공유 요청</p>}
                                        {noti.type === "INVITE" && <p className={"dark:text-gray-200"}>새로운 앨범 초대</p>}
                                    </div>
                                    <div className="flex items-end">
                                        <AlarmTime time={noti.date}></AlarmTime>
                                    </div>
                                </div>
                                <div className={"flex justify-between items-center mt-2 dark:text-gray-200"}>
                                    <div className="flex items-center justify-center h-12">
                                        <p className="text-sm">{noti.message}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {inviteModalOpen && (
                <InviteModal notiId={notiId} albumId={albumId} inviteModalOpen={inviteModalOpen} setInviteModalOpen={setInviteModalOpen}></InviteModal>
            )}
            {snsModalOpen && (
                <SnsNotiModal notiId={notiId} photoId={photoId} snsModalOpen={snsModalOpen} setSnsModalOpen={setSnsModalOpen}></SnsNotiModal>
            )}
        </div>
    )
};
