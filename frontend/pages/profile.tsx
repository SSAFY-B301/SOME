import ProfileModify from "public/icons/ProfileModify.svg";
import Link from "next/link";
import { InfoBar } from "@/components/common/Nav";
import ToggleList from "@/components/pages/profile/ToggleList";
import { useEffect, useState } from "react";
import Alert from "@/components/common/Alert";
import { useRouter } from "next/router";
import { RootState, useAppDispatch } from "@/store";
import { onLogout } from "@/features/authSlice";
import { useSelector } from "react-redux";

export default function MyPage() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const router = useRouter()
    const dispatch = useAppDispatch()

    const {isLogin} = useSelector((state:RootState) => state.auth);

    function onModalClick(){
        setIsModalOpen(!isModalOpen);
    }   

    function onLogout() {
        dispatch(onLogout);
    }

    useEffect(()=>{
        if(!isLogin){
            router.push('/')
        }
    }, [isLogin])

    return(
        <div className="bg-bg-home" style={{ width: "100vw", height: "100vh" }}>
            <InfoBar title="마이페이지"></InfoBar>
            <div className="flex flex-col items-center w-full gap-y-4">
                <div className="flex flex-col p-4 bg-white rounded-lg gap-y-4" style={{width: "89.744vw"}}>
                    <div className="flex justify-between">
                        <p className="text-xl font-bold">기본정보</p>
                        <div className="flex items-end justify-end h-6 w-7">
                            <ProfileModify></ProfileModify>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-10">
                        <img className="w-24 h-24 rounded-full " src="/images/profileImg.png" alt="" />
                        <div className="flex flex-col justify-center items-left">
                            <p className="text-gray-300">닉네임</p>
                            <p className="text-2xl font-bold">최현인</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col p-4 bg-white rounded-lg gap-y-4" style={{width: "89.744vw"}}>
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
                <div className="flex flex-col p-4 bg-white rounded-lg gap-y-4" style={{width: "89.744vw"}}>
                    <p className="text-xl font-bold">알림 설정</p>
                    <ToggleList></ToggleList>
                </div>
                <div className="flex flex-col p-4 bg-white rounded-lg gap-y-4" style={{width: "89.744vw"}}>
                    <p className="text-xl font-bold">계정 설정</p>
                    <button onClick={onModalClick} className="w-full text-left text-red-500">로그아웃</button>
                </div>
            </div>
            {isModalOpen && <Alert msg="정말 로그아웃 하시겠습니까?" yesHandler={onLogout} noHandler={onModalClick}></Alert>}
        </div>
    )
};
