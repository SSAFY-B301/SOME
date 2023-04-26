import ProfileModify from "public/icons/ProfileModify.svg";
import CaretLeft from "public/icons/CaretLeft.svg";
import Link from "next/link";
import { InfoBar } from "@/components/common/Nav";

export default function MyPage() {
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
                        <div className="flex flex-col ">
                            <p className="text-lg text-gray-300">닉네임</p>
                            <p className="text-2xl">최현인</p>
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
                    <div className="flex justify-between">
                        <p>공유 투표 알림</p>
                        <div className="relative inline-block w-10 mr-2 align-middle transition duration-200 ease-in select-none">
                            <input type="checkbox" name="toggle" id="toggle" className="absolute block w-6 h-6 bg-white border-4 rounded-full appearance-none cursor-pointer toggle-checkbox" />
                            <label htmlFor="toggle" className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer toggle-label"></label>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <p>공유 투표 알림</p>
                        <div className="relative inline-block w-10 mr-2 align-middle transition duration-200 ease-in select-none">
                            <input type="checkbox" name="toggle" id="toggle" className="absolute block w-6 h-6 bg-white border-4 rounded-full appearance-none cursor-pointer toggle-checkbox" />
                            <label htmlFor="toggle" className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer toggle-label"></label>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <p>공유 투표 알림</p>
                        <div className="relative inline-block w-10 mr-2 align-middle transition duration-200 ease-in select-none">
                            <input type="checkbox" name="toggle" id="toggle" className="absolute block w-6 h-6 bg-white border-4 rounded-full appearance-none cursor-pointer toggle-checkbox" />
                            <label htmlFor="toggle" className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer toggle-label"></label>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col p-4 bg-white rounded-lg gap-y-4" style={{width: "89.744vw"}}>
                    <p className="text-xl font-bold">계정 설정</p>
                    <button className="text-red-500">로그아웃</button>
                </div>
            </div>
        </div>
    )
};
