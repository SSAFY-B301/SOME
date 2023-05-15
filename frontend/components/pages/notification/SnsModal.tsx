import { getSnsPhoto } from "@/pages/api/photoDetailApi";
import { Dispatch, SetStateAction } from "react";
import { PhotoType } from "@/types/AlbumTypes";
import { useMutationNoti } from "@/pages/api/notiApi";
import { NotiType } from "@/types/NotiType";

interface SnsNotiModalParamsType{
    notiInfo : NotiType | undefined
    setSnsModalOpen : Dispatch<SetStateAction<boolean>>,
    snsModalOpen : boolean,
}

export default function SnsNotiModal(params : SnsNotiModalParamsType) {
    const {snsResultData, snsPhotoStatus} = getSnsPhoto(params.notiInfo?.photo_or_album_id);
    const {statusMutation, snsMutation} = useMutationNoti();

    function exitHandler() {
        const requestData = {
            noti_id : params.notiInfo?.noti_id,
            noti_status : "CHECKED"
        }
        statusMutation(requestData)
        params.setSnsModalOpen(!params.snsModalOpen)
    }

    function snsAcceptHandler(accpetStatus : string) {
        const requestData = {
            status : accpetStatus,
            photo_id : params.notiInfo?.photo_or_album_id,
            noti_id : params.notiInfo?.noti_id,
        }
        snsMutation(requestData);
        
        //TODO : 앨범 초대에 대한 선택을 했을 때 alert말고 모달 내용을 바꾸는 식으로 컴포넌트 만들기 
        if (accpetStatus === "ACCEPT") {
            params.setSnsModalOpen(!params.snsModalOpen);            
            alert("SNS 공유 요청을 수락하셨습니다.");
        }
        else{
            params.setSnsModalOpen(!params.snsModalOpen);            
            alert("SNS 공유 요청을 거절하셨습니다.");
        }    
    }
    if (snsPhotoStatus === "success") {
        return(
            <div onClick={() => exitHandler()} className="absolute top-0 flex items-center justify-center bg-black bg-opacity-40" style={{width: "100vw", height: "100vh"}}>
                <div onClick={(e) => e.stopPropagation()} className="flex flex-col items-center justify-center py-4 bg-white rounded-lg dark:bg-dark-block gap-y-4">
                    <div className="flex w-full px-4 gap-x-4">
                        {snsResultData.thumbnailPhotoUrl === null ? 
                            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                            :
                            <img className="w-8 h-8 rounded-full" src={snsResultData.thumbnailPhotoUrl} alt="" />
                        }
                        <p className="text-xl">{snsResultData ? snsResultData.albumName : ""}</p>
                    </div>
                    <div style={{maxWidth : "80vw", maxHeight : "70vh" }}>
                        <img style={{maxWidth : "80vw", maxHeight : "70vh"}} loading="lazy" src={snsResultData.s3Url} alt="" />
                    </div>
                    <p>SNS 공유를 수락하시겠습니까?</p>
                    <div className="flex items-center justify-center gap-x-4">
                        <button onClick={() => snsAcceptHandler("ACCEPT")} className="w-24 rounded-lg shadow dark:bg-dark-block">예</button>
                        <button onClick={() => snsAcceptHandler("DECLINE")} className="w-24 rounded-lg shadow dark:bg-dark-block">아니오</button>
                    </div>
                </div>
            </div> 
        )        
    }
    else{
        return(
            <div onClick={() => exitHandler()} className="absolute top-0 flex items-center justify-center bg-black bg-opacity-40" style={{width: "100vw", height: "100vh"}}>
                <div onClick={(e) => e.stopPropagation()} className="flex flex-col items-center justify-center py-4 bg-white rounded-lg dark:bg-dark-block gap-y-2">
                    <p>로딩 중</p>
                </div>
            </div>
        )
    }
}