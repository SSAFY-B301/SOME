import { getSnsPhoto } from "@/pages/api/photoDetailApi";
import { Dispatch, SetStateAction } from "react";
import { PhotoType } from "@/types/AlbumTypes";
import { useMutationNoti } from "@/pages/api/notiApi";

interface SnsNotiModalParamsType{
    photoId : number | undefined,
    notiId : number | undefined,
    setSnsModalOpen : Dispatch<SetStateAction<boolean>>,
    snsModalOpen : boolean,
}

export default function SnsNotiModal(params : SnsNotiModalParamsType) {
    const {snsResultData} = getSnsPhoto(params.photoId);
    const {snsMutation} = useMutationNoti();

    function snsAcceptHandler(accpetStatus : string) {
        const requestData = {
            status : accpetStatus,
            photo_id : params.photoId,
            noti_id : params.notiId,
        }
        snsMutation(requestData);
        
        //TODO : 앨범 초대에 대한 선택을 했을 때 alert말고 모달 내용을 바꾸는 식으로 컴포넌트 만들기 
        if (accpetStatus === "ACCEPT") {
            alert("SNS 공유 요청을 수락하셨습니다.");
            params.setSnsModalOpen(!params.snsModalOpen);            
        }
        else{
            alert("SNS 공유 요청을 거절하셨습니다.");
            params.setSnsModalOpen(!params.snsModalOpen);            
        }    
    }

    return(
        <div onClick={() => params.setSnsModalOpen(!params.snsModalOpen)} className="absolute top-0 flex items-center justify-center bg-black bg-opacity-40" style={{width: "100vw", height: "100vh"}}>
            <div onClick={(e) => e.stopPropagation()} className="flex flex-col items-center justify-center py-4 bg-white rounded-lg gap-y-2">
                <div className="flex w-full px-4 gap-x-2">
                    {snsResultData === undefined ? 
                        <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
                        :
                        <img className="w-12 h-12 rounded-lg" src={snsResultData.userProfileImg} alt="" />
                    }
                    <div>
                        <p className="text-xl">{snsResultData ? snsResultData.userName : ""}</p>
                        <p className="text-sm">{snsResultData ? snsResultData?.uploadedDate.substring(0,4)+"년 "+
                snsResultData?.uploadedDate.substring(5,7)+"월 "+
                snsResultData?.uploadedDate.substring(8,10)+"일" : ""}</p>
                    </div>
                </div>
                <img src={snsResultData?.s3Url} alt="" />
                <p>SNS 공유를 수락하시겠습니까?</p>
                <div className="flex items-center justify-center gap-x-4">
                    <button onClick={() => snsAcceptHandler("ACCEPT")} className="w-24 rounded-lg shadow">예</button>
                    <button onClick={() => snsAcceptHandler("DECLINE")} className="w-24 rounded-lg shadow">아니오</button>
                </div>
            </div>
        </div>
    )
}