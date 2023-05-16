import { notificationPermission, sendNotification } from "@/features/sse";
import { getMyPageData, useNotiOptionMutation } from "@/pages/api/profileApi";
import { NotiOptionRequestType } from "@/types/UserType";

export default function ToggleList() {
    const { profileData, status } = getMyPageData();
    const { mutate } = useNotiOptionMutation();
    
    function ToggleChange(name : string, agreeState : boolean){
        const requestData : NotiOptionRequestType = {
            type : name,
            is_agree : !agreeState
        }
        mutate(requestData);
        //알림 끄는 설정 접근
    }
    
    return(
        <div className="flex flex-col gap-y-4">
            <div className="flex justify-between">
                <button onClick={() => notificationPermission()}>SOME 푸시 알림 동의</button>
                <button onClick={() => sendNotification("알림제목", "알림내용")}>알림 생성</button>
            </div>
            <div className="flex justify-between">
                <p>공유 투표 알림</p>
                {status === "success" && 
                    <div className="relative inline-block w-10 mr-2 align-middle transition duration-200 ease-in select-none">
                        <input type="checkbox" name="toggleSns" id="toggleSns" onChange={()=> ToggleChange("SNS", profileData.sns_agree)} 
                            className={profileData.sns_agree ? "absolute block w-1/2 h-5/6 m-0.5 bg-white rounded-full appearance-none cursor-pointer transition-all duration-500 translate-x-4" : "absolute block right-0 w-1/2 h-5/6 m-0.5 transition-all -translate-x-4 bg-white rounded-full duration-500 appearance-none cursor-pointer toggle-checkbox"} />
                        <label htmlFor="toggleSns" 
                            className={profileData.sns_agree ? "block h-6 overflow-hidden rounded-full cursor-pointer toggle-label" : "block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer toggle-label"}
                            style={profileData.sns_agree ? {background : "linear-gradient(238.55deg, rgba(244, 114, 182, 0.75) 15.98%, rgba(145, 153, 217, 0.75) 55.85%, rgba(56, 189, 248, 0.75) 84.59%), linear-gradient(134.36deg, #F472B6 15.23%, #9797D7 49.79%, #38BDF8 84.77%)"} : {}}></label>
                    </div>
                }
            </div>
            <div className="flex justify-between">
                <p>앨범 초대 알림</p>
                {status === "success" &&
                    <div className="relative inline-block w-10 mr-2 align-middle transition duration-200 ease-in select-none">
                        <input type="checkbox" name="toggleNew" id="toggleNew" onChange={() => ToggleChange("INVITE", profileData.invite_agree)} 
                            className={profileData.invite_agree ? "absolute block w-1/2 h-5/6 m-0.5 bg-white rounded-full appearance-none cursor-pointer transition-all duration-500 translate-x-4" : "absolute block right-0 w-1/2 h-5/6 m-0.5 transition-all -translate-x-4 bg-white rounded-full duration-500 appearance-none cursor-pointer toggle-checkbox"} />
                        <label htmlFor="toggleNew" 
                            className={profileData.invite_agree ? "block h-6 overflow-hidden rounded-full cursor-pointer toggle-label" : "block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer toggle-label"}
                            style={profileData.invite_agree ? {background : "linear-gradient(238.55deg, rgba(244, 114, 182, 0.75) 15.98%, rgba(145, 153, 217, 0.75) 55.85%, rgba(56, 189, 248, 0.75) 84.59%), linear-gradient(134.36deg, #F472B6 15.23%, #9797D7 49.79%, #38BDF8 84.77%)"} : {}}></label>
                    </div>
                }
            </div>
            <div className="flex justify-between">
                <p>새로운 사진 등록 알림</p>
                {status === "success" &&
                    <div className="relative inline-block w-10 mr-2 align-middle transition duration-200 ease-in select-none">
                        <input type="checkbox" name="toggleNewPhoto" id="toggleNewPhoto" onChange={() => ToggleChange("UPLOAD", profileData.upload_agree)} 
                            className={profileData.upload_agree ? "absolute block w-1/2 h-5/6 m-0.5 bg-white rounded-full appearance-none cursor-pointer transition-all duration-500 translate-x-4" : "absolute block right-0 w-1/2 h-5/6 m-0.5 transition-all -translate-x-4 bg-white rounded-full duration-500 appearance-none cursor-pointer toggle-checkbox"} />
                        <label htmlFor="toggleNewPhoto" 
                            className={profileData.upload_agree ? "block h-6 overflow-hidden rounded-full cursor-pointer toggle-label" : "block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer toggle-label"}
                            style={profileData.upload_agree ? {background : "linear-gradient(238.55deg, rgba(244, 114, 182, 0.75) 15.98%, rgba(145, 153, 217, 0.75) 55.85%, rgba(56, 189, 248, 0.75) 84.59%), linear-gradient(134.36deg, #F472B6 15.23%, #9797D7 49.79%, #38BDF8 84.77%)"} : {}}></label>
                    </div>
                }
            </div>
        </div>
    )
};
