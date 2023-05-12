// components
import { InfoBar } from "@/components/common/Nav";
import Alert from "@/components/common/Alert";

// react Hooks, next Hooks
import { useState } from "react";
import { useRouter } from "next/router";

// Axios
import axios from "axios";
import { userQuery } from "./api/userApi";
import { ProfileActivity, ProfileAlarm } from "@/components/pages/profile/ProfileData";

export default function MyPage() {
  const router = useRouter();
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { getUserInfo } = userQuery()

  //모달 창 열고 닫기
  function onModalClick() {
    setIsModalOpen(!isModalOpen);
  }
  
  // 카카오 로그아웃 API 요청
  async function kakaoLogout() {
    await axios.post(`${process.env.NEXT_PUBLIC_KAKAO_API_URL}/v1/user/logout`,{},
    {
        headers : {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("access_token") || "").access_token,
        }
    })
  }

  //로그아웃 로직
  function logout() {
    //카카오 로그아웃
    kakaoLogout();

    //로컬 스토리지 ACCESS_TOKEN 비우기
    window.localStorage.removeItem('access_token');
    
    router.push("/login");
  }

  return (
    <div className="bg-bg-home dark:bg-dark-bg-home" style={{ width: "100vw", height: "100vh" }}>
      <InfoBar title="마이페이지"></InfoBar>
      <div className="flex flex-col items-center w-full gap-y-4">
        <div
          className="flex flex-col p-4 bg-white rounded-lg dark:bg-dark-block gap-y-4"
          style={{ width: "89.744vw" }}
        >
          <div className="flex justify-between">
            <p className="text-xl font-bold">기본정보</p>
          </div>

          <div className="flex items-center gap-x-10">
            {getUserInfo === undefined && 
              <div className="w-24 h-24 rounded-full bg-gray-300"> </div>
            }
            {getUserInfo && 
              <img
              className="w-24 h-24 rounded-full "
              src={getUserInfo ? getUserInfo.user_img : ""}
              alt=""/>
            }
            
            <div className="flex flex-col justify-center items-left">
              <p className="text-gray-300">닉네임</p>
              <p className="text-2xl font-bold">{getUserInfo? getUserInfo.user_name : ""}</p>
            </div>
          </div>
        </div>
        <ProfileActivity></ProfileActivity>
        <ProfileAlarm></ProfileAlarm>
        <div
          className="flex flex-col p-4 bg-white rounded-lg dark:bg-dark-block gap-y-4"
          style={{ width: "89.744vw" }}
        >
          <p className="text-xl font-bold">계정 설정</p>
          
          <button
            onClick={() => router.push(`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code&scope=account_email,profile_image,profile_nickname,friends`)}
            className="w-full text-left"
          >
            동의 항목 재설정
          </button>
          <button
            onClick={onModalClick}
            className="w-full text-left text-red-500"
          >
            로그아웃
          </button>
        </div>
      </div>
      {isModalOpen && (
        <Alert
          msg="정말 로그아웃 하시겠습니까?"
          yesHandler={logout}
          noHandler={onModalClick}
        ></Alert>
      )}
    </div>
  );
}
