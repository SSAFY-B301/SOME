import { getMyPageData } from "@/pages/api/profileApi"
import ToggleList from "./ToggleList"


export function ProfileActivity() {
    
    const { profileData, status } = getMyPageData();

    return(
        <div
        className="flex flex-col p-4 bg-white rounded-lg dark:bg-dark-block gap-y-4"
        style={{ width: "89.744vw" }}
      >
        <p className="text-xl font-bold">활동 이력</p>
        <div className="flex justify-between">
          <p>앨범</p>
          {status === "success" &&
            <p>{profileData.accept_album_cnt}</p>
          }
        </div>
        <div className="flex justify-between">
          <p>떨어뜨린 사진</p>
          {status === "success" &&
            <p>{profileData.friendgirl_cnt}</p>
          }
        </div>
      </div>
    )
}
export function ProfileAlarm() {
    
    return(
        <div
          className="flex flex-col p-4 bg-white rounded-lg dark:bg-dark-block gap-y-4"
          style={{ width: "89.744vw" }}
        >
          <p className="text-xl font-bold">알림 설정</p>
          <ToggleList></ToggleList>
        </div>
    )
}
