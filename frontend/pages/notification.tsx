// components
import { InfoBar } from "@/components/common/Nav";

// scss
import styles from "@/styles/notification.module.scss"
import { getAlarms } from "./api/notiApi";
import { NotiType } from "@/types/NotiType";
import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";
import SnsNotiModal from "@/components/pages/notification/snsModal";
import InviteModal from "@/components/pages/notification/InviteModal";

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

    function goAlbum() {
        
    }
    
    return(
        <div className="flex flex-col justify-start h-screen bg-white dark:bg-dark-bg-home">
            <InfoBar title="알림"></InfoBar>
            <div className="notiList">
                {resultData !== undefined &&
                    resultData.map((noti : NotiType) => {
                        if (noti.status !== "DONE") {
                            return(
                                <div key={noti.noti_id} onClick={noti.type === "SNS" ? () => snsAlarmHandler({photoId : noti.photo_or_album_id, notiId :  noti.noti_id}) 
                                                                                    : () => inviteModalHandler({albumId : noti.photo_or_album_id, notiId : noti.noti_id})} className={noti.status === "UNCHECKED" ? `py-4 px-6 ${styles.on_read}` : `py-4 px-6`}>
                                    <div className="flex justify-between">
                                        <div className="flex">
                                            {noti.type === "SNS" && <p className={noti.status === "UNCHECKED" ? "text-sm text-gray-600 dark:text-gray-200" :  "text-sm text-gray-300 dark:text-gray-600"}>SNS 공유 요청</p>}
                                            {noti.type === "Invite" && <p className={noti.status === "UNCHECKED" ? "text-sm text-gray-600 dark:text-gray-200" : "text-sm text-gray-300 dark:text-gray-600"}>앨범 초대</p>}
                                        </div>
                                        <p className={noti.status === "UNCKECKED" ? "text-sm text-gray-300 dark:text-gray-600" : "text-sm text-gray-600 dark:text-gray-200" }>시간</p>
                                    </div>
                                    <div className={noti.status === "UNCKECKED" ? "flex justify-between items-center mt-2 text-gray-300 dark:text-gray-600" : "mt-2 flex justify-between text-gray-600 dark:text-gray-200" }>
                                        <div className="flex items-center justify-center h-12">
                                            {noti.type === "SNS" && <p className="text-sm">{noti.sender}님이 SNS에 올리기를 요청했습니다!</p>}
                                            {noti.type === "Invite" && <p className="text-sm">{noti.sender}님이 새로운 앨범에 초대했습니다!</p>}
                                        </div>
                                    </div>
                                </div>
                            )
                        }
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
