import { useMutationNoti } from "@/pages/api/notiApi";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

interface InviteNotiModalPropsType{
    albumId : number | undefined,
    notiId : number | undefined,
    setInviteModalOpen : Dispatch<SetStateAction<boolean>>,
    inviteModalOpen : boolean,
}

export default function InviteModal(params : InviteNotiModalPropsType) {
    const { statusMutation, inviteMutation } = useMutationNoti();
    const router = useRouter();
    
    function cancleHandler(){
        const requestData = {
            noti_id : params.notiId,
            noti_status : "CHECKED"
        }
        statusMutation(requestData)
        params.setInviteModalOpen(!params.inviteModalOpen)    
    }
    function inviteHandler(acceptStatus : string) {
        const requestData = {
            status : acceptStatus,
            album_id : params.albumId,
            noti_id : params.notiId,
        }
        inviteMutation(requestData);
        
        //TODO : 앨범 초대에 대한 선택을 했을 때 alert말고 모달 내용을 바꾸는 식으로 컴포넌트 만들기 
        if (acceptStatus === "ACCEPT") {
            alert("앨범 초대를 수락하셨습니다.");
            router.push("/album/"+params.albumId);
        }
        else{
            alert("앨범 초대를 거절하셨습니다.");
            params.setInviteModalOpen(!params.inviteModalOpen);            
        }    
    }

    return(
        <div onClick={() => cancleHandler()} className="absolute top-0 flex items-center justify-center bg-black bg-opacity-40" style={{width: "100vw", height: "100vh"}}>
            <div onClick={(e) => e.stopPropagation()} className="flex flex-col items-center justify-center w-64 bg-white rounded-lg dark:bg-dark-block h-28 gap-y-4">
                <p>앨범에 참여 하시겠습니까?</p>
                <div className="flex items-center justify-center gap-x-4">
                    <button onClick={() => inviteHandler("ACCEPT")} className="w-24 rounded-lg shadow">수락</button>
                    <button onClick={() => inviteHandler("DECLINE")} className="w-24 rounded-lg shadow">거절</button>
                </div>
            </div>
        </div>
    )    
};
