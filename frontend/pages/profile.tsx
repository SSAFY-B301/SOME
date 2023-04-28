// components
import { InfoBar } from "@/components/common/Nav";
import Alert from "@/components/common/Alert";
import ToggleList from "@/components/pages/profile/ToggleList";

// react Hooks, next Hooks
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// svg 아이콘
import ProfileModify from "public/icons/ProfileModify.svg";

// Redux 관련
import { RootState, useAppDispatch } from "@/store";
import { useSelector } from "react-redux";
import { onLogout } from "@/features/authSlice";

// Axios
import axios from "axios";

export default function MyPage() {
    const router = useRouter();
    
    const dispatch = useAppDispatch();
    const { isLogin, userInfo } = useSelector((state: RootState) => state.auth);
    
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
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
            "Authorization" : "Bearer " + userInfo.access_token,
        }
    })
  }

  //로그아웃 로직
  function logout() {
    //카카오 로그아웃
    kakaoLogout();
    
    //리덕스 초기화
    dispatch(onLogout());
  }

  // 로그아웃 시 리덕스 값이 바뀌었을 때 페이지 이동
  useEffect(() => {
    if (!isLogin) {
      router.push("/");
    }
  }, [isLogin]);

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
            <div className="flex items-end justify-end h-6 w-7">
              <ProfileModify></ProfileModify>
            </div>
          </div>
          <div className="flex items-center gap-x-10">
            <img
              className="w-24 h-24 rounded-full "
              src={userInfo.user_img}
              alt=""
            />
            <div className="flex flex-col justify-center items-left">
              <p className="text-gray-300">닉네임</p>
              <p className="text-2xl font-bold">{userInfo.user_name}</p>
            </div>
          </div>
        </div>
        <div
          className="flex flex-col p-4 bg-white rounded-lg dark:bg-dark-block gap-y-4"
          style={{ width: "89.744vw" }}
        >
          <p className="text-xl font-bold">활동 이력</p>
          <div className="flex justify-between">
            <p>앨범</p>
            <p>30</p>
          </div>
          <div className="flex justify-between">
            <p>떨어뜨린 사진</p>
            <p>12</p>
          </div>
        </div>
        <div
          className="flex flex-col p-4 bg-white rounded-lg dark:bg-dark-block gap-y-4"
          style={{ width: "89.744vw" }}
        >
          <p className="text-xl font-bold">알림 설정</p>
          <ToggleList></ToggleList>
        </div>
        <div
          className="flex flex-col p-4 bg-white rounded-lg dark:bg-dark-block gap-y-4"
          style={{ width: "89.744vw" }}
        >
          <p className="text-xl font-bold">계정 설정</p>
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
