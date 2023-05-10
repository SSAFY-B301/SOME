// 라이브러리
import React, { useEffect, useState } from "react";

// 컴포넌트
import NavBar from "@/components/common/Nav";
import TabBar from "@/components/common/TabBar";

// CSS
import homeStyles from "@/styles/home.module.scss";
import girlStyles from "@/styles/girl.module.scss";

import {CustomOverlayMap, Map} from "react-kakao-maps-sdk";
import { userQuery } from "../api/userApi";

import { girlDummy } from "../api/girtDummyApi";
import { useRouter } from "next/router";

interface LocationType{
  lat : number,
  lng : number,
}

export default function Home() {
  const [userLocation, setUserLocation] = useState<LocationType>({lat : 33.5563, lng : 126.79581 });
  const {getUserInfo} = userQuery();
  const router = useRouter()

  function locationPermissionSuccess(position : GeolocationPosition){
    setUserLocation({lat : position.coords.latitude, lng : position.coords.longitude})
  }
  function locationPermissionError(){
    alert("위치 정보 권한 설정을 확인해주세요!");
  }
  useEffect(() => {
    //https 요청 시에만 GeoLocation 정보를 받아올 수 있다.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(locationPermissionSuccess, locationPermissionError);
    }
  },[])
  
  return (
    <div
      className={`bg-bg-home dark:bg-dark-bg-home relative touch-none ${homeStyles.no_scroll}`}
      style={{ width: "100vw", height: "100vh" }}
    >
      <NavBar />
      <Map
        className="z-0"
        center={{lat : userLocation.lat, lng:userLocation.lng}}
        style={{width : "100vw", height:"90vh"}}
        level={1}
      >
        <CustomOverlayMap key={0} position={{lat : userLocation.lat, lng:userLocation.lng}}>
          <div className="relative w-52 h-52">
            <div className={`absolute w-52 h-52 rounded-full ${girlStyles.loader_back} ${girlStyles.loader_animation} ${girlStyles.loader}`}></div>
            <div className={`top-20 left-20 z-10 absolute w-12 h-12 bg-center bg-cover rounded-full ${girlStyles.inner}`} style={{backgroundImage : `url(${getUserInfo ? getUserInfo.user_img : ""})`}}></div>
          </div>
        </CustomOverlayMap>
        <CustomOverlayMap key={1} position={{lat : userLocation.lat+0.0005, lng:userLocation.lng+0.00037}}>
          <div onClick={()=>router.push("/girl-home/list")} className="relative w-24 h-24 bg-white rounded-lg shadow-md">
            <div style={{background : "linear-gradient(238.55deg, rgba(244, 114, 182, 0.75) 15.98%, rgba(145, 153, 217, 0.75) 55.85%, rgba(56, 189, 248, 0.75) 84.59%), linear-gradient(134.36deg, #F472B6 15.23%, #9797D7 49.79%, #38BDF8 84.77%)"}} className="absolute flex items-center justify-center w-6 h-6 bg-red-500 rounded-full -right-2 -top-2">
              <p className="text-xs text-white">{girlDummy[0].count}</p>
            </div>
            <div className="flex flex-col h-full p-1.5 gap-y-1">
              <div className="flex items-center justify-center gap-x-0.5">
                <img className="w-10 h-10 rounded-sm" src={girlDummy[0].imgList[0]} alt="" />
                <img className="w-10 h-10 rounded-sm" src={girlDummy[0].imgList[1]} alt="" />
              </div>
              <div className="flex items-center justify-center gap-x-0.5">
                <img className="w-10 h-10 rounded-sm" src={girlDummy[0].imgList[2]} alt="" />
                <img className="w-10 h-10 rounded-sm" src={girlDummy[0].imgList[3]} alt="" />
              </div>
            </div>
          </div>
        </CustomOverlayMap>
        <CustomOverlayMap key={2} position={{lat : userLocation.lat+0.0003, lng:userLocation.lng-0.0002}}>
        <div className="relative w-24 h-24 bg-white rounded-lg shadow-md">
            <div style={{background : "linear-gradient(238.55deg, rgba(244, 114, 182, 0.75) 15.98%, rgba(145, 153, 217, 0.75) 55.85%, rgba(56, 189, 248, 0.75) 84.59%), linear-gradient(134.36deg, #F472B6 15.23%, #9797D7 49.79%, #38BDF8 84.77%)"}} className="absolute flex items-center justify-center w-6 h-6 bg-red-500 rounded-full -right-2 -top-2">
              <p className="text-xs text-white">{girlDummy[1].count}</p>
            </div>
            <div className="flex flex-col h-full p-1.5 gap-y-1">
              <div className="flex items-center justify-center gap-x-0.5">
                <img className="w-10 h-10 rounded-sm" src={girlDummy[1].imgList[0]} alt="" />
                <img className="w-10 h-10 rounded-sm" src={girlDummy[1].imgList[1]} alt="" />
              </div>
              <div className="flex items-center justify-center gap-x-0.5">
                <img className="w-10 h-10 rounded-sm" src={girlDummy[1].imgList[2]} alt="" />
                <img className="w-10 h-10 rounded-sm" src={girlDummy[1].imgList[3]} alt="" />
              </div>
            </div>
          </div>
        </CustomOverlayMap>
        <CustomOverlayMap key={3} position={{lat : userLocation.lat-0.00034, lng:userLocation.lng+0.00032}}>
          <div className="relative w-24 h-24 bg-white rounded-lg shadow-md">
            <div style={{background : "linear-gradient(238.55deg, rgba(244, 114, 182, 0.75) 15.98%, rgba(145, 153, 217, 0.75) 55.85%, rgba(56, 189, 248, 0.75) 84.59%), linear-gradient(134.36deg, #F472B6 15.23%, #9797D7 49.79%, #38BDF8 84.77%)"}} className="absolute flex items-center justify-center w-6 h-6 bg-red-500 rounded-full -right-2 -top-2">
              <p className="text-xs text-white">{girlDummy[2].count}</p>
            </div>
            <div className="flex flex-col h-full p-1.5 gap-y-1">
              <div className="flex items-center justify-center gap-x-0.5">
                <img className="w-10 h-10 rounded-sm" src={girlDummy[2].imgList[0]} alt="" />
                <img className="w-10 h-10 rounded-sm" src={girlDummy[2].imgList[1]} alt="" />
              </div>
              <div className="flex items-center justify-center gap-x-0.5">
                <img className="w-10 h-10 rounded-sm" src={girlDummy[2].imgList[2]} alt="" />
                <img className="w-10 h-10 rounded-sm" src={girlDummy[2].imgList[3]} alt="" />
              </div>
            </div>
          </div>
        </CustomOverlayMap>

      </Map>
      <div className={`${homeStyles.footer}`}>
        <TabBar/>
      </div>
    </div>
  );
}
